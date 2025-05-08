// Combine all JS modules
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initTypingEffect();
  initCursorEffect();
  initParallaxEffect();
  initFilterProjects();
  initContactForm();
  initSkillsAnimation();
});

// Custom cursor effect
function initCursorEffect() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (!cursor || !cursorFollower) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.opacity = '1';
    
    setTimeout(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
      cursorFollower.style.opacity = '1';
    }, 100);
  });
  
  document.addEventListener('mouseout', () => {
    cursor.style.opacity = '0';
    cursorFollower.style.opacity = '0';
  });
  
  // Add hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-badge');
  
  interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'var(--accent-secondary)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });
    
    elem.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'var(--accent-primary)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

// Navigation functionality
function initNavigation() {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const header = document.querySelector('header');
  
  // Mobile menu toggle
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Close menu when clicking a nav link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burger.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  // Highlight active section in navigation
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
    
    // Header background on scroll
    if (window.scrollY > 100) {
      header.style.backgroundColor = 'rgba(10, 10, 20, 0.95)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(10, 10, 20, 0.8)';
      header.style.boxShadow = 'none';
    }
  });
}

// Typing effect
function initTypingEffect() {
  const typingElement = document.getElementById('typing');
  if (!typingElement) return;
  
  const phrases = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Coder'];
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = '';
  let isDeleting = false;
  let typeSpeed = 100;
  
  function type() {
    // Calculate typing speed
    const normalSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 1000;
    
    if (isDeleting) {
      typeSpeed = deletingSpeed;
    } else {
      typeSpeed = normalSpeed;
    }
    
    // Current phrase
    currentPhrase = phrases[phraseIndex];
    
    // Update text
    if (!isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
    } else {
      typingElement.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
    }
    
    // Move to next phrase or start deleting
    if (!isDeleting && letterIndex === currentPhrase.length) {
      // Pause at end of phrase
      isDeleting = true;
      typeSpeed = pauseTime;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start typing effect
  type();
}

// Parallax effect
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Parallax effect for hero section
    if (hero) {
      const heroHeight = hero.clientHeight;
      const scrollPercentage = scrollY / heroHeight;
      
      if (scrollY <= heroHeight) {
        hero.style.backgroundPosition = `50% ${50 + scrollPercentage * 20}%`;
      }
    }
    
    // Reveal sections on scroll
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const windowHeight = window.innerHeight;
      
      if (scrollY > sectionTop - windowHeight + 200 && scrollY < sectionTop + sectionHeight) {
        section.classList.add('in-view');
        
        // Animate skill bars when skills section is in view
        if (section.id === 'skills') {
          const skillBars = section.querySelectorAll('.skill-progress');
          
          skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      }
    });
  });
}

// Project filtering
function initFilterProjects() {
  const filterBtns = document.querySelector('.filter-tabs')?.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filterBtns || !projectCards.length) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Contact form validation
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // For demo purposes - replace with actual form submission
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
  
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}

// Skills animation
function initSkillsAnimation() {
  const skillElements = document.querySelectorAll('.skill-progress');
  
  skillElements.forEach(skill => {
    const percentage = skill.parentElement.previousElementSibling.lastElementChild.textContent;
    skill.style.width = percentage;
  });
  
  // Animate when scrolled into view
  const skillsSection = document.getElementById('skills');
  
  if (!skillsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillElements.forEach(skill => {
          const width = skill.style.width;
          skill.style.width = '0';
          
          setTimeout(() => {
            skill.style.width = width;
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(skillsSection);
}