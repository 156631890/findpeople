// 结构化数据标记脚本
document.addEventListener('DOMContentLoaded', function() {
  // 检测当前页面类型
  const currentPath = window.location.pathname;
  
  // 添加组织信息标记 (所有页面)
  addOrganizationSchema();
  
  // 根据页面类型添加特定标记
  if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index-en.html') {
    addServiceSchema();
    addLocalBusinessSchema();
    addFAQSchema();
  } else if (currentPath.includes('success-stories') || currentPath.includes('blog')) {
    addArticleSchema();
  } else if (currentPath.includes('search')) {
    addServiceSchema();
    addOfferSchema();
  }
});

// 添加组织信息标记
function addOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "寻人网",
    "alternateName": "FindPeople",
    "url": "https://www.findpeople.online/",
    "logo": "https://www.findpeople.online/favicon.svg",
    "sameAs": [
      "https://www.facebook.com/findpeople",
      "https://twitter.com/findpeople",
      "https://www.linkedin.com/company/findpeople"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-400-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Chinese", "English"],
      "contactOption": "TollFree",
      "areaServed": "CN"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressLocality": "Beijing",
      "addressRegion": "Beijing",
      "postalCode": "100000",
      "streetAddress": "123 Main Street"
    },
    "description": "寻人网提供专业的人员查找服务，帮助您找到失联的亲友、同学、同事。98%成功率，安全、合法、高效的寻人解决方案。"
  };
  
  createSchemaScript(schema);
}

// 添加本地企业信息标记
function addLocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "寻人网",
    "image": "https://www.findpeople.online/images/office.jpg",
    "priceRange": "¥¥¥",
    "@id": "https://www.findpeople.online/",
    "url": "https://www.findpeople.online/",
    "telephone": "+86-400-123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Beijing",
      "addressRegion": "Beijing",
      "postalCode": "100000",
      "addressCountry": "CN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.9042,
      "longitude": 116.4074
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
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
    "name": "专业寻人服务",
    "alternateName": "Professional People Search Service",
    "description": "专业的人员查找服务，帮助您找到失联的亲友、同学、同事。98%成功率，安全、合法、高效的寻人解决方案。",
    "provider": {
      "@type": "Organization",
      "name": "寻人网",
      "url": "https://www.findpeople.online/"
    },
    "areaServed": {
      "@type": "Country",
      "name": "China"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "寻人服务类型",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "失联亲友寻找"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "同学老友重聚"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "商务人员查找"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "法律相关寻人"
          }
        }
      ]
    },
    "termsOfService": "https://www.findpeople.online/terms.html"
  };
  
  createSchemaScript(schema);
}

// 添加报价信息标记
function addOfferSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "专业寻人服务",
      "description": "专业的人员查找服务，帮助您找到失联的亲友、同学、同事。"
    },
    "price": "3000.00",
    "priceCurrency": "CNY",
    "priceValidUntil": "2025-12-31",
    "availability": "https://schema.org/InStock",
    "url": "https://www.findpeople.online/search.html",
    "seller": {
      "@type": "Organization",
      "name": "寻人网"
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "CN",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  };
  
  createSchemaScript(schema);
}

// 添加文章信息标记
function addArticleSchema() {
  // 获取页面上的文章信息
  const title = document.querySelector('h1')?.textContent || document.title;
  const description = document.querySelector('meta[name="description"]')?.content || '';
  const datePublished = document.querySelector('.blog-meta')?.textContent || new Date().toISOString().split('T')[0];
  const imageElement = document.querySelector('.blog-content img, .story-image, .featured-image');
  const image = imageElement ? imageElement.src : 'https://www.findpeople.online/images/default-image.jpg';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": "寻人网",
      "url": "https://www.findpeople.online/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "寻人网",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.findpeople.online/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };
  
  createSchemaScript(schema);
}

// 添加FAQ信息标记
function addFAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "寻人服务的成功率有多高？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "我们的寻人服务成功率高达98%。通过专业的调查团队、先进的技术手段和广泛的资源网络，我们能够在大多数情况下成功找到目标人员。"
        }
      },
      {
        "@type": "Question",
        "name": "寻人服务需要多长时间？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "寻人时间因案例复杂度而异，一般标准服务需要15-30个工作日，快速服务7-14个工作日，加急服务3-7个工作日，特急服务24-72小时。具体时间会根据提供的信息完整度和案例难度进行评估。"
        }
      },
      {
        "@type": "Question",
        "name": "寻人服务的收费标准是什么？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "我们的收费标准基于案例复杂度和服务级别，标准服务起价3,000元，快速服务起价4,500元，加急服务起价6,000元，特急服务起价9,000元。我们提供透明的定价和服务说明，确保客户了解每项费用的用途。"
        }
      },
      {
        "@type": "Question",
        "name": "需要提供哪些信息才能开始寻人？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "开始寻人服务需要提供：目标人员的基本信息（姓名、年龄、性别等）、最后已知地址或位置、联系方式、社交媒体账号（如有）、照片（如有）以及与目标人员的关系。信息越详细，寻人成功率越高。"
        }
      },
      {
        "@type": "Question",
        "name": "如果寻人不成功会退款吗？",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "我们提供有条件的退款保证。如果在约定时间内未能提供任何有效线索或进展，我们将根据服务条款提供部分退款。具体退款政策将在服务协议中详细说明。"
        }
      }
    ]
  };
  
  createSchemaScript(schema);
}

// 创建并添加结构化数据脚本
function createSchemaScript(schemaObject) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemaObject);
  document.head.appendChild(script);
}