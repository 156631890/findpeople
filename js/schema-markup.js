// 结构化数据标记脚本
document.addEventListener('DOMContentLoaded', function() {
  // 检测当前页面类型
  const currentPath = window.location.pathname;
  
  // 添加组织信息标记 (所有页面)
  addOrganizationSchema();
  
  // 根据页面类型添加特定标记
  if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index-en.html') {
    addServiceSchema();
  } else if (currentPath.includes('success-stories')) {
    addArticleSchema();
  } else if (currentPath.includes('search')) {
    addServiceSchema();
  }
});

// 添加组织信息标记
function addOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "寻人网",
    "url": "https://www.findpeople.com",
    "logo": "https://www.findpeople.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-400-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Chinese", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/findpeople",
      "https://twitter.com/findpeople",
      "https://www.linkedin.com/company/findpeople"
    ]
  };
  
  createSchemaScript(schema);
}

// 添加服务信息标记
function addServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "People Search Service",
    "provider": {
      "@type": "Organization",
      "name": "寻人网"
    },
    "areaServed": {
      "@type": "Country",
      "name": "China"
    },
    "description": "专业的人员查找服务，帮助您找到失联的亲友、同学、同事",
    "offers": {
      "@type": "Offer",
      "price": "3000.00",
      "priceCurrency": "CNY"
    }
  };
  
  createSchemaScript(schema);
}

// 添加文章信息标记 (成功案例)
function addArticleSchema() {
  // 获取页面上的成功案例
  const storyCards = document.querySelectorAll('.story-card');
  
  if (storyCards.length > 0) {
    storyCards.forEach((card, index) => {
      // 只为前3个案例添加结构化数据
      if (index < 3) {
        const title = card.querySelector('.story-title')?.textContent || '寻人成功案例';
        const date = card.querySelector('.story-date')?.textContent || '2025-01-01';
        const content = card.querySelector('.story-content p')?.textContent || '';
        const image = card.querySelector('.story-image')?.src || 'https://www.findpeople.com/images/default-story.jpg';
        
        const schema = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "image": image,
          "datePublished": formatDate(date),
          "author": {
            "@type": "Organization",
            "name": "寻人网"
          },
          "publisher": {
            "@type": "Organization",
            "name": "寻人网",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.findpeople.com/logo.png"
            }
          },
          "description": content
        };
        
        createSchemaScript(schema);
      }
    });
  } else {
    // 如果没有找到案例卡片，添加默认案例
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "母子重逢：分离30年后的团聚",
      "image": "https://www.findpeople.com/images/success-story1.jpg",
      "datePublished": "2024-12-15",
      "author": {
        "@type": "Organization",
        "name": "寻人网"
      },
      "publisher": {
        "@type": "Organization",
        "name": "寻人网",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.findpeople.com/logo.png"
        }
      },
      "description": "李女士因为历史原因与儿子分离30年，通过我们的专业团队，最终在河南省找到了她的儿子。"
    };
    
    createSchemaScript(schema);
  }
}

// 创建并添加结构化数据脚本
function createSchemaScript(schemaObject) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemaObject);
  document.head.appendChild(script);
}

// 格式化日期
function formatDate(dateString) {
  // 处理"2024年12月"这样的格式
  if (dateString.includes('年') && dateString.includes('月')) {
    const year = dateString.split('年')[0];
    const month = dateString.split('年')[1].split('月')[0].padStart(2, '0');
    return `${year}-${month}-01`;
  }
  
  // 如果是其他格式，返回当前日期
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}