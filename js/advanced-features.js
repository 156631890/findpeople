// 高级功能和交互效果

// 滚动动画观察器
class ScrollAnimator {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    this.init();
  }
  
  init() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => this.observer.observe(el));
  }
}

// 滚动进度指示器
class ScrollProgress {
  constructor() {
    this.createProgressBar();
    this.updateProgress();
    window.addEventListener('scroll', () => this.updateProgress());
  }
  
  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    progressBar.innerHTML = '<div class="scroll-progress"></div>';
    document.body.appendChild(progressBar);
    
    this.progressElement = progressBar.querySelector('.scroll-progress');
  }
  
  updateProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    this.progressElement.style.width = scrollPercent + '%';
  }
}

// 智能搜索建议
class SearchSuggestions {
  constructor(inputSelector, suggestionsSelector) {
    this.input = document.querySelector(inputSelector);
    this.suggestionsContainer = document.querySelector(suggestionsSelector);
    this.suggestions = [
      '失散亲人寻找',
      '同学老友重聚',
      '商务人员查找',
      '法律相关寻人',
      'DNA寻亲服务',
      '国际寻人服务',
      '紧急寻人',
      '老人走失寻找',
      '儿童失踪寻找',
      '前男友前女友寻找'
    ];
    
    if (this.input) {
      this.init();
    }
  }
  
  init() {
    this.input.addEventListener('input', (e) => {
      this.showSuggestions(e.target.value);
    });
    
    this.input.addEventListener('focus', (e) => {
      this.showSuggestions(e.target.value);
    });
    
    document.addEventListener('click', (e) => {
      if (!this.input.contains(e.target) && !this.suggestionsContainer?.contains(e.target)) {
        this.hideSuggestions();
      }
    });
  }
  
  showSuggestions(query) {
    if (!query || query.length < 1) {
      this.hideSuggestions();
      return;
    }
    
    const filtered = this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length === 0) {
      this.hideSuggestions();
      return;
    }
    
    this.renderSuggestions(filtered);
  }
  
  renderSuggestions(suggestions) {
    if (!this.suggestionsContainer) {
      this.createSuggestionsContainer();
    }
    
    this.suggestionsContainer.innerHTML = suggestions
      .map(suggestion => `
        <div class="suggestion-item" data-value="${suggestion}">
          ${suggestion}
        </div>
      `).join('');
    
    this.suggestionsContainer.style.display = 'block';
    
    // 添加点击事件
    this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        this.input.value = item.dataset.value;
        this.hideSuggestions();
      });
    });
  }
  
  createSuggestionsContainer() {
    this.suggestionsContainer = document.createElement('div');
    this.suggestionsContainer.className = 'search-suggestions-dropdown';
    this.suggestionsContainer.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      max-height: 200px;
      overflow-y: auto;
      display: none;
    `;
    
    this.input.parentElement.style.position = 'relative';
    this.input.parentElement.appendChild(this.suggestionsContainer);
  }
  
  hideSuggestions() {
    if (this.suggestionsContainer) {
      this.suggestionsContainer.style.display = 'none';
    }
  }
}

// 实时聊天支持
class ChatSupport {
  constructor() {
    this.isOpen = false;
    this.createChatWidget();
  }
  
  createChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.innerHTML = `
      <div class="chat-widget" id="chatWidget">
        <div class="chat-toggle" id="chatToggle">
          <span class="chat-icon">💬</span>
          <span class="chat-text">在线咨询</span>
          <span class="chat-notification">1</span>
        </div>
        <div class="chat-window" id="chatWindow">
          <div class="chat-header">
            <h4>在线客服</h4>
            <button class="chat-close" id="chatClose">×</button>
          </div>
          <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
              <div class="message-content">
                您好！我是寻人网的智能客服，有什么可以帮助您的吗？
              </div>
              <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
          </div>
          <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="请输入您的问题..." />
            <button id="chatSend">发送</button>
          </div>
        </div>
      </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      .chat-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        font-family: inherit;
      }
      
      .chat-toggle {
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: var(--shadow-lg);
        transition: var(--transition);
        position: relative;
      }
      
      .chat-toggle:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-xl);
      }
      
      .chat-notification {
        position: absolute;
        top: -5px;
        right: -5px;
        background: var(--danger);
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 600;
      }
      
      .chat-window {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 350px;
        height: 400px;
        background: white;
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        display: none;
        flex-direction: column;
        border: 1px solid var(--border);
      }
      
      .chat-header {
        padding: 1rem;
        border-bottom: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--bg-tertiary);
        border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      }
      
      .chat-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-muted);
      }
      
      .chat-messages {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .message {
        max-width: 80%;
      }
      
      .bot-message {
        align-self: flex-start;
      }
      
      .user-message {
        align-self: flex-end;
      }
      
      .message-content {
        background: var(--bg-tertiary);
        padding: 0.75rem;
        border-radius: var(--radius-md);
        margin-bottom: 0.25rem;
      }
      
      .user-message .message-content {
        background: var(--primary);
        color: white;
      }
      
      .message-time {
        font-size: 0.75rem;
        color: var(--text-muted);
        text-align: right;
      }
      
      .chat-input-area {
        padding: 1rem;
        border-top: 1px solid var(--border);
        display: flex;
        gap: 0.5rem;
      }
      
      .chat-input-area input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        outline: none;
      }
      
      .chat-input-area button {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: var(--radius-md);
        cursor: pointer;
      }
      
      @media (max-width: 480px) {
        .chat-window {
          width: 300px;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(chatWidget);
    
    this.initChatEvents();
  }
  
  initChatEvents() {
    const toggle = document.getElementById('chatToggle');
    const window = document.getElementById('chatWindow');
    const close = document.getElementById('chatClose');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    const messages = document.getElementById('chatMessages');
    
    toggle.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      window.style.display = this.isOpen ? 'flex' : 'none';
      if (this.isOpen) {
        document.querySelector('.chat-notification').style.display = 'none';
      }
    });
    
    close.addEventListener('click', () => {
      this.isOpen = false;
      window.style.display = 'none';
    });
    
    const sendMessage = () => {
      const message = input.value.trim();
      if (!message) return;
      
      // 添加用户消息
      const userMessage = document.createElement('div');
      userMessage.className = 'message user-message';
      userMessage.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
      `;
      messages.appendChild(userMessage);
      
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
      
      // 模拟机器人回复
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `
          <div class="message-content">
            感谢您的咨询！我们的专业顾问将在24小时内与您联系。您也可以直接拨打400-123-4567获得即时帮助。
          </div>
          <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        messages.appendChild(botMessage);
        messages.scrollTop = messages.scrollHeight;
      }, 1000);
    };
    
    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
}

// 表单验证增强
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (this.form) {
      this.init();
    }
  }
  
  init() {
    this.form.addEventListener('submit', (e) => {
      if (!this.validateForm()) {
        e.preventDefault();
      }
    });
    
    // 实时验证
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }
  
  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';
    
    // 必填验证
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = '此字段为必填项';
    }
    
    // 邮箱验证
    if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      message = '请输入有效的邮箱地址';
    }
    
    // 电话验证
    if (type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      message = '请输入有效的电话号码';
    }
    
    // 显示或清除错误
    if (isValid) {
      this.clearError(field);
    } else {
      this.showError(field, message);
    }
    
    return isValid;
  }
  
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  isValidPhone(phone) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone);
  }
  
  showError(field, message) {
    this.clearError(field);
    
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: var(--danger);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `;
    
    field.parentElement.appendChild(errorElement);
  }
  
  clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
}

// 图片懒加载
class LazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
    
    this.init();
  }
  
  init() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => this.observer.observe(img));
  }
  
  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.add('loaded');
    img.removeAttribute('data-src');
  }
}

// 平滑滚动
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimator();
  new ScrollProgress();
  new SearchSuggestions('input[name="name"]');
  new ChatSupport();
  new FormValidator('.search-form');
  new LazyLoader();
  new SmoothScroll();
  
  // 添加滚动动画类到元素
  const animateElements = document.querySelectorAll('.feature-card, .service-card, .story-card, .testimonial-card');
  animateElements.forEach(el => el.classList.add('animate-on-scroll'));
});

// 导出功能类供其他脚本使用
window.AdvancedFeatures = {
  ScrollAnimator,
  ScrollProgress,
  SearchSuggestions,
  ChatSupport,
  FormValidator,
  LazyLoader,
  SmoothScroll
};