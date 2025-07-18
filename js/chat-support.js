// 在线客服聊天系统
class ChatSupportSystem {
  constructor(options = {}) {
    this.options = {
      position: 'bottom-right',
      theme: 'light',
      title: '在线客服',
      subtitle: '有问题随时咨询我们',
      placeholder: '请输入您的问题...',
      welcomeMessage: '您好！欢迎访问寻人网，请问有什么可以帮助您的？',
      offlineMessage: '客服目前不在线，请留言，我们会尽快回复您。',
      ...options
    };
    
    this.isOpen = false;
    this.isMinimized = true;
    this.messages = [];
    this.unreadCount = 0;
    this.isOnline = this.checkOnlineStatus();
    this.agentTyping = false;
    this.agentName = '客服小王';
    this.agentAvatar = '/images/agent-avatar.png';
    this.userAvatar = '/images/user-avatar.png';
    
    this.init();
  }

  init() {
    this.createChatWidget();
    this.setupEventListeners();
    this.loadChatHistory();
    this.startOnlineStatusCheck();
    
    // 添加欢迎消息
    setTimeout(() => {
      if (this.messages.length === 0) {
        this.addMessage({
          sender: 'agent',
          text: this.options.welcomeMessage,
          time: new Date()
        });
      }
    }, 2000);
  }

  createChatWidget() {
    // 创建聊天图标
    this.chatIcon = document.createElement('div');
    this.chatIcon.className = `chat-icon ${this.options.position}`;
    this.chatIcon.innerHTML = `
      <div class="chat-icon-inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="unread-badge" style="display: none;">0</span>
      </div>
    `;
    
    // 创建聊天窗口
    this.chatWindow = document.createElement('div');
    this.chatWindow.className = `chat-window ${this.options.position} ${this.options.theme}`;
    this.chatWindow.style.display = 'none';
    this.chatWindow.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-info">
          <h3>${this.options.title}</h3>
          <p>${this.options.subtitle}</p>
          <div class="chat-status ${this.isOnline ? 'online' : 'offline'}">
            <span class="status-dot"></span>
            <span class="status-text">${this.isOnline ? '在线' : '离线'}</span>
          </div>
        </div>
        <div class="chat-header-actions">
          <button class="chat-minimize">_</button>
          <button class="chat-close">×</button>
        </div>
      </div>
      <div class="chat-body">
        <div class="chat-messages"></div>
      </div>
      <div class="chat-typing" style="display: none;">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>${this.agentName} 正在输入...</p>
      </div>
      <div class="chat-footer">
        <textarea class="chat-input" placeholder="${this.options.placeholder}" rows="1"></textarea>
        <button class="chat-send">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = this.getChatStyles();
    document.head.appendChild(style);
    
    // 添加到DOM
    document.body.appendChild(this.chatIcon);
    document.body.appendChild(this.chatWindow);
    
    // 获取元素引用
    this.unreadBadge = this.chatIcon.querySelector('.unread-badge');
    this.chatMessages = this.chatWindow.querySelector('.chat-messages');
    this.chatInput = this.chatWindow.querySelector('.chat-input');
    this.chatSend = this.chatWindow.querySelector('.chat-send');
    this.chatMinimize = this.chatWindow.querySelector('.chat-minimize');
    this.chatClose = this.chatWindow.querySelector('.chat-close');
    this.chatTyping = this.chatWindow.querySelector('.chat-typing');
    this.statusIndicator = this.chatWindow.querySelector('.chat-status');
  }

  setupEventListeners() {
    // 点击聊天图标
    this.chatIcon.addEventListener('click', () => {
      this.toggleChat();
    });
    
    // 点击最小化按钮
    this.chatMinimize.addEventListener('click', () => {
      this.minimizeChat();
    });
    
    // 点击关闭按钮
    this.chatClose.addEventListener('click', () => {
      this.closeChat();
    });
    
    // 发送消息
    this.chatSend.addEventListener('click', () => {
      this.sendMessage();
    });
    
    // 按Enter发送消息
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // 自动调整文本区域高度
    this.chatInput.addEventListener('input', () => {
      this.chatInput.style.height = 'auto';
      this.chatInput.style.height = (this.chatInput.scrollHeight) + 'px';
    });
  }

  toggleChat() {
    if (this.isMinimized) {
      this.openChat();
    } else {
      this.minimizeChat();
    }
  }

  openChat() {
    this.chatWindow.style.display = 'flex';
    this.isMinimized = false;
    this.isOpen = true;
    this.unreadCount = 0;
    this.updateUnreadBadge();
    this.chatInput.focus();
    
    // 滚动到最新消息
    this.scrollToBottom();
    
    // 记录打开事件
    if (window.analyticsManager) {
      window.analyticsManager.trackEvent('chat_opened');
    }
  }

  minimizeChat() {
    this.chatWindow.style.display = 'none';
    this.isMinimized = true;
    this.isOpen = false;
    
    // 记录最小化事件
    if (window.analyticsManager) {
      window.analyticsManager.trackEvent('chat_minimized');
    }
  }

  closeChat() {
    this.chatWindow.style.display = 'none';
    this.isMinimized = true;
    this.isOpen = false;
    
    // 记录关闭事件
    if (window.analyticsManager) {
      window.analyticsManager.trackEvent('chat_closed');
    }
  }

  sendMessage() {
    const text = this.chatInput.value.trim();
    if (!text) return;
    
    // 添加用户消息
    this.addMessage({
      sender: 'user',
      text: text,
      time: new Date()
    });
    
    // 清空输入框
    this.chatInput.value = '';
    this.chatInput.style.height = 'auto';
    
    // 记录发送事件
    if (window.analyticsManager) {
      window.analyticsManager.trackEvent('chat_message_sent', {
        messageLength: text.length
      });
    }
    
    // 保存聊天历史
    this.saveChatHistory();
    
    // 如果在线，显示正在输入
    if (this.isOnline) {
      this.showAgentTyping();
      
      // 模拟回复
      setTimeout(() => {
        this.hideAgentTyping();
        this.handleAutoReply(text);
      }, 1000 + Math.random() * 2000);
    } else {
      // 离线回复
      setTimeout(() => {
        this.addMessage({
          sender: 'agent',
          text: this.options.offlineMessage,
          time: new Date()
        });
      }, 500);
    }
  }

  handleAutoReply(userMessage) {
    // 简单的自动回复逻辑
    const lowerMessage = userMessage.toLowerCase();
    let reply = '';
    
    if (lowerMessage.includes('你好') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      reply = '您好！很高兴为您服务，请问有什么可以帮助您的？';
    } else if (lowerMessage.includes('价格') || lowerMessage.includes('收费') || lowerMessage.includes('费用')) {
      reply = '我们的寻人服务根据难度和紧急程度有不同的收费标准，一般从3000元起。您可以通过填写表单提交具体需求，我们会为您提供详细报价。';
    } else if (lowerMessage.includes('成功率') || lowerMessage.includes('能找到吗')) {
      reply = '我们的整体成功率达到98%，但具体情况还需要根据您提供的信息来评估。我们会在接受委托前向您说明成功的可能性。';
    } else if (lowerMessage.includes('多久') || lowerMessage.includes('时间')) {
      reply = '一般案例我们会在7-30天内完成，紧急案例可以更快。具体时间取决于案例的复杂程度和信息完整度。';
    } else if (lowerMessage.includes('怎么') && lowerMessage.includes('找')) {
      reply = '您可以通过我们网站上的"寻人"页面填写表单，提供尽可能详细的信息，我们的专业团队会与您联系并开展工作。';
    } else if (lowerMessage.includes('安全') || lowerMessage.includes('隐私')) {
      reply = '我们非常重视客户隐私和信息安全，所有资料严格保密，只用于寻人服务。我们遵守相关法律法规，确保服务合法合规。';
    } else if (lowerMessage.includes('联系') || lowerMessage.includes('电话') || lowerMessage.includes('邮箱')) {
      reply = '您可以通过以下方式联系我们：电话：400-123-4567（工作时间：周一至周五 9:00-18:00），邮箱：contact@findpeople.com';
    } else {
      reply = '感谢您的咨询。为了更好地帮助您，建议您填写我们的寻人表单，提供更详细的信息，我们的专业顾问会尽快与您联系。';
    }
    
    this.addMessage({
      sender: 'agent',
      text: reply,
      time: new Date()
    });
  }

  addMessage(message) {
    this.messages.push(message);
    
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${message.sender}`;
    
    const avatar = message.sender === 'agent' ? this.agentAvatar : this.userAvatar;
    const name = message.sender === 'agent' ? this.agentName : '您';
    
    messageEl.innerHTML = `
      <div class="message-avatar">
        <img src="${avatar}" alt="${name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 24 24%22><circle cx=%2212%22 cy=%2212%22 r=%2212%22 fill=%22%23cccccc%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23ffffff%22 font-size=%2214%22>${name.charAt(0)}</text></svg>';">
      </div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-name">${name}</span>
          <span class="message-time">${this.formatTime(message.time)}</span>
        </div>
        <div class="message-text">${this.formatMessageText(message.text)}</div>
      </div>
    `;
    
    // 添加到聊天窗口
    this.chatMessages.appendChild(messageEl);
    
    // 滚动到底部
    this.scrollToBottom();
    
    // 如果聊天窗口最小化，增加未读计数
    if (this.isMinimized) {
      this.unreadCount++;
      this.updateUnreadBadge();
      
      // 播放通知声音
      if (message.sender === 'agent') {
        this.playNotificationSound();
      }
    }
  }

  formatMessageText(text) {
    // 将URL转换为链接
    return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')
      // 将换行符转换为<br>
      .replace(/\n/g, '<br>');
  }

  formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  updateUnreadBadge() {
    if (this.unreadCount > 0) {
      this.unreadBadge.textContent = this.unreadCount > 9 ? '9+' : this.unreadCount;
      this.unreadBadge.style.display = 'flex';
    } else {
      this.unreadBadge.style.display = 'none';
    }
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  showAgentTyping() {
    this.agentTyping = true;
    this.chatTyping.style.display = 'flex';
    this.scrollToBottom();
  }

  hideAgentTyping() {
    this.agentTyping = false;
    this.chatTyping.style.display = 'none';
  }

  checkOnlineStatus() {
    // 检查当前是否在工作时间
    const now = new Date();
    const day = now.getDay(); // 0是周日，1-6是周一到周六
    const hour = now.getHours();
    
    // 工作时间：周一至周五 9:00-18:00
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  }

  startOnlineStatusCheck() {
    // 每分钟检查一次在线状态
    setInterval(() => {
      const wasOnline = this.isOnline;
      this.isOnline = this.checkOnlineStatus();
      
      // 如果状态改变，更新UI
      if (wasOnline !== this.isOnline) {
        this.updateOnlineStatus();
      }
    }, 60000);
  }

  updateOnlineStatus() {
    this.statusIndicator.className = `chat-status ${this.isOnline ? 'online' : 'offline'}`;
    this.statusIndicator.querySelector('.status-text').textContent = this.isOnline ? '在线' : '离线';
    
    // 如果从在线变为离线，发送通知
    if (!this.isOnline && this.messages.length > 0) {
      this.addMessage({
        sender: 'agent',
        text: '客服已下线，您可以继续留言，我们会在工作时间回复您。',
        time: new Date()
      });
    }
    
    // 如果从离线变为在线，发送通知
    if (this.isOnline && this.messages.length > 0 && 
        this.messages[this.messages.length - 1].sender === 'user') {
      this.addMessage({
        sender: 'agent',
        text: '客服已上线，请问有什么可以帮助您的？',
        time: new Date()
      });
    }
  }

  playNotificationSound() {
    // 创建音频元素
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.5;
    
    // 尝试播放
    audio.play().catch(error => {
      console.log('无法播放通知声音:', error);
    });
  }

  saveChatHistory() {
    try {
      // 只保存最近20条消息
      const recentMessages = this.messages.slice(-20);
      localStorage.setItem('chatHistory', JSON.stringify(recentMessages));
    } catch (error) {
      console.log('无法保存聊天历史:', error);
    }
  }

  loadChatHistory() {
    try {
      const history = localStorage.getItem('chatHistory');
      if (history) {
        const messages = JSON.parse(history);
        
        // 转换日期字符串为Date对象
        messages.forEach(message => {
          message.time = new Date(message.time);
          this.addMessage(message);
        });
      }
    } catch (error) {
      console.log('无法加载聊天历史:', error);
    }
  }

  getChatStyles() {
    return `
      .chat-icon {
        position: fixed;
        width: 60px;
        height: 60px;
        background-color: #3b82f6;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
      }
      
      .chat-icon:hover {
        transform: scale(1.05);
      }
      
      .chat-icon-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: white;
      }
      
      .unread-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #ef4444;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .chat-window {
        position: fixed;
        width: 350px;
        height: 500px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
        z-index: 9998;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      
      .chat-header {
        padding: 15px;
        background-color: #3b82f6;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      
      .chat-header-info h3 {
        margin: 0;
        font-size: 18px;
      }
      
      .chat-header-info p {
        margin: 5px 0 0;
        font-size: 12px;
        opacity: 0.8;
      }
      
      .chat-status {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-top: 5px;
      }
      
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 5px;
      }
      
      .online .status-dot {
        background-color: #10b981;
      }
      
      .offline .status-dot {
        background-color: #ef4444;
      }
      
      .chat-header-actions {
        display: flex;
      }
      
      .chat-header-actions button {
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
      }
      
      .chat-header-actions button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .chat-body {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
      }
      
      .chat-messages {
        display: flex;
        flex-direction: column;
      }
      
      .chat-message {
        display: flex;
        margin-bottom: 15px;
        max-width: 80%;
      }
      
      .chat-message.user {
        align-self: flex-end;
        flex-direction: row-reverse;
      }
      
      .message-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 10px;
      }
      
      .message-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .message-content {
        background-color: #f3f4f6;
        padding: 10px;
        border-radius: 10px;
      }
      
      .chat-message.agent .message-content {
        border-top-left-radius: 0;
      }
      
      .chat-message.user .message-content {
        background-color: #dbeafe;
        border-top-right-radius: 0;
      }
      
      .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 12px;
      }
      
      .message-name {
        font-weight: bold;
        color: #4b5563;
      }
      
      .message-time {
        color: #9ca3af;
      }
      
      .message-text {
        word-break: break-word;
      }
      
      .message-text a {
        color: #3b82f6;
        text-decoration: none;
      }
      
      .message-text a:hover {
        text-decoration: underline;
      }
      
      .chat-typing {
        padding: 10px 15px;
        display: flex;
        align-items: center;
        background-color: #f9fafb;
        border-top: 1px solid #e5e7eb;
      }
      
      .typing-indicator {
        display: flex;
        align-items: center;
        margin-right: 10px;
      }
      
      .typing-indicator span {
        width: 8px;
        height: 8px;
        background-color: #9ca3af;
        border-radius: 50%;
        margin: 0 2px;
        animation: typing 1.4s infinite both;
      }
      
      .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing {
        0% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0); }
      }
      
      .chat-footer {
        padding: 10px 15px;
        border-top: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
      }
      
      .chat-input {
        flex: 1;
        border: 1px solid #d1d5db;
        border-radius: 20px;
        padding: 8px 15px;
        resize: none;
        max-height: 100px;
        font-family: inherit;
        font-size: 14px;
      }
      
      .chat-input:focus {
        outline: none;
        border-color: #3b82f6;
      }
      
      .chat-send {
        background-color: #3b82f6;
        color: white;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
      }
      
      .chat-send:hover {
        background-color: #2563eb;
      }
      
      /* 位置样式 */
      .bottom-right {
        bottom: 20px;
        right: 20px;
      }
      
      .bottom-left {
        bottom: 20px;
        left: 20px;
      }
      
      /* 主题样式 */
      .dark {
        background-color: #1f2937;
        color: #f9fafb;
      }
      
      .dark .chat-header {
        background-color: #111827;
      }
      
      .dark .message-content {
        background-color: #374151;
        color: #f9fafb;
      }
      
      .dark .chat-message.user .message-content {
        background-color: #3b82f6;
      }
      
      .dark .message-name {
        color: #e5e7eb;
      }
      
      .dark .message-time {
        color: #9ca3af;
      }
      
      .dark .chat-typing {
        background-color: #1f2937;
        border-top: 1px solid #374151;
      }
      
      .dark .chat-input {
        background-color: #374151;
        border-color: #4b5563;
        color: #f9fafb;
      }
      
      .dark .chat-footer {
        border-top: 1px solid #374151;
      }
      
      /* 响应式样式 */
      @media (max-width: 480px) {
        .chat-window {
          width: 100%;
          height: 100%;
          border-radius: 0;
          bottom: 0 !important;
          right: 0 !important;
          left: 0 !important;
          top: 0 !important;
        }
      }
    `;
  }
}

// 初始化聊天系统
document.addEventListener('DOMContentLoaded', () => {
  // 延迟加载聊天系统，提高页面加载速度
  setTimeout(() => {
    window.chatSupport = new ChatSupportSystem({
      position: 'bottom-right',
      theme: 'light',
      title: '寻人网客服',
      subtitle: '有问题随时咨询我们',
      welcomeMessage: '您好！欢迎访问寻人网，请问有什么可以帮助您的？'
    });
  }, 2000);
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChatSupportSystem;
} else {
  window.ChatSupportSystem = ChatSupportSystem;
}