document.addEventListener('DOMContentLoaded', () => {
  const links = {
    home: document.getElementById('home-link'),
    cv: document.getElementById('cv-link'),
    blog: document.getElementById('blog-link'),
    projects: document.getElementById('projects-link'),
    certificates: document.getElementById('certificates-link'),
    experience: document.getElementById('experience-link')
  };

  const sections = {
    home: document.getElementById('home-section'),
    cv: document.getElementById('cv-section'),
    blog: document.getElementById('blog-section'),
    projects: document.getElementById('projects-section'),
    certificates: document.getElementById('certificates-section'),
    experience: document.getElementById('experience-section')
  };

  function activateSection(link, section) {
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    section.classList.add('active');
    window.scrollTo(0, 0);
  }

  Object.keys(links).forEach(key => {
    links[key].addEventListener('click', (e) => {
      e.preventDefault();
      activateSection(links[key], sections[key]);
    });
  });

  // Quick links from home page
  document.getElementById('home-to-cv').addEventListener('click', (e) => { e.preventDefault(); activateSection(links.cv, sections.cv); });
  document.getElementById('home-to-blog').addEventListener('click', (e) => { e.preventDefault(); activateSection(links.blog, sections.blog); });
  document.getElementById('home-to-projects').addEventListener('click', (e) => { e.preventDefault(); activateSection(links.projects, sections.projects); });
  document.getElementById('home-to-certificates').addEventListener('click', (e) => { e.preventDefault(); activateSection(links.certificates, sections.certificates); });
  document.getElementById('home-to-experience').addEventListener('click', (e) => { e.preventDefault(); activateSection(links.experience, sections.experience); });

  // Project Demo and Source Buttons
  const projectNames = ['e-commerce-website', 'full-stack-app'];
  document.querySelectorAll('.demo-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      window.open(`https://sajidaitech.github.io/${projectNames[idx]}`, '_blank');
    });
  });
  document.querySelectorAll('.source-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      window.open(`https://github.com/sajidaitech/${projectNames[idx]}`, '_blank');
    });
  });

  // CV Image modal/lightbox functionality
  document.querySelectorAll('.cv-image img').forEach(img => {
    img.addEventListener('click', () => {
      // Create modal for image viewing if needed
      const modal = document.createElement('div');
      modal.classList.add('image-modal');
      
      const modalImg = document.createElement('img');
      modalImg.src = img.src;
      
      modal.appendChild(modalImg);
      document.body.appendChild(modal);
      
      // Add close functionality
      modal.addEventListener('click', () => {
        modal.remove();
      });
    });
  });

  // Google Drive Download tracking
  const googleDriveLink = document.getElementById('google-drive-download');
  if (googleDriveLink) {
    googleDriveLink.addEventListener('click', () => {
      console.log('CV downloaded from Google Drive');
      // You could add analytics tracking here
    });
  }
  
  // Logo change functionality
  const profileLogo = document.getElementById('profile-logo');
  const changeLogoBtn = document.getElementById('change-logo-btn');
  
  if (changeLogoBtn) {
    changeLogoBtn.addEventListener('click', () => {
      // Create a file input element
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
            profileLogo.src = event.target.result;
            
            // Save to localStorage to persist the change
            localStorage.setItem('customLogo', event.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
      
      fileInput.click();
    });
  }
  
  // Load saved logo if exists
  const savedLogo = localStorage.getItem('customLogo');
  if (savedLogo && profileLogo) {
    profileLogo.src = savedLogo;
  }
  
  // Experience certificate view buttons
  document.querySelectorAll('.view-certificate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      const modal = document.createElement('div');
      modal.classList.add('image-modal');
      
      const closeBtn = document.createElement('span');
      closeBtn.classList.add('close-btn');
      closeBtn.innerHTML = '&times;';
      
      const modalImg = document.createElement('img');
      modalImg.src = imgSrc;
      
      modal.appendChild(closeBtn);
      modal.appendChild(modalImg);
      document.body.appendChild(modal);
      
      // Add close functionality
      closeBtn.addEventListener('click', () => {
        modal.remove();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });

  activateSection(links.home, sections.home);
});
// Mobile Navigation Script to be added to script.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle functionality
  function setupMobileNav() {
    // Create the mobile menu toggle button
    const navContainer = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    // Add necessary classes
    navUl.classList.add('expanded');
    
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰ Menu';
    
    // Insert before the nav
    navContainer.parentNode.insertBefore(mobileMenuToggle, navContainer);
    
    // Add click event
    mobileMenuToggle.addEventListener('click', () => {
      if (navUl.classList.contains('collapsed')) {
        navUl.classList.remove('collapsed');
        navUl.classList.add('expanded');
        mobileMenuToggle.innerHTML = '✕ Close';
      } else {
        navUl.classList.add('collapsed');
        navUl.classList.remove('expanded');
        mobileMenuToggle.innerHTML = '☰ Menu';
      }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
          navUl.classList.add('collapsed');
          navUl.classList.remove('expanded');
          mobileMenuToggle.innerHTML = '☰ Menu';
        }
      });
    });
    
    // Check screen size on load and resize
    function checkScreenSize() {
      if (window.innerWidth <= 767) {
        navUl.classList.add('collapsed');
        mobileMenuToggle.style.display = 'block';
      } else {
        navUl.classList.remove('collapsed');
        navUl.classList.add('expanded');
        mobileMenuToggle.style.display = 'none';
      }
    }
    
    // Run on load
    checkScreenSize();
    
    // Set up resize listener
    window.addEventListener('resize', checkScreenSize);
  }
  
  // Initialize mobile navigation
  setupMobileNav();
  
  // Add responsive image handling
  function setupResponsiveImages() {
    // Make certificate and experience images responsive
    const certificateImages = document.querySelectorAll('.certificate-image img, .experience-certificate img');
    
    certificateImages.forEach(img => {
      img.addEventListener('click', () => {
        if (window.innerWidth <= 767) {
          // Create lightweight mobile-optimized modal
          const modal = document.createElement('div');
          modal.classList.add('image-modal');
          
          const closeBtn = document.createElement('span');
          closeBtn.classList.add('close-btn');
          closeBtn.innerHTML = '&times;';
          
          const modalImg = document.createElement('img');
          modalImg.src = img.src;
          
          modal.appendChild(closeBtn);
          modal.appendChild(modalImg);
          document.body.appendChild(modal);
          
          // Prevent body scrolling when modal is open
          document.body.style.overflow = 'hidden';
          
          // Close functionality
          function closeModal() {
            modal.remove();
            document.body.style.overflow = '';
          }
          
          closeBtn.addEventListener('click', closeModal);
          modal.addEventListener('click', (e) => {
            if (e.target === modal) {
              closeModal();
            }
          });
        }
      });
    });
  }
  
  // Initialize responsive images
  setupResponsiveImages();
});
// Update the project links functionality
document.addEventListener('DOMContentLoaded', () => {
  // Original navigation functionality (preserved from original script.js)
  const links = {
    home: document.getElementById('home-link'),
    cv: document.getElementById('cv-link'),
    blog: document.getElementById('blog-link'),
    projects: document.getElementById('projects-link'),
    certificates: document.getElementById('certificates-link'),
    experience: document.getElementById('experience-link')
  };

  const sections = {
    home: document.getElementById('home-section'),
    cv: document.getElementById('cv-section'),
    blog: document.getElementById('blog-section'),
    projects: document.getElementById('projects-section'),
    certificates: document.getElementById('certificates-section'),
    experience: document.getElementById('experience-section')
  };

  function activateSection(link, section) {
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    section.classList.add('active');
    window.scrollTo(0, 0);
  }

  Object.keys(links).forEach(key => {
    if (links[key]) {
      links[key].addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(links[key], sections[key]);
      });
    }
  });

  // Quick links from home page
  const quickLinks = {
    'home-to-cv': { link: links.cv, section: sections.cv },
    'home-to-blog': { link: links.blog, section: sections.blog },
    'home-to-projects': { link: links.projects, section: sections.projects },
    'home-to-certificates': { link: links.certificates, section: sections.certificates },
    'home-to-experience': { link: links.experience, section: sections.experience }
  };

  Object.keys(quickLinks).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        activateSection(quickLinks[id].link, quickLinks[id].section);
      });
    }
  });

  // Project link tracking functionality
  function trackExternalLink(url, type, name) {
    console.log(`User clicked ${type} link for ${name}`);
    // You could add analytics tracking here if you implement it in the future
    window.open(url, '_blank');
  }

  // Update project link handling
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!btn.getAttribute('href')) {
        e.preventDefault();
        const projectName = btn.closest('.project-card').querySelector('h3').textContent;
        trackExternalLink('https://sajidaitech.github.io/Year1Project/', 'demo', projectName);
      }
    });
  });

  document.querySelectorAll('.source-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!btn.getAttribute('href')) {
        e.preventDefault();
        const projectName = btn.closest('.project-card').querySelector('h3').textContent;
        trackExternalLink('https://github.com/sajidaitech/Year1Project', 'source', projectName);
      }
    });
  });

  // Blog post read more links
  document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
      const postTitle = link.closest('.blog-post').querySelector('h3').textContent;
      console.log(`User clicked to read more about "${postTitle}"`);
      // You could add analytics tracking here
    });
  });

  // Initialize with home section active
  activateSection(links.home, sections.home);
});
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('nav ul li a');
  
  // Get all sections
  const sections = document.querySelectorAll('.section');
  
  // Function to show active section and update navigation
  function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
    
    // Update active navigation link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + sectionId) {
        link.classList.add('active');
      }
    });
  }
  
  // Add click event listeners to navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1); // Remove the # character
      showSection(targetId);
      
      // Update URL without page reload (optional)
      history.pushState(null, null, '#' + targetId);
    });
  });
  
  // Handle direct URL access with hash
  if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);
    showSection(sectionId);
  } else {
    // Default to home section if no hash in URL
    showSection('home-section');
  }
  
  // View certificate in full size
  const viewButtons = document.querySelectorAll('.view-certificate-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const imgSrc = this.getAttribute('data-img');
      // Create modal for viewing image
      const modal = document.createElement('div');
      modal.className = 'certificate-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <img src="${imgSrc}" alt="Certificate">
        </div>
      `;
      document.body.appendChild(modal);
      
      // Close modal when clicking the X
      modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
      });
      
      // Close modal when clicking outside the image
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    });
  });
  
  // Logo change button functionality (if used in your site)
  const changeLogoBtn = document.getElementById('change-logo-btn');
  if (changeLogoBtn) {
    changeLogoBtn.addEventListener('click', function() {
      // Your logo change functionality here
    });
  }
});
