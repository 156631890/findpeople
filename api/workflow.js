// 寻人业务流程管理API
class WorkflowManager {
  constructor() {
    this.stages = [
      { id: 'form', name: '用户表单', description: '线索收集' },
      { id: 'crm', name: 'CRM/数据库', description: '信息录入和初步分析' },
      { id: 'legal', name: '法务筛查', description: '合规性审核' },
      { id: 'quote', name: '报价&合同', description: '商务洽谈和合同签署' },
      { id: 'execution', name: '执行阶段', description: '数据查询和线下调查' },
      { id: 'report', name: '结果报告', description: '成果交付' },
      { id: 'finance', name: '财务结算', description: '尾款收取' },
      { id: 'archive', name: '案例库', description: '经验积累和归档' }
    ];
    
    this.cases = new Map();
    this.initializeDatabase();
  }

  // 初始化数据库连接
  initializeDatabase() {
    // 这里应该连接到实际的数据库
    console.log('数据库连接已初始化');
  }

  // 创建新案例
  createCase(formData) {
    const caseId = this.generateCaseId();
    const newCase = {
      id: caseId,
      clientInfo: {
        name: formData.client_name,
        phone: formData.client_phone,
        email: formData.client_email,
        relationship: formData.relationship
      },
      targetInfo: {
        name: formData.target_name,
        gender: formData.target_gender,
        age: formData.target_age,
        birthplace: formData.target_birthplace,
        lastKnownLocation: formData.last_known_location,
        lastContact: formData.last_contact,
        additionalInfo: formData.additional_info
      },
      reason: formData.reason,
      status: 'form',
      currentStage: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [{
        stage: 'form',
        timestamp: new Date().toISOString(),
        action: '案例创建',
        operator: 'system',
        notes: '用户提交寻人申请'
      }],
      documents: [],
      payments: [],
      assignedTo: null,
      priority: 'normal',
      estimatedDuration: null,
      actualDuration: null
    };

    this.cases.set(caseId, newCase);
    this.notifyStakeholders(caseId, 'case_created');
    
    return { success: true, caseId, case: newCase };
  }

  // 推进案例到下一阶段
  advanceCase(caseId, operatorId, notes = '') {
    const caseData = this.cases.get(caseId);
    if (!caseData) {
      return { success: false, error: '案例不存在' };
    }

    const currentStageIndex = caseData.currentStage;
    const nextStageIndex = currentStageIndex + 1;

    if (nextStageIndex >= this.stages.length) {
      return { success: false, error: '案例已完成所有阶段' };
    }

    const nextStage = this.stages[nextStageIndex];
    
    // 检查是否满足推进条件
    const canAdvance = this.checkAdvanceConditions(caseData, nextStage.id);
    if (!canAdvance.success) {
      return canAdvance;
    }

    // 更新案例状态
    caseData.status = nextStage.id;
    caseData.currentStage = nextStageIndex;
    caseData.updatedAt = new Date().toISOString();
    
    // 添加时间线记录
    caseData.timeline.push({
      stage: nextStage.id,
      timestamp: new Date().toISOString(),
      action: `推进到${nextStage.name}`,
      operator: operatorId,
      notes: notes
    });

    // 自动分配负责人
    this.autoAssignCase(caseData, nextStage.id);

    // 发送通知
    this.notifyStakeholders(caseId, 'stage_advanced', nextStage);

    return { success: true, case: caseData };
  }

  // 检查推进条件
  checkAdvanceConditions(caseData, nextStage) {
    switch (nextStage) {
      case 'crm':
        // 表单信息完整性检查
        if (!caseData.clientInfo.name || !caseData.targetInfo.name) {
          return { success: false, error: '客户或目标人员信息不完整' };
        }
        break;
        
      case 'legal':
        // CRM录入完成检查
        if (!caseData.assignedTo) {
          return { success: false, error: '案例尚未分配负责人' };
        }
        break;
        
      case 'quote':
        // 法务审核通过检查
        const legalApproval = caseData.timeline.find(t => 
          t.stage === 'legal' && t.action.includes('审核通过')
        );
        if (!legalApproval) {
          return { success: false, error: '法务审核尚未通过' };
        }
        break;
        
      case 'execution':
        // 合同签署和定金检查
        const hasContract = caseData.documents.some(d => d.type === 'contract');
        const hasDeposit = caseData.payments.some(p => p.type === 'deposit' && p.status === 'completed');
        if (!hasContract || !hasDeposit) {
          return { success: false, error: '合同未签署或定金未到账' };
        }
        break;
        
      case 'report':
        // 执行结果检查
        const executionResult = caseData.timeline.find(t => 
          t.stage === 'execution' && t.action.includes('执行完成')
        );
        if (!executionResult) {
          return { success: false, error: '执行阶段尚未完成' };
        }
        break;
        
      case 'finance':
        // 报告交付检查
        const reportDelivered = caseData.documents.some(d => d.type === 'report');
        if (!reportDelivered) {
          return { success: false, error: '结果报告尚未交付' };
        }
        break;
        
      case 'archive':
        // 尾款收取检查
        const finalPayment = caseData.payments.some(p => p.type === 'final' && p.status === 'completed');
        if (!finalPayment) {
          return { success: false, error: '尾款尚未收取' };
        }
        break;
    }
    
    return { success: true };
  }

  // 自动分配案例
  autoAssignCase(caseData, stage) {
    const assignments = {
      'crm': 'crm_team',
      'legal': 'legal_team',
      'quote': 'sales_team',
      'execution': 'investigation_team',
      'report': 'report_team',
      'finance': 'finance_team',
      'archive': 'admin_team'
    };

    if (assignments[stage]) {
      caseData.assignedTo = assignments[stage];
      caseData.timeline.push({
        stage: stage,
        timestamp: new Date().toISOString(),
        action: `自动分配给${assignments[stage]}`,
        operator: 'system',
        notes: '系统自动分配'
      });
    }
  }

  // 法务审核
  legalReview(caseId, operatorId, approved, reason = '') {
    const caseData = this.cases.get(caseId);
    if (!caseData || caseData.status !== 'legal') {
      return { success: false, error: '案例状态不正确' };
    }

    const action = approved ? '法务审核通过' : '法务审核拒绝';
    caseData.timeline.push({
      stage: 'legal',
      timestamp: new Date().toISOString(),
      action: action,
      operator: operatorId,
      notes: reason
    });

    if (approved) {
      // 审核通过，可以推进到报价阶段
      caseData.legalApproved = true;
    } else {
      // 审核拒绝，标记案例状态
      caseData.status = 'rejected';
      caseData.rejectionReason = reason;
    }

    caseData.updatedAt = new Date().toISOString();
    this.notifyStakeholders(caseId, 'legal_reviewed', { approved, reason });

    return { success: true, case: caseData };
  }

  // 生成报价
  generateQuote(caseId, operatorId, quoteData) {
    const caseData = this.cases.get(caseId);
    if (!caseData || caseData.status !== 'quote') {
      return { success: false, error: '案例状态不正确' };
    }

    const quote = {
      id: this.generateQuoteId(),
      caseId: caseId,
      amount: quoteData.amount,
      currency: quoteData.currency || 'CNY',
      description: quoteData.description,
      validUntil: quoteData.validUntil,
      terms: quoteData.terms,
      createdBy: operatorId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    if (!caseData.quotes) {
      caseData.quotes = [];
    }
    caseData.quotes.push(quote);

    caseData.timeline.push({
      stage: 'quote',
      timestamp: new Date().toISOString(),
      action: '生成报价',
      operator: operatorId,
      notes: `报价金额: ${quote.amount} ${quote.currency}`
    });

    caseData.updatedAt = new Date().toISOString();
    this.notifyStakeholders(caseId, 'quote_generated', quote);

    return { success: true, quote: quote };
  }

  // 记录支付
  recordPayment(caseId, paymentData) {
    const caseData = this.cases.get(caseId);
    if (!caseData) {
      return { success: false, error: '案例不存在' };
    }

    const payment = {
      id: this.generatePaymentId(),
      caseId: caseId,
      type: paymentData.type, // 'deposit' | 'final'
      amount: paymentData.amount,
      currency: paymentData.currency || 'CNY',
      method: paymentData.method,
      transactionId: paymentData.transactionId,
      status: paymentData.status || 'completed',
      paidAt: new Date().toISOString(),
      notes: paymentData.notes
    };

    caseData.payments.push(payment);

    caseData.timeline.push({
      stage: caseData.status,
      timestamp: new Date().toISOString(),
      action: `收到${payment.type === 'deposit' ? '定金' : '尾款'}`,
      operator: 'finance_team',
      notes: `金额: ${payment.amount} ${payment.currency}`
    });

    caseData.updatedAt = new Date().toISOString();
    this.notifyStakeholders(caseId, 'payment_received', payment);

    return { success: true, payment: payment };
  }

  // 上传文档
  uploadDocument(caseId, documentData) {
    const caseData = this.cases.get(caseId);
    if (!caseData) {
      return { success: false, error: '案例不存在' };
    }

    const document = {
      id: this.generateDocumentId(),
      caseId: caseId,
      type: documentData.type, // 'contract' | 'report' | 'evidence' | 'other'
      name: documentData.name,
      url: documentData.url,
      size: documentData.size,
      uploadedBy: documentData.uploadedBy,
      uploadedAt: new Date().toISOString(),
      description: documentData.description
    };

    caseData.documents.push(document);

    caseData.timeline.push({
      stage: caseData.status,
      timestamp: new Date().toISOString(),
      action: '上传文档',
      operator: document.uploadedBy,
      notes: `文档类型: ${document.type}, 文件名: ${document.name}`
    });

    caseData.updatedAt = new Date().toISOString();
    this.notifyStakeholders(caseId, 'document_uploaded', document);

    return { success: true, document: document };
  }

  // 获取案例详情
  getCase(caseId) {
    const caseData = this.cases.get(caseId);
    if (!caseData) {
      return { success: false, error: '案例不存在' };
    }
    return { success: true, case: caseData };
  }

  // 获取案例列表
  getCases(filters = {}) {
    let cases = Array.from(this.cases.values());

    // 应用过滤器
    if (filters.status) {
      cases = cases.filter(c => c.status === filters.status);
    }
    if (filters.assignedTo) {
      cases = cases.filter(c => c.assignedTo === filters.assignedTo);
    }
    if (filters.dateFrom) {
      cases = cases.filter(c => new Date(c.createdAt) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      cases = cases.filter(c => new Date(c.createdAt) <= new Date(filters.dateTo));
    }

    // 排序
    cases.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return { success: true, cases: cases };
  }

  // 获取统计数据
  getStatistics() {
    const cases = Array.from(this.cases.values());
    const stats = {
      total: cases.length,
      byStatus: {},
      byStage: {},
      successRate: 0,
      averageDuration: 0,
      monthlyRevenue: 0
    };

    // 按状态统计
    this.stages.forEach(stage => {
      stats.byStatus[stage.id] = cases.filter(c => c.status === stage.id).length;
    });

    // 计算成功率
    const completedCases = cases.filter(c => c.status === 'archive');
    const successfulCases = completedCases.filter(c => 
      c.timeline.some(t => t.action.includes('成功'))
    );
    stats.successRate = completedCases.length > 0 ? 
      Math.round((successfulCases.length / completedCases.length) * 100) : 0;

    // 计算本月收入
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    stats.monthlyRevenue = cases.reduce((total, caseData) => {
      return total + caseData.payments
        .filter(p => {
          const paymentDate = new Date(p.paidAt);
          return paymentDate.getMonth() === thisMonth && 
                 paymentDate.getFullYear() === thisYear &&
                 p.status === 'completed';
        })
        .reduce((sum, p) => sum + p.amount, 0);
    }, 0);

    return stats;
  }

  // 通知相关人员
  notifyStakeholders(caseId, eventType, data = {}) {
    // 这里应该实现实际的通知逻辑（邮件、短信、系统通知等）
    console.log(`通知: 案例 ${caseId} 发生事件 ${eventType}`, data);
    
    // 可以集成邮件服务、短信服务、WebSocket等
    this.sendEmailNotification(caseId, eventType, data);
    this.sendSystemNotification(caseId, eventType, data);
  }

  sendEmailNotification(caseId, eventType, data) {
    // 邮件通知逻辑
    console.log(`发送邮件通知: ${eventType}`);
  }

  sendSystemNotification(caseId, eventType, data) {
    // 系统内通知逻辑
    console.log(`发送系统通知: ${eventType}`);
  }

  // 生成ID的辅助方法
  generateCaseId() {
    const year = new Date().getFullYear();
    const sequence = String(this.cases.size + 1).padStart(3, '0');
    return `FP${year}${sequence}`;
  }

  generateQuoteId() {
    return `Q${Date.now()}`;
  }

  generatePaymentId() {
    return `P${Date.now()}`;
  }

  generateDocumentId() {
    return `D${Date.now()}`;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WorkflowManager;
} else {
  window.WorkflowManager = WorkflowManager;
}