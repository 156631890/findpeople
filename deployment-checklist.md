# 寻人网部署检查清单

## 🚀 部署前准备

### 1. 域名和服务器配置
- [ ] 购买域名 (建议: findpeople.com)
- [ ] 选择托管服务 (推荐: Netlify/Vercel/阿里云)
- [ ] 配置DNS解析
- [ ] 申请SSL证书

### 2. 第三方服务配置

#### Google Services
- [ ] 申请Google AdSense账号
- [ ] 更新所有HTML文件中的发布商ID: `ca-pub-8231924120348302`
- [ ] 设置Google Analytics 4
- [ ] 配置Google Search Console
- [ ] 提交sitemap.xml

#### 表单处理服务
- [ ] 注册Formspree账号 (https://formspree.io)
- [ ] 创建表单端点
- [ ] 更新search.html和search-en.html中的表单ID
- [ ] 测试表单提交功能

#### 邮件服务 (可选)
- [ ] 配置SMTP服务 (推荐: SendGrid/Mailgun)
- [ ] 设置自动回复邮件模板
- [ ] 配置通知邮件

### 3. 文件更新清单

#### 必须更新的内容
```bash
# 1. 更新域名 (全局替换)
find . -name "*.html" -o -name "*.xml" -o -name "*.txt" | xargs sed -i 's/www.findpeople.com/你的实际域名/g'

# 2. 更新AdSense发布商ID
find . -name "*.html" | xargs sed -i 's/ca-pub-8231924120348302/你的AdSense发布商ID/g'

# 3. 更新Formspree表单ID
sed -i 's/yourFormID/你的Formspree表单ID/g' search.html search-en.html
```

#### 联系信息更新
- [ ] 更新privacy.html中的联系邮箱
- [ ] 更新terms.html中的公司地址
- [ ] 更新footer中的联系信息

### 4. 性能优化配置

#### 图片优化
- [ ] 压缩所有图片文件
- [ ] 生成WebP格式图片
- [ ] 创建不同尺寸的响应式图片

#### 缓存配置
```nginx
# Nginx配置示例
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public";
}
```

### 5. 安全配置

#### HTTP安全头
```nginx
add_header X-Frame-Options "DENY";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' *.googleapis.com *.googlesyndication.com; style-src 'self' 'unsafe-inline' *.googleapis.com;";
```

## 📋 部署步骤

### 方案A: Netlify部署 (推荐新手)

1. **准备文件**
   ```bash
   # 创建部署包
   zip -r findpeople-website.zip findpeople/
   ```

2. **Netlify配置**
   - 访问 https://netlify.com
   - 拖拽zip文件到部署区域
   - 配置自定义域名
   - 启用HTTPS

3. **环境变量配置**
   ```
   FORMSPREE_ENDPOINT=你的Formspree端点
   GA_MEASUREMENT_ID=你的GA4测量ID
   ADSENSE_CLIENT_ID=你的AdSense客户端ID
   ```

### 方案B: Vercel部署 (推荐开发者)

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **部署配置**
   ```json
   // vercel.json
   {
     "rewrites": [
       { "source": "/en", "destination": "/index-en.html" },
       { "source": "/en/search", "destination": "/search-en.html" }
     ],
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           { "key": "X-Content-Type-Options", "value": "nosniff" },
           { "key": "X-Frame-Options", "value": "DENY" },
           { "key": "X-XSS-Protection", "value": "1; mode=block" }
         ]
       }
     ]
   }
   ```

3. **部署命令**
   ```bash
   cd findpeople
   vercel --prod
   ```

### 方案C: 阿里云部署 (推荐中国用户)

1. **服务器配置**
   - 购买ECS实例 (1核2G即可)
   - 安装Nginx
   - 配置域名解析

2. **文件上传**
   ```bash
   scp -r findpeople/* root@你的服务器IP:/var/www/html/
   ```

3. **Nginx配置**
   ```nginx
   server {
       listen 80;
       server_name 你的域名;
       root /var/www/html;
       index index.html;
       
       # 多语言支持
       location /en/ {
           try_files $uri $uri/ /index-en.html;
       }
       
       # Gzip压缩
       gzip on;
       gzip_types text/css application/javascript text/javascript;
   }
   ```

## ✅ 部署后检查

### 功能测试
- [ ] 主页加载正常
- [ ] 多语言切换功能
- [ ] 表单提交测试
- [ ] 移动端适配检查
- [ ] 页面加载速度测试

### SEO检查
- [ ] Google Search Console验证
- [ ] 提交sitemap.xml
- [ ] robots.txt可访问
- [ ] 页面标题和描述检查
- [ ] 结构化数据验证

### 分析工具
- [ ] Google Analytics数据收集
- [ ] AdSense广告显示
- [ ] 页面性能分析
- [ ] 用户行为跟踪

### 安全检查
- [ ] HTTPS证书有效
- [ ] 安全头配置
- [ ] 表单防护测试
- [ ] 隐私政策合规

## 📞 技术支持

如遇到部署问题，可以：
1. 查看部署平台官方文档
2. 检查浏览器控制台错误
3. 验证第三方服务配置
4. 测试网络连接和DNS解析

## 🎯 上线后优化

### 第一周
- [ ] 监控网站可用性
- [ ] 收集用户反馈
- [ ] 分析访问数据
- [ ] 优化页面性能

### 第一个月
- [ ] SEO效果评估
- [ ] 广告收入分析
- [ ] 用户转化率优化
- [ ] 内容更新和维护

---

**重要提醒**: 
1. 备份所有配置和数据
2. 测试所有功能后再正式上线
3. 准备应急回滚方案
4. 监控网站性能和安全