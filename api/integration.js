// API集成和数据处理
class APIIntegration {
  constructor() {
    this.baseURL = '/api';
    this.workflowManager = new WorkflowManager();
    this.setupEventListeners();
  }

  // 设置事件监听
  setupEventListeners() {
    // 监听表单提交
    document.addEventListener('submit', this.handleFormSubmit.bind(this));
    
    // 监听案例状态变更
    document.addEventListener('caseStatusChanged', this.handleStatusChange.bind(this));
  }

  // 处理表单提交
  async handleFormSubmit(event) {
    if (event.target.matches('form[action*="formspree"]')) {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      
      try {
        // 创建案例
        const result = await this.createCase(data);
        
        if (result.success) {
          // 发送到Formspree作为备份
          await this.sendToFormspree(event.target, formData);
          
          // 显示成功消息
          this.showSuccessMessage(result.caseId);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('案例创建失败:', error);
        this.showErrorMessage('提交失败，请稍后重试');
      }
    }
  }

  // 创建案例
  async createCase(data) {
    try {
      const response = await fetch(`${this.baseURL}/cases`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // 如果API不可用，使用本地WorkflowManager
      console.log('使用本地处理:', error.message);
      return this.workflowManager.createCase(data);
    }
  }

  // 发送到Formspree（备份）
  async sendToFormspree(form, formData) {
    try {
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
    } catch (error) {
      console.log('Formspree备份失败:', error);
    }
  }

  // 获取案例列表
  async getCases(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${this.baseURL}/cases?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.log('使用本地数据:', error.message);
      return this.workflowManager.getCases(filters);
    }
  }

  // 获取案例详情
  async getCaseDetail(caseId) {
    try {
      const response = await fetch(`${this.baseURL}/cases/${caseId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.log('使用本地数据:', error.message);
      return this.workflowManager.getCase(caseId);
    }
  }

  // 推进案例
  async advanceCase(caseId, notes = '') {
    try {
      const response = await fetch(`${this.baseURL}/cases/${caseId}/advance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // 触发状态变更事件
      document.dispatchEvent(new CustomEvent('caseStatusChanged', {
        detail: { caseId, newStatus: result.case.status }
      }));
      
      return result;
    } catch (error) {
      console.log('使用本地处理:', error.message);
      return this.workflowManager.advanceCase(caseId, 'current_user', notes);
    }
  }

  // 法务审核
  async legalReview(caseId, approved, reason = '') {
    try {
      const response = await fetch(`${this.baseURL}/cases/${caseId}/legal-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved, reason })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('使用本地处理:', error.message);
      return this.workflowManager.legalReview(caseId, 'legal_user', approved, reason);
    }
  }

  // 生成报价
  async generateQuote(caseId, quoteData) {
    try {
      const response = await fetch(`${this.baseURL}/cases/${caseId}/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('使用本地处理:', error.message);
      return this.workflowManager.generateQuote(caseId, 'sales_user', quoteData);
    }
  }

  // 记录支付
  async recordPayment(caseId, paymentData) {
    try {
      const response = await fetch(`${this.baseURL}/cases/${caseId}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('使用本地处理:', error.message);
      return this.workflowManager.recordPayment(caseId, paymentData);
    }
  }

  // 上传文档
  async uploadDocument(caseId, file, documentType, description = '') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', documentType);
      formData.append('description', description);

      const response = await fetch(`${this.baseURL}/cases/${caseId}/documents`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('文档上传失败:', error.message);
      
      // 模拟本地处理
      const documentData = {
        type: documentType,
        name: file.name,
        size: file.size,
        uploadedBy: 'current_user',
        description: description,
        url: URL.createObjectURL(file) // 临时URL
      };
      
      return this.workflowManager.uploadDocument(caseId, documentData);
    }
  }

  // 获取统计数据
  async getStatistics() {
    try {
      const response = await fetch(`${this.baseURL}/statistics`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.log('使用本地统计:', error.message);
      return this.workflowManager.getStatistics();
    }
  }

  // 搜索案例
  async searchCases(query) {
    try {
      const response = await fetch(`${this.baseURL}/cases/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.log('使用本地搜索:', error.message);
      
      // 简单的本地搜索实现
      const allCases = this.workflowManager.getCases();
      const filteredCases = allCases.cases.filter(c => 
        c.clientInfo.name.includes(query) ||
        c.targetInfo.name.includes(query) ||
        c.id.includes(query)
      );
      
      return { success: true, cases: filteredCases };
    }
  }

  // 导出数据
  async exportData(format = 'csv', filters = {}) {
    try {
      const params = new URLSearchParams({ format, ...filters });
      const response = await fetch(`${this.baseURL}/export?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cases_export_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.log('导出失败:', error.message);
      return { success: false, error: error.message };
    }
  }

  // 处理状态变更
  handleStatusChange(event) {
    const { caseId, newStatus } = event.detail;
    console.log(`案例 ${caseId} 状态变更为: ${newStatus}`);
    
    // 更新UI
    this.updateCaseStatusInUI(caseId, newStatus);
    
    // 发送通知
    this.sendNotification(`案例 ${caseId} 已推进到 ${newStatus} 阶段`);
  }

  // 更新UI中的案例状态
  updateCaseStatusInUI(caseId, newStatus) {
    const statusElements = document.querySelectorAll(`[data-case-id="${caseId}"] .status-badge`);
    statusElements.forEach(element => {
      element.className = `status-badge status-${newStatus}`;
      element.textContent = this.getStatusText(newStatus);
    });
  }

  // 获取状态文本
  getStatusText(status) {
    const statusMap = {
      'form': '表单提交',
      'crm': 'CRM录入',
      'legal': '法务审核',
      'quote': '报价阶段',
      'execution': '执行中',
      'report': '结果报告',
      'finance': '财务结算',
      'archive': '已归档'
    };
    return statusMap[status] || status;
  }

  // 显示成功消息
  showSuccessMessage(caseId) {
    const message = `申请提交成功！案例编号: ${caseId}，我们会尽快与您联系。`;
    this.showNotification(message, 'success');
  }

  // 显示错误消息
  showErrorMessage(message) {
    this.showNotification(message, 'error');
  }

  // 显示通知
  showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // 自动关闭
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
    
    // 手动关闭
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  }

  // 发送通知（可以是邮件、短信、推送等）
  sendNotification(message) {
    // 这里可以集成各种通知服务
    console.log('发送通知:', message);
    
    // 示例：发送到Slack、钉钉、企业微信等
    this.sendToSlack(message);
    this.sendToEmail(message);
  }

  // 发送到Slack
  async sendToSlack(message) {
    // Slack Webhook集成示例
    const webhookUrl = 'YOUR_SLACK_WEBHOOK_URL';
    
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          channel: '#findpeople-alerts',
          username: '寻人网机器人'
        })
      });
    } catch (error) {
      console.log('Slack通知发送失败:', error);
    }
  }

  // 发送邮件通知
  async sendToEmail(message) {
    // 邮件服务集成示例
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'admin@findpeople.com',
          subject: '寻人网系统通知',
          body: message
        })
      });
    } catch (error) {
      console.log('邮件通知发送失败:', error);
    }
  }
}

// 初始化API集成
document.addEventListener('DOMContentLoaded', () => {
  window.apiIntegration = new APIIntegration();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APIIntegration;
} else {
  window.APIIntegration = APIIntegration;
}