// 寻人网主要JavaScript功能
class FindPeopleApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupSearchFunctionality();
    this.setupAnalytics();
    this.setupPerformanceOptimization();
  }

  // 表单验证增强
  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', this.handleFormSubmit.bind(this));
      
      // 实时验证
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', this.validateField.bind(this));
        input.addEventListener('input', this.clearErrors.bind(this));
      });
    });
  }

  validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // 清除之前的错误
    this.clearFieldError(field);
    
    // 验证规则
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = this.getRequiredMessage(fieldName);
    } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = '请输入有效的邮箱地址';
    } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = '请输入有效的电话号码';
    }
    
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }
    
    return isValid;
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    // 显示加载状态
    this.showLoadingState(form);
    
    // 验证所有字段
    const isFormValid = this.validateForm(form);
    
    if (isFormValid) {
      this.submitForm(form);
    } else {
      this.hideLoadingState(form);
      this.showFormErrors();
    }
  }

  validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
      if (!this.validateField({ target: field })) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  async submitForm(form) {
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        this.showSuccessMessage();
        form.reset();
        
        // 发送分析事件
        this.trackEvent('form_submit', 'success', form.id || 'search_form');
      } else {
        throw new Error('提交失败');
      }
    } catch (error) {
      this.showErrorMessage('提交失败，请稍后重试');
      this.trackEvent('form_submit', 'error', error.message);
    } finally {
      this.hideLoadingState(form);
    }
  }

  // 搜索功能增强
  setupSearchFunctionality() {
    const searchInputs = document.querySelectorAll('input[name="name"]');
    searchInputs.forEach(input => {
      input.addEventListener('input', this.debounce(this.handleSearchInput.bind(this), 300));
    });
  }

  handleSearchInput(event) {
    const query = event.target.value.trim();
    if (query.length >= 2) {
      this.showSearchSuggestions(query);
    } else {
      this.hideSearchSuggestions();
    }
  }

  showSearchSuggestions(query) {
    // 这里可以添加搜索建议功能
    // 例如：常见姓名、历史搜索等
    console.log('搜索建议:', query);
  }

  // 性能优化
  setupPerformanceOptimization() {
    // 图片懒加载
    this.setupLazyLoading();
    
    // 预加载关键资源
    this.preloadCriticalResources();
    
    // 服务工作者注册
    this.registerServiceWorker();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }

  preloadCriticalResources() {
    const criticalResources = [
      '/partials/site-style.css',
      '/js/main.js'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  }

  // 分析和跟踪
  setupAnalytics() {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      this.trackPageView();
    }
    
    // 用户行为跟踪
    this.setupBehaviorTracking();
  }

  trackEvent(action, category, label, value) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  trackPageView() {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  setupBehaviorTracking() {
    // 滚动深度跟踪
    let maxScroll = 0;
    window.addEventListener('scroll', this.debounce(() => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // 每25%记录一次
          this.trackEvent('scroll_depth', 'engagement', `${maxScroll}%`);
        }
      }
    }, 250));
    
    // 点击跟踪
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'A') {
        this.trackEvent('link_click', 'navigation', target.href);
      } else if (target.tagName === 'BUTTON') {
        this.trackEvent('button_click', 'interaction', target.textContent);
      }
    });
  }

  // 工具函数
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

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  getRequiredMessage(fieldName) {
    const messages = {
      'client_name': '请输入您的姓名',
      'client_phone': '请输入联系电话',
      'target_name': '请输入要寻找的人员姓名',
      'relationship': '请选择与被寻找人的关系'
    };
    return messages[fieldName] || '此字段为必填项';
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  clearErrors(event) {
    this.clearFieldError(event.target);
  }

  showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="loading"></span> 提交中...';
    }
  }

  hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = submitBtn.dataset.originalText || '提交寻人申请';
    }
  }

  showSuccessMessage() {
    this.showNotification('申请提交成功！我们会尽快与您联系。', 'success');
  }

  showErrorMessage(message) {
    this.showNotification(message, 'error');
  }

  showFormErrors() {
    this.showNotification('请检查并修正表单中的错误', 'warning');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // 自动关闭
    setTimeout(() => {
      notification.remove();
    }, 5000);
    
    // 手动关闭
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  }

  // 服务工作者
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered');
      } catch (error) {
        console.log('Service Worker registration failed');
      }
    }
  }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  new FindPeopleApp();
});

// 导出供其他脚本使用
window.FindPeopleApp = FindPeopleApp;