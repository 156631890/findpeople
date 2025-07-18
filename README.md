# 寻人网 (FindPeople) 

<div align="center">
  <img src="favicon.svg" alt="寻人网 Logo" width="120" height="120">
  <h3>专业人员查找服务平台</h3>
  <p>帮助用户重新连接失联的亲友、同学、同事，提供安全、合法、高效的寻人解决方案</p>
  
  <p>
    <a href="https://www.findpeople.online/">官方网站</a> •
    <a href="https://www.findpeople.online/search.html">开始寻人</a> •
    <a href="https://www.findpeople.online/success-stories.html">成功案例</a> •
    <a href="#联系我们">联系我们</a>
  </p>
</div>

## 📋 目录

- [项目概述](#项目概述)
- [功能特点](#功能特点)
- [技术架构](#技术架构)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [配置指南](#配置指南)
- [SEO优化](#seo优化)
- [性能优化](#性能优化)
- [多语言支持](#多语言支持)
- [安全与隐私](#安全与隐私)
- [分析与监控](#分析与监控)
- [部署指南](#部署指南)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)
- [许可说明](#许可说明)
- [联系我们](#联系我们)

## 📖 项目概述

寻人网是一个专业的人员查找服务平台，致力于帮助用户找到失联的亲友、同学、同事等重要人员。平台采用现代化的技术架构，提供用户友好的界面和高效的寻人服务流程。

### 核心价值

- **98% 成功率**：专业的调查团队和先进技术手段
- **安全合法**：严格遵守法律法规，保护个人隐私
- **高效便捷**：简化寻人流程，多种服务级别可选
- **全面服务**：从信息收集到成功团聚的全流程支持

## 🌟 功能特点

- **多语言支持**：中文和英文双语界面，满足不同用户需求
- **响应式设计**：完美适配桌面、平板和移动设备
- **SEO优化**：全面的搜索引擎优化，提高网站可见性
- **结构化数据**：丰富的Schema.org标记，增强搜索结果展示
- **隐私保护**：严格的隐私政策和数据保护措施
- **表单处理**：安全的表单提交和处理机制
- **广告集成**：Google AdSense广告支持，实现商业变现
- **性能优化**：快速加载速度，提升用户体验
- **社交分享**：便捷的社交媒体分享功能
- **案例展示**：真实成功案例展示，增强用户信任

## 💻 技术架构

- **前端技术**：HTML5, CSS3, JavaScript (ES6+)
- **响应式框架**：自定义CSS变量和媒体查询
- **性能优化**：资源延迟加载、图片优化
- **SEO实现**：结构化数据、语义化HTML、元标签优化
- **第三方集成**：Google Analytics, AdSense, Formspree
- **多语言实现**：基于HTML属性的语言切换
- **安全措施**：内容安全策略、HTTPS支持

## 📁 项目结构

```
findpeople/
├── index.html              # 中文主页
├── index-en.html           # 英文主页
├── search.html             # 中文搜索页面
├── search-en.html          # 英文搜索页面
├── success-stories.html    # 中文成功案例
├── success-stories-en.html # 英文成功案例
├── privacy.html            # 隐私政策
├── terms.html              # 使用条款
├── blog/                   # 博客目录
│   ├── index.html          # 博客首页
│   └── how-to-find-lost-relatives.html  # 博客文章
├── admin/                  # 管理后台
│   ├── index.html          # 管理首页
│   └── case-detail.html    # 案例详情页
├── api/                    # API接口
│   ├── integration.js      # 第三方集成
│   └── workflow.js         # 工作流程处理
├── js/                     # JavaScript文件
│   ├── main.js             # 主要功能脚本
│   ├── schema-markup.js    # 结构化数据脚本
│   ├── testimonials.js     # 客户评价脚本
│   ├── chat-support.js     # 在线客服脚本
│   └── analytics.js        # 分析统计脚本
├── partials/               # 页面组件
│   └── site-style.css      # 全局样式文件
├── sitemap.xml             # 网站地图
├── robots.txt              # 搜索引擎配置
├── favicon.svg             # 网站图标
├── google-verification.html # Google站点验证
├── deployment-checklist.md # 部署检查清单
├── seo-optimization-guide.md # SEO优化指南
└── DEPLOYMENT_GUIDE        # 部署指南
```

## 🚀 快速开始

### 本地开发环境

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/findpeople.git
   cd findpeople
   ```

2. **启动本地服务器**
   ```bash
   # 使用Node.js
   npx serve .
   
   # 或使用Python
   python -m http.server 8000
   
   # 或使用PHP
   php -S localhost:8000
   ```

3. **访问本地站点**
   打开浏览器访问 `http://localhost:8000` 或对应端口

### 开发工作流程

1. **编辑HTML/CSS/JS文件**
2. **刷新浏览器查看更改**
3. **使用浏览器开发工具调试**
4. **验证更改符合项目标准**

## ⚙️ 配置指南

### 基础配置

1. **域名设置**
   - 更新所有HTML文件中的canonical链接
   - 修改 `sitemap.xml` 中的域名
   - 更新 `robots.txt` 中的Sitemap URL

2. **品牌信息**
   - 修改网站名称、Logo和联系信息
   - 更新页脚版权信息
   - 替换默认图片和图标

### 第三方服务配置

#### Google AdSense
更新以下文件中的发布商ID：
- `index.html`
- `index-en.html`
- `search.html`
- `search-en.html`
- `success-stories.html`

将 `ca-pub-8231924120348302` 替换为你的AdSense发布商ID。

#### 表单处理
搜索表单使用Formspree处理：
1. 注册 [Formspree](https://formspree.io) 账号
2. 创建新表单
3. 将表单ID替换到 `search.html` 和 `search-en.html` 中的 `yourFormID`

#### 分析工具
在 `js/analytics.js` 中配置分析工具：
1. 替换Google Analytics的测量ID
2. 根据需要添加其他分析工具代码

### 自定义样式

主要样式变量在 `partials/site-style.css` 中定义：

```css
:root {
  --bg: #f8fafc;           /* 背景色 */
  --primary: #3b82f6;      /* 主色调 */
  --text: #0f172a;         /* 文字色 */
  --muted: #6b7280;        /* 次要文字色 */
}
```

修改这些变量可以快速更改整个网站的配色方案。

## 🔍 SEO优化

### 已实现的SEO功能

- **语义化HTML结构**：使用适当的HTML5标签
- **Meta标签优化**：标题、描述、关键词等
- **结构化数据**：丰富的Schema.org标记
- **网站地图**：自动生成的sitemap.xml
- **Robots.txt**：搜索引擎爬虫配置
- **多语言标记**：hreflang标签支持
- **移动友好**：响应式设计，通过移动兼容性测试
- **页面速度优化**：资源压缩和优化加载

### 结构化数据实现

网站使用 `js/schema-markup.js` 脚本自动为不同页面添加适当的结构化数据：

已实现的结构化数据类型：

1. **Organization** - 组织信息（所有页面）
2. **LocalBusiness** - 本地企业信息（首页）
3. **Service** - 服务信息（首页、搜索页面）
4. **Offer** - 报价信息（搜索页面）
5. **Article** - 文章信息（博客、成功案例）
6. **FAQPage** - 常见问题（首页）
7. **WebSite** - 网站信息（所有页面）
8. **BreadcrumbList** - 面包屑导航（所有页面）
9. **Review** - 评价信息（成功案例页面）
10. **Product** - 产品信息（会员计划页面）
11. **JobPosting** - 工作机会信息（招聘页面）
12. **Event** - 活动信息（活动页面）
13. **VideoObject** - 视频内容信息（包含视频的页面）

脚本会根据页面类型和URL自动选择适合的结构化数据类型，无需手动配置。

### SEO最佳实践

详细的SEO优化指南请参考 [seo-optimization-guide.md](./seo-optimization-guide.md)，其中包含：

- 关键词研究和使用策略
- 内容优化建议
- 外部链接建设指南
- 本地SEO优化方法
- 搜索引擎提交流程

## ⚡ 性能优化

### 已实现的性能优化

- **资源延迟加载**：非关键资源延迟加载
- **图片优化**：适当的图片格式和大小
- **CSS优化**：简化的CSS结构
- **JavaScript优化**：避免阻塞渲染
- **字体优化**：使用系统字体和预连接
- **缓存策略**：适当的缓存头设置

### 性能指标

- **首次内容绘制 (FCP)**：< 1.8秒
- **最大内容绘制 (LCP)**：< 2.5秒
- **首次输入延迟 (FID)**：< 100毫秒
- **累积布局偏移 (CLS)**：< 0.1

## 🌐 多语言支持

### 已支持语言

- **中文**：默认语言，适合中国大陆用户
- **英文**：国际用户支持

### 语言切换机制

- 页面顶部的语言切换器
- 基于URL的语言版本（如index.html和index-en.html）
- 适当的hreflang标签指向对应语言版本

### 添加新语言

1. 复制现有HTML文件并重命名（如index-fr.html）
2. 翻译所有文本内容
3. 更新语言切换链接
4. 添加适当的hreflang标签

## 🛡️ 安全与隐私

### 安全措施

- **HTTPS支持**：所有页面强制HTTPS
- **内容安全策略**：限制资源加载来源
- **XSS防护**：输入验证和输出编码
- **CSRF防护**：表单提交保护
- **安全头部**：适当的HTTP安全头部

### 隐私保护

- **隐私政策**：符合GDPR和CCPA的隐私政策
- **Cookie同意**：用户可选的Cookie同意机制
- **数据最小化**：仅收集必要的用户数据
- **数据加密**：敏感数据传输和存储加密

## 📊 分析与监控

### 推荐的分析工具

- **Google Analytics 4**：用户行为分析
- **Google Search Console**：搜索性能监控
- **PageSpeed Insights**：性能分析
- **Hotjar**：用户行为热图和录制

### 监控指标

- **流量来源**：了解用户从哪里找到网站
- **用户行为**：页面浏览、停留时间、跳出率
- **转化率**：表单提交和服务咨询
- **技术指标**：加载时间、错误率、设备类型

## 🚢 部署指南

详细部署说明请参考 [DEPLOYMENT_GUIDE](./DEPLOYMENT_GUIDE) 文件。

### 部署检查清单

部署前请参考 [deployment-checklist.md](./deployment-checklist.md) 确保：

1. 所有链接正常工作
2. 图片和资源正确加载
3. 表单提交功能正常
4. 跨浏览器兼容性
5. 移动设备适配
6. SEO元素正确配置
7. 性能指标达标
8. 安全措施到位

### 推荐的部署平台

- **Netlify**：免费托管，自动部署，适合新手
- **Vercel**：卓越性能，适合前端应用
- **阿里云**：中国用户访问速度快
- **GitHub Pages**：免费静态网站托管
- **AWS S3 + CloudFront**：高性能全球分发

## ❓ 常见问题

### 技术问题

1. **如何修改网站颜色？**
   - 编辑 `partials/site-style.css` 中的CSS变量

2. **如何添加新页面？**
   - 复制现有HTML文件并修改内容
   - 更新导航链接
   - 添加到sitemap.xml

3. **如何更新结构化数据？**
   - 修改 `js/schema-markup.js` 中的相应函数

### 业务问题

1. **寻人服务如何收费？**
   - 根据服务级别和案例复杂度定价
   - 标准服务：3,000元起
   - 快速服务：4,500元起
   - 加急服务：6,000元起
   - 特急服务：9,000元起

2. **服务成功率是多少？**
   - 整体成功率：98%
   - 根据案例复杂度和提供信息完整度有所不同

3. **服务流程是怎样的？**
   - 提交申请 → 专家评估 → 制定方案 → 执行寻人 → 结果反馈

## 🤝 贡献指南

我们欢迎社区贡献，帮助改进寻人网项目：

1. Fork项目仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

### 贡献领域

- 界面设计改进
- 性能优化
- 多语言支持扩展
- 文档完善
- Bug修复

## 📄 许可说明

本项目仅供学习和参考使用。商业使用请确保遵守相关法律法规。

### 使用限制

- 不得用于非法目的
- 不得移除版权信息
- 不得用于损害他人隐私的活动

## 📞 联系我们

如有问题或建议，请通过以下方式联系：

- **官方网站**：[www.findpeople.online](https://www.findpeople.online)
- **电子邮箱**：contact@findpeople.online
- **客服电话**：400-123-4567
- **工作时间**：周一至周五 9:00-18:00

---

<div align="center">
  <p>© 2025 寻人网 (FindPeople) - 专业的人员查找服务平台</p>
  <p>
    <a href="https://www.findpeople.online/privacy.html">隐私政策</a> •
    <a href="https://www.findpeople.online/terms.html">使用条款</a> •
    <a href="https://www.findpeople.online/sitemap.xml">网站地图</a>
  </p>
</div>