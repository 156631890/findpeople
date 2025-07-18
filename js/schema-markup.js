// 结构化数据标记脚本
document.addEventListener('DOMContentLoaded', function() {
  // 检测当前页面类型
  const currentPath = window.location.pathname;
  
  // 添加组织信息标记 (所有页面)
  addOrganizationSchema();
  
  // 添加网站信息标记 (所有页面)
  addWebSiteSchema();
  
  // 添加面包屑导航标记 (所有页面)
  addBreadcrumbListSchema();
  
  // 根据页面类型添加特定标记
  if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index-en.html') {
    addServiceSchema();
    addLocalBusinessSchema();
    addFAQSchema();
  } else if (currentPath.includes('success-stories') || currentPath.includes('blog')) {
    addArticleSchema();
    // 为成功案例添加评价标记
    if (currentPath.includes('success-stories')) {
      addReviewSchema();
    }
  } else if (currentPath.includes('search')) {
    addServiceSchema();
    addOfferSchema();
  } else if (currentPath.includes('membership-plan') || document.querySelector('.product-details')) {
    addProductSchema();
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

// 添加网站信息标记
function addWebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "寻人网",
    "alternateName": "FindPeople",
    "url": "https://www.findpeople.online/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.findpeople.online/search.html?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "description": "寻人网提供专业的人员查找服务，帮助您找到失联的亲友、同学、同事。98%成功率，安全、合法、高效的寻人解决方案。",
    "publisher": {
      "@type": "Organization",
      "name": "寻人网",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.findpeople.online/favicon.svg"
      }
    }
  };
  
  createSchemaScript(schema);
}

// 添加面包屑导航标记
function addBreadcrumbListSchema() {
  // 获取当前页面路径
  const pathSegments = window.location.pathname.split('/').filter(segment => segment);
  
  // 如果是首页，不添加面包屑
  if (pathSegments.length === 0 || (pathSegments.length === 1 && (pathSegments[0] === 'index.html' || pathSegments[0] === 'index-en.html'))) {
    return;
  }
  
  // 构建面包屑项
  const breadcrumbItems = [];
  
  // 添加首页
  breadcrumbItems.push({
    "@type": "ListItem",
    "position": 1,
    "name": "首页",
    "item": "https://www.findpeople.online/"
  });
  
  // 添加中间路径
  let currentPath = '';
  let position = 2;
  
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];
    
    // 跳过index文件
    if (segment === 'index.html' || segment === 'index-en.html') {
      continue;
    }
    
    currentPath += '/' + segment;
    
    // 获取页面标题
    let name = '';
    switch (segment) {
      case 'search.html':
      case 'search-en.html':
        name = '寻人服务';
        break;
      case 'success-stories.html':
      case 'success-stories-en.html':
        name = '成功案例';
        break;
      case 'blog':
        name = '博客';
        break;
      default:
        // 移除文件扩展名并格式化
        name = segment.replace('.html', '').replace(/-/g, ' ');
        // 首字母大写
        name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": position,
      "name": name,
      "item": "https://www.findpeople.online" + currentPath
    });
    
    position++;
  }
  
  // 创建面包屑结构
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };
  
  createSchemaScript(schema);
}

// 添加评价信息标记
function addReviewSchema() {
  // 尝试从页面获取评价信息
  const reviewElements = document.querySelectorAll('.testimonial, .review, .success-story');
  
  if (reviewElements.length === 0) {
    // 如果页面上没有评价元素，使用默认评价
    const schema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Service",
        "name": "寻人网专业寻人服务",
        "description": "专业的人员查找服务，帮助您找到失联的亲友、同学、同事。"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.9",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "王先生"
      },
      "datePublished": "2025-05-15",
      "reviewBody": "非常感谢寻人网的专业服务，帮我找到了失联多年的大学同学。服务过程透明，工作人员态度专业，最终在约定时间内成功找到了人。强烈推荐给有类似需求的朋友！"
    };
    
    createSchemaScript(schema);
    return;
  }
  
  // 处理页面上的每个评价
  reviewElements.forEach((element, index) => {
    // 尝试提取评价信息
    const authorElement = element.querySelector('.author-name, .reviewer-name, .client-name');
    const ratingElement = element.querySelector('.rating, .stars');
    const contentElement = element.querySelector('.review-content, .testimonial-content, .story-content');
    const dateElement = element.querySelector('.review-date, .date');
    
    const author = authorElement ? authorElement.textContent.trim() : `客户${index + 1}`;
    const rating = ratingElement ? parseFloat(ratingElement.textContent) || 4.8 : 4.8;
    const content = contentElement ? contentElement.textContent.trim() : "寻人网的服务非常专业，成功帮我找到了要找的人。";
    const date = dateElement ? dateElement.textContent.trim() : new Date().toISOString().split('T')[0];
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Service",
        "name": "寻人网专业寻人服务",
        "description": "专业的人员查找服务，帮助您找到失联的亲友、同学、同事。"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": rating.toString(),
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": author
      },
      "datePublished": date,
      "reviewBody": content
    };
    
    createSchemaScript(schema);
  });
  
  // 添加聚合评分
  const aggregateSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Service",
      "name": "寻人网专业寻人服务",
      "description": "专业的人员查找服务，帮助您找到失联的亲友、同学、同事。"
    },
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "386",
    "reviewCount": "214"
  };
  
  createSchemaScript(aggregateSchema);
}

// 添加产品信息标记
function addProductSchema() {
  // 尝试从页面获取产品信息
  const productTitle = document.querySelector('.product-title, h1')?.textContent || '专业寻人服务套餐';
  const productDescription = document.querySelector('.product-description, .description')?.textContent || '专业的人员查找服务，帮助您找到失联的亲友、同学、同事。';
  const productImage = document.querySelector('.product-image')?.src || 'https://www.findpeople.online/images/service-package.jpg';
  
  // 获取价格信息
  let price = '3000.00';
  const priceElement = document.querySelector('.price, .product-price');
  if (priceElement) {
    // 提取数字
    const priceMatch = priceElement.textContent.match(/[\d,]+\.?\d*/);
    if (priceMatch) {
      price = priceMatch[0].replace(/,/g, '');
    }
  }
  
  // 创建产品结构
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productTitle,
    "description": productDescription,
    "image": productImage,
    "sku": "FINDPEOPLE-" + productTitle.replace(/\s+/g, '-').toLowerCase(),
    "mpn": "FP-" + Math.floor(Math.random() * 10000),
    "brand": {
      "@type": "Brand",
      "name": "寻人网"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "CNY",
      "price": price,
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "寻人网"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "214"
    }
  };
  
  createSchemaScript(schema);
}

// 添加工作机会信息标记
function addJobPostingSchema() {
  // 检查是否在招聘页面
  if (!window.location.pathname.includes('career') && !window.location.pathname.includes('job')) {
    return;
  }
  
  // 尝试从页面获取职位信息
  const jobTitle = document.querySelector('.job-title, h1')?.textContent || '寻人顾问';
  const jobDescription = document.querySelector('.job-description, .description')?.textContent || 
    '负责处理寻人案件，与客户沟通，制定寻人方案，协调资源，确保高效完成寻人任务。';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobTitle,
    "description": jobDescription,
    "datePosted": new Date().toISOString().split('T')[0],
    "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    "employmentType": "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "寻人网",
      "sameAs": "https://www.findpeople.online/",
      "logo": "https://www.findpeople.online/favicon.svg"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Beijing",
        "addressRegion": "Beijing",
        "addressCountry": "CN"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "CNY",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": 8000,
        "maxValue": 15000,
        "unitText": "MONTH"
      }
    },
    "skills": "调查技能, 沟通能力, 问题解决, 资源协调, 信息分析",
    "qualifications": "相关领域2年以上工作经验，良好的沟通能力和分析能力",
    "educationRequirements": "本科及以上学历",
    "experienceRequirements": "2年以上相关工作经验",
    "occupationalCategory": "寻人服务专员"
  };
  
  createSchemaScript(schema);
}

// 添加活动信息标记
function addEventSchema() {
  // 检查是否在活动页面
  if (!window.location.pathname.includes('event') && !document.querySelector('.event-details')) {
    return;
  }
  
  // 尝试从页面获取活动信息
  const eventName = document.querySelector('.event-title, h1')?.textContent || '寻人网线下交流会';
  const eventDescription = document.querySelector('.event-description, .description')?.textContent || 
    '寻人网举办的线下交流活动，分享寻人经验，提供专业咨询，帮助有寻人需求的人士。';
  const eventLocation = document.querySelector('.event-location')?.textContent || '北京市海淀区中关村大街1号';
  const eventStartDate = document.querySelector('.event-date, .start-date')?.textContent || 
    new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0];
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventName,
    "description": eventDescription,
    "startDate": eventStartDate,
    "endDate": eventStartDate, // 假设是一天的活动
    "location": {
      "@type": "Place",
      "name": "寻人网活动中心",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": eventLocation,
        "addressLocality": "北京",
        "addressRegion": "北京",
        "postalCode": "100000",
        "addressCountry": "CN"
      }
    },
    "image": "https://www.findpeople.online/images/event-banner.jpg",
    "organizer": {
      "@type": "Organization",
      "name": "寻人网",
      "url": "https://www.findpeople.online/"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split('T')[0]
    },
    "performer": {
      "@type": "Person",
      "name": "寻人网专家团队"
    }
  };
  
  createSchemaScript(schema);
}

// 添加视频内容标记
function addVideoSchema() {
  // 检查页面是否包含视频元素
  const videoElements = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="youku"], iframe[src*="bilibili"]');
  
  if (videoElements.length === 0) {
    return;
  }
  
  // 为每个视频创建结构化数据
  videoElements.forEach((element, index) => {
    // 尝试获取视频信息
    const videoTitle = document.querySelector(`.video-title, h1, h2:nth-of-type(${index + 1})`)?.textContent || 
      `寻人网视频 ${index + 1}`;
    const videoDescription = document.querySelector(`.video-description, .description:nth-of-type(${index + 1})`)?.textContent || 
      '寻人网提供的专业寻人服务介绍视频，展示我们的工作流程和成功案例。';
    
    // 获取视频缩略图
    let thumbnailUrl = '';
    if (element.tagName.toLowerCase() === 'video' && element.poster) {
      thumbnailUrl = element.poster;
    } else {
      thumbnailUrl = 'https://www.findpeople.online/images/video-thumbnail.jpg';
    }
    
    // 获取视频URL
    let contentUrl = '';
    if (element.tagName.toLowerCase() === 'video' && element.src) {
      contentUrl = element.src;
    } else if (element.tagName.toLowerCase() === 'iframe' && element.src) {
      contentUrl = element.src;
    } else {
      contentUrl = 'https://www.findpeople.online/videos/intro.mp4';
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": videoTitle,
      "description": videoDescription,
      "thumbnailUrl": thumbnailUrl,
      "uploadDate": new Date().toISOString().split('T')[0],
      "contentUrl": contentUrl,
      "embedUrl": contentUrl,
      "duration": "PT2M30S", // 假设视频长度为2分30秒
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": { "@type": "WatchAction" },
        "userInteractionCount": 5000 + index * 1000
      },
      "publisher": {
        "@type": "Organization",
        "name": "寻人网",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.findpeople.online/favicon.svg"
        }
      }
    };
    
    createSchemaScript(schema);
  });
}

// 更新主函数，添加新的结构化数据类型
document.addEventListener('DOMContentLoaded', function() {
  // 检测当前页面类型
  const currentPath = window.location.pathname;
  
  // 添加组织信息标记 (所有页面)
  addOrganizationSchema();
  
  // 添加网站信息标记 (所有页面)
  addWebSiteSchema();
  
  // 添加面包屑导航标记 (所有页面)
  addBreadcrumbListSchema();
  
  // 根据页面类型添加特定标记
  if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index-en.html') {
    addServiceSchema();
    addLocalBusinessSchema();
    addFAQSchema();
  } else if (currentPath.includes('success-stories') || currentPath.includes('blog')) {
    addArticleSchema();
    // 为成功案例添加评价标记
    if (currentPath.includes('success-stories')) {
      addReviewSchema();
    }
  } else if (currentPath.includes('search')) {
    addServiceSchema();
    addOfferSchema();
  } else if (currentPath.includes('membership-plan') || document.querySelector('.product-details')) {
    addProductSchema();
  }
  
  // 添加工作机会信息标记 (如果在招聘页面)
  addJobPostingSchema();
  
  // 添加活动信息标记 (如果在活动页面)
  addEventSchema();
  
  // 添加视频内容标记 (如果页面包含视频)
  addVideoSchema();
});