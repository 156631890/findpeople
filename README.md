# 寻人网 (FindPeople)

专业的人员查找服务平台，帮助用户找到失联的亲友、同学、同事等重要人员。

## 🌟 功能特点

- **多语言支持**: 中文和英文双语界面
- **响应式设计**: 适配桌面和移动设备
- **SEO优化**: 完整的搜索引擎优化配置
- **隐私保护**: 严格的隐私政策和数据保护
- **广告集成**: Google AdSense广告支持

## 📁 项目结构

```
findpeople/
├── index.html              # 中文主页
├── index-en.html          # 英文主页
├── search.html            # 中文搜索页面
├── search-en.html         # 英文搜索页面
├── success.stories.html   # 成功案例
├── privacy.html           # 隐私政策
├── terms.html            # 使用条款
├── sitemap.xml           # 网站地图
├── robots.txt            # 搜索引擎配置
├── favicon.svg           # 网站图标
├── partials/
│   └── site-style.css    # 全局样式文件
└── DEPLOYMENT_GUIDE      # 部署指南
```

## 🚀 快速开始

### 本地预览
1. 下载所有文件到本地目录
2. 使用任何HTTP服务器运行，例如：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 使用Node.js
   npx serve .
   
   # 使用PHP
   php -S localhost:8000
   ```
3. 访问 `http://localhost:8000`

### 部署到生产环境
详细部署说明请参考 [DEPLOYMENT_GUIDE](./DEPLOYMENT_GUIDE) 文件。

推荐的部署平台：
- **Netlify** (免费，推荐新手)
- **Vercel** (性能优秀)
- **阿里云** (中国用户)
- **GitHub Pages** (免费)

## ⚙️ 配置说明

### Google AdSense
更新以下文件中的发布商ID：
- `index.html`
- `index-en.html`
- `search.html`
- `search-en.html`
- `success.stories.html`

将 `ca-pub-8231924120348302` 替换为你的AdSense发布商ID。

### 表单处理
搜索表单使用Formspree处理，需要：
1. 注册 [Formspree](https://formspree.io) 账号
2. 创建新表单
3. 将表单ID替换到 `search.html` 和 `search-en.html` 中的 `yourFormID`

### 域名配置
更新以下文件中的域名：
- `sitemap.xml` - 将 `https://www.findpeople.com` 替换为你的域名
- `robots.txt` - 更新Sitemap URL
- 所有HTML文件中的canonical链接

## 🎨 自定义样式

主要样式变量在 `partials/site-style.css` 中定义：

```css
:root {
  --bg: #f8fafc;           /* 背景色 */
  --primary: #3b82f6;      /* 主色调 */
  --text: #0f172a;         /* 文字色 */
  --muted: #6b7280;        /* 次要文字色 */
}
```

## 📱 响应式设计

网站完全响应式，支持：
- 桌面设备 (1200px+)
- 平板设备 (768px - 1199px)
- 移动设备 (< 768px)

## 🔍 SEO优化

已包含的SEO功能：
- 语义化HTML结构
- Meta标签优化
- 结构化数据 (待添加)
- 网站地图 (sitemap.xml)
- Robots.txt配置
- 多语言hreflang标签

## 🛡️ 安全性

- HTTPS强制重定向 (需服务器配置)
- 安全头部设置
- 表单验证和防护
- 隐私政策合规

## 📊 分析和监控

建议集成：
- Google Analytics 4
- Google Search Console
- 网站性能监控工具

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。

## 📄 许可证

本项目仅供学习和参考使用。商业使用请确保遵守相关法律法规。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱: contact@findpeople.com
- 电话: 400-123-4567

---

**注意**: 这是一个演示项目，实际使用时请确保：
1. 遵守当地法律法规
2. 保护用户隐私
3. 使用合法的数据收集方式
4. 建立完善的服务条款