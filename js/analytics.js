// 高级分析和用户行为跟踪
class AnalyticsManager {
  constructor() {
    this.initialized = false;
    this.sessionId = this.generateSessionId();
    this.pageViewCount = 0;
    this.startTime = new Date();
    this.lastActivity = new Date();
    this.events = [];
    this.init();
  }

  init() {
    if (this.initialized) return;
    
    // 初始化Google Analytics
    this.initGoogleAnalytics();
    
    // 设置事件监听
    this.setupEventListeners();
    
    // 记录页面访问
    this.trackPageView();
    
    // 设置心跳检测
    this.setupHeartbeat();
    
    // 设置离开页面事件
    this.setupLeavePageEvent();
    
    this.initialized = true;
    console.log('Analytics initialized');
  }

  initGoogleAnalytics() {
    // Google Analytics 4 初始化
    if (typeof gtag === 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', 'G-MEASUREMENT_ID'); // 替换为实际的GA4测量ID
    }
  }

  setupEventListeners() {
    // 点击事件
    document.addEventListener('click', this.handleClick.bind(this));
    
    // 表单提交
    document.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // 滚动事件
    window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 250));
    
    // 用户活动
    ['mousemove', 'keydown', 'touchstart', 'touchmove'].forEach(eventType => {
      document.addEventListener(eventType, this.debounce(this.updateActivity.bind(this), 1000));
    });
  }

  setupHeartbeat() {
    // 每30秒发送一次心跳，检测用户是否仍在页面上
    this.heartbeatInterval = setInterval(() => {
      const now = new Date();
      const timeSinceLastActivity = now - this.lastActivity;
      
      // 如果用户超过5分钟没有活动，认为会话结束
      if (timeSinceLastActivity > 5 * 60 * 1000) {
        this.trackEvent('user_inactive', {
          duration: Math.round(timeSinceLastActivity / 1000)
        });
        this.resetSession();
      } else {
        this.trackEvent('heartbeat', {
          pageViewCount: this.pageViewCount,
          sessionDuration: Math.round((now - this.startTime) / 1000)
        });
      }
    }, 30000);
  }

  setupLeavePageEvent() {
    window.addEventListener('beforeunload', () => {
      const sessionDuration = Math.round((new Date() - this.startTime) / 1000);
      
      // 使用sendBeacon API确保数据发送，即使页面正在卸载
      if (navigator.sendBeacon) {
        const data = {
          event: 'page_leave',
          sessionId: this.sessionId,
          sessionDuration: sessionDuration,
          pageViewCount: this.pageViewCount,
          events: this.events.length
        };
        
        navigator.sendBeacon('/api/analytics', JSON.stringify(data));
      } else {
        // 回退方案
        this.trackEvent('page_leave', {
          sessionDuration: sessionDuration,
          pageViewCount: this.pageViewCount
        });
      }
    });
  }

  trackPageView() {
    this.pageViewCount++;
    
    const pageData = {
      title: document.title,
      url: window.location.href,
      referrer: document.referrer,
      language: navigator.language,
      viewCount: this.pageViewCount
    };
    
    // 发送到Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', pageData);
    }
    
    // 记录到本地事件
    this.recordEvent('page_view', pageData);
    
    console.log('Page view tracked', pageData);
  }

  trackEvent(eventName, eventData = {}) {
    // 添加通用数据
    const data = {
      ...eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      sessionId: this.sessionId
    };
    
    // 发送到Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }
    
    // 记录到本地事件
    this.recordEvent(eventName, data);
    
    console.log(`Event tracked: ${eventName}`, data);
  }

  recordEvent(eventName, eventData) {
    this.events.push({
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString()
    });
    
    // 限制事件历史记录大小
    if (this.events.length > 100) {
      this.events.shift();
    }
  }

  handleClick(event) {
    const target = event.target;
    
    // 跟踪链接点击
    if (target.tagName === 'A' || target.closest('a')) {
      const link = target.tagName === 'A' ? target : target.closest('a');
      const href = link.getAttribute('href');
      const isExternal = href && href.startsWith('http') && !href.includes(window.location.hostname);
      
      this.trackEvent('link_click', {
        text: link.textContent.trim(),
        href: href,
        isExternal: isExternal
      });
    }
    
    // 跟踪按钮点击
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      const button = target.tagName === 'BUTTON' ? target : target.closest('button');
      
      this.trackEvent('button_click', {
        text: button.textContent.trim(),
        type: button.type || 'button',
        id: button.id || null
      });
    }
    
    // 跟踪其他可点击元素
    if (target.dataset.trackClick || target.closest('[data-track-click]')) {
      const element = target.dataset.trackClick ? target : target.closest('[data-track-click]');
      const category = element.dataset.category || 'element';
      
      this.trackEvent(`${category}_click`, {
        id: element.id || null,
        text: element.textContent.trim(),
        type: element.dataset.trackClick
      });
    }
  }

  handleFormSubmit(event) {
    const form = event.target;
    const formId = form.id || form.getAttribute('name') || 'unknown_form';
    const formAction = form.getAttribute('action') || 'unknown_action';
    
    this.trackEvent('form_submit', {
      formId: formId,
      formAction: formAction,
      formFields: form.elements.length
    });
  }

  handleScroll() {
    const scrollDepth = this.getScrollDepth();
    const milestone = this.getScrollMilestone(scrollDepth);
    
    if (milestone) {
      this.trackEvent('scroll_milestone', {
        depth: milestone,
        pixelDepth: window.scrollY,
        pageHeight: document.body.scrollHeight
      });
    }
  }

  getScrollDepth() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollTop = window.scrollY;
    
    return Math.round((scrollTop + windowHeight) / documentHeight * 100);
  }

  getScrollMilestone(depth) {
    // 记录25%、50%、75%、90%和100%的滚动里程碑
    const milestones = [25, 50, 75, 90, 100];
    
    // 检查是否达到新的里程碑
    for (const milestone of milestones) {
      const key = `scrolled_${milestone}`;
      
      if (depth >= milestone && !this[key]) {
        this[key] = true;
        return milestone;
      }
    }
    
    return null;
  }

  updateActivity() {
    this.lastActivity = new Date();
  }

  resetSession() {
    this.sessionId = this.generateSessionId();
    this.pageViewCount = 0;
    this.startTime = new Date();
    this.lastActivity = new Date();
    this.events = [];
    
    // 重置滚动里程碑
    ['scrolled_25', 'scrolled_50', 'scrolled_75', 'scrolled_90', 'scrolled_100'].forEach(key => {
      this[key] = false;
    });
    
    console.log('Analytics session reset', this.sessionId);
  }

  generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 获取分析数据
  getAnalyticsData() {
    return {
      sessionId: this.sessionId,
      pageViewCount: this.pageViewCount,
      sessionDuration: Math.round((new Date() - this.startTime) / 1000),
      events: this.events,
      lastActivity: this.lastActivity
    };
  }
}

// 初始化分析
document.addEventListener('DOMContentLoaded', () => {
  window.analyticsManager = new AnalyticsManager();
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnalyticsManager;
} else {
  window.AnalyticsManager = AnalyticsManager;
}