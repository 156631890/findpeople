// 客户评价和成功案例轮播
class TestimonialsCarousel {
  constructor(options = {}) {
    this.options = {
      containerId: 'testimonials-carousel',
      autoplay: true,
      interval: 5000,
      animationSpeed: 500,
      ...options
    };
    
    this.currentSlide = 0;
    this.isAnimating = false;
    this.autoplayTimer = null;
    this.testimonials = [];
    
    this.init();
  }

  init() {
    // 获取容器
    this.container = document.getElementById(this.options.containerId);
    if (!this.container) {
      console.error(`Testimonials container #${this.options.containerId} not found`);
      return;
    }
    
    // 加载评价数据
    this.loadTestimonials();
    
    // 创建轮播结构
    this.createCarouselStructure();
    
    // 设置事件监听
    this.setupEventListeners();
    
    // 开始自动播放
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  loadTestimonials() {
    // 这里可以从API加载数据，现在使用静态数据
    this.testimonials = [
      {
        id: 1,
        name: '张女士',
        location: '北京',
        avatar: '/images/testimonials/avatar1.jpg',
        rating: 5,
        text: '感谢寻人网帮我找到了失联多年的女儿。专业团队、高效服务，让我们一家人终于团聚。这种幸福的感觉无法用言语表达，真心感谢！',
        date: '2024-12-15',
        caseType: '亲人寻找'
      },
      {
        id: 2,
        name: '王先生',
        location: '上海',
        avatar: '/images/testimonials/avatar2.jpg',
        rating: 5,
        text: '通过寻人网成功组织了20年同学聚会，找到了所有失联的同学。服务非常专业，效率很高，价格也合理。强烈推荐！',
        date: '2024-11-20',
        caseType: '同学寻找'
      },
      {
        id: 3,
        name: '李先生',
        location: '广州',
        avatar: '/images/testimonials/avatar3.jpg',
        rating: 4,
        text: '帮我找到了10年前的恩人，终于有机会当面表达感谢。虽然过程比预期长了一些，但结果非常满意。服务态度很好，会持续跟进。',
        date: '2024-10-05',
        caseType: '恩人寻找'
      },
      {
        id: 4,
        name: '陈女士',
        location: '成都',
        avatar: '/images/testimonials/avatar4.jpg',
        rating: 5,
        text: '寻人网的专业程度超出预期，不到一周就帮我找到了失联的父亲。整个过程透明，随时了解进展。这是我做过最正确的决定！',
        date: '2024-09-18',
        caseType: '亲人寻找'
      },
      {
        id: 5,
        name: '赵总',
        location: '深圳',
        avatar: '/images/testimonials/avatar5.jpg',
        rating: 5,
        text: '作为企业负责人，我们通过寻人网找到了重要客户的新联系方式，成功挽回了一个大项目。服务专业高效，值得信赖的商务伙伴。',
        date: '2024-08-22',
        caseType: '商务寻人'
      }
    ];
  }

  createCarouselStructure() {
    // 清空容器
    this.container.innerHTML = '';
    
    // 创建轮播外层
    this.carousel = document.createElement('div');
    this.carousel.className = 'testimonials-carousel';
    
    // 创建轮播轨道
    this.track = document.createElement('div');
    this.track.className = 'carousel-track';
    
    // 创建轮播项
    this.testimonials.forEach((testimonial, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.dataset.index = index;
      
      // 创建评价内容
      slide.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-header">
            <div class="testimonial-avatar">
              <img src="${testimonial.avatar}" alt="${testimonial.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22><circle cx=%2230%22 cy=%2230%22 r=%2230%22 fill=%22%23e5e7eb%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23374151%22 font-size=%2224%22>${testimonial.name.charAt(0)}</text></svg>';">
            </div>
            <div class="testimonial-info">
              <h4 class="testimonial-name">${testimonial.name}</h4>
              <div class="testimonial-meta">
                <span class="testimonial-location">${testimonial.location}</span>
                <span class="testimonial-type">${testimonial.caseType}</span>
              </div>
              <div class="testimonial-rating">
                ${this.generateRatingStars(testimonial.rating)}
              </div>
            </div>
          </div>
          <div class="testimonial-body">
            <p class="testimonial-text">${testimonial.text}</p>
          </div>
          <div class="testimonial-footer">
            <span class="testimonial-date">${this.formatDate(testimonial.date)}</span>
          </div>
        </div>
      `;
      
      this.track.appendChild(slide);
    });
    
    // 创建导航按钮
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-nav carousel-prev';
    prevButton.innerHTML = '&lsaquo;';
    prevButton.setAttribute('aria-label', '上一个评价');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-nav carousel-next';
    nextButton.innerHTML = '&rsaquo;';
    nextButton.setAttribute('aria-label', '下一个评价');
    
    // 创建指示器
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    
    this.testimonials.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = 'carousel-indicator';
      indicator.dataset.index = index;
      if (index === 0) {
        indicator.classList.add('active');
      }
      indicators.appendChild(indicator);
    });
    
    // 组装轮播
    this.carousel.appendChild(this.track);
    this.carousel.appendChild(prevButton);
    this.carousel.appendChild(nextButton);
    this.carousel.appendChild(indicators);
    
    // 添加到容器
    this.container.appendChild(this.carousel);
    
    // 设置初始位置
    this.updateCarouselPosition();
  }

  setupEventListeners() {
    // 上一个按钮
    const prevButton = this.carousel.querySelector('.carousel-prev');
    prevButton.addEventListener('click', () => {
      this.goToSlide(this.currentSlide - 1);
    });
    
    // 下一个按钮
    const nextButton = this.carousel.querySelector('.carousel-next');
    nextButton.addEventListener('click', () => {
      this.goToSlide(this.currentSlide + 1);
    });
    
    // 指示器点击
    const indicators = this.carousel.querySelectorAll('.carousel-indicator');
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const index = parseInt(indicator.dataset.index);
        this.goToSlide(index);
      });
    });
    
    // 鼠标悬停暂停自动播放
    this.carousel.addEventListener('mouseenter', () => {
      if (this.options.autoplay) {
        this.stopAutoplay();
      }
    });
    
    this.carousel.addEventListener('mouseleave', () => {
      if (this.options.autoplay) {
        this.startAutoplay();
      }
    });
    
    // 触摸事件支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      
      if (this.options.autoplay) {
        this.stopAutoplay();
      }
    }, { passive: true });
    
    this.carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      
      // 计算滑动方向
      const diff = touchStartX - touchEndX;
      
      if (diff > 50) {
        // 向左滑动，显示下一个
        this.goToSlide(this.currentSlide + 1);
      } else if (diff < -50) {
        // 向右滑动，显示上一个
        this.goToSlide(this.currentSlide - 1);
      }
      
      if (this.options.autoplay) {
        this.startAutoplay();
      }
    }, { passive: true });
    
    // 可访问性支持 - 键盘导航
    this.carousel.setAttribute('tabindex', '0');
    this.carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.goToSlide(this.currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        this.goToSlide(this.currentSlide + 1);
      }
    });
  }

  goToSlide(index) {
    if (this.isAnimating) return;
    
    // 处理循环
    const slideCount = this.testimonials.length;
    if (index < 0) {
      index = slideCount - 1;
    } else if (index >= slideCount) {
      index = 0;
    }
    
    if (index === this.currentSlide) return;
    
    this.isAnimating = true;
    
    // 更新当前索引
    this.currentSlide = index;
    
    // 更新轮播位置
    this.updateCarouselPosition();
    
    // 更新指示器
    const indicators = this.carousel.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // 动画结束后重置状态
    setTimeout(() => {
      this.isAnimating = false;
    }, this.options.animationSpeed);
  }

  updateCarouselPosition() {
    const slideWidth = 100; // 百分比
    const offset = -this.currentSlide * slideWidth;
    this.track.style.transform = `translateX(${offset}%)`;
    this.track.style.transition = `transform ${this.options.animationSpeed}ms ease`;
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      this.goToSlide(this.currentSlide + 1);
    }, this.options.interval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<span class="star filled">★</span>';
      } else {
        stars += '<span class="star">☆</span>';
      }
    }
    return stars;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // 添加新评价
  addTestimonial(testimonial) {
    this.testimonials.push(testimonial);
    
    // 重新创建轮播
    this.createCarouselStructure();
    this.setupEventListeners();
    
    // 如果自动播放已启用，重新开始
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }
}

// 添加样式
function addTestimonialStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .testimonials-carousel {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding: 20px 0;
    }
    
    .carousel-track {
      display: flex;
      transition: transform 0.5s ease;
      width: 100%;
    }
    
    .carousel-slide {
      min-width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
    }
    
    .testimonial-card {
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      padding: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .testimonial-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    
    .testimonial-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
      flex-shrink: 0;
    }
    
    .testimonial-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .testimonial-info {
      flex: 1;
    }
    
    .testimonial-name {
      margin: 0 0 5px;
      font-size: 18px;
      color: #1f2937;
    }
    
    .testimonial-meta {
      display: flex;
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 5px;
    }
    
    .testimonial-location {
      margin-right: 10px;
    }
    
    .testimonial-location:after {
      content: '•';
      margin-left: 10px;
    }
    
    .testimonial-rating {
      font-size: 18px;
      color: #6b7280;
    }
    
    .star.filled {
      color: #f59e0b;
    }
    
    .testimonial-body {
      flex: 1;
    }
    
    .testimonial-text {
      font-size: 16px;
      line-height: 1.6;
      color: #374151;
      margin: 0;
    }
    
    .testimonial-footer {
      margin-top: 15px;
      text-align: right;
    }
    
    .testimonial-date {
      font-size: 14px;
      color: #9ca3af;
    }
    
    .carousel-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      background: #ffffff;
      border: none;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      font-size: 24px;
      line-height: 1;
      color: #4b5563;
      cursor: pointer;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .carousel-nav:hover {
      background: #f3f4f6;
      color: #1f2937;
    }
    
    .carousel-prev {
      left: 10px;
    }
    
    .carousel-next {
      right: 10px;
    }
    
    .carousel-indicators {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 10px 0;
    }
    
    .carousel-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #d1d5db;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .carousel-indicator.active {
      background: #3b82f6;
      transform: scale(1.2);
    }
    
    @media (max-width: 768px) {
      .carousel-nav {
        width: 30px;
        height: 30px;
        font-size: 18px;
      }
      
      .testimonial-avatar {
        width: 50px;
        height: 50px;
      }
      
      .testimonial-name {
        font-size: 16px;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  addTestimonialStyles();
  
  // 检查页面上是否有轮播容器
  if (document.getElementById('testimonials-carousel')) {
    window.testimonialsCarousel = new TestimonialsCarousel({
      containerId: 'testimonials-carousel',
      autoplay: true,
      interval: 6000
    });
  }
});

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestimonialsCarousel;
} else {
  window.TestimonialsCarousel = TestimonialsCarousel;
}