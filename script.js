function createPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
  
    popup.style.position = 'fixed';
    popup.style.top = '10%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'var(--accent-color)';
    popup.style.padding = '15px';
    popup.style.borderRadius = '24px';
    popup.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.2)';
    popup.style.opacity = '1';
    popup.style.transition = 'opacity 0.75s ease-out';
    popup.style.transition = '.4s';
  
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 500);
    }, 3000);
  }
  
  const galleryImages = document.querySelectorAll('.gallery img');
  galleryImages.forEach((image) => {
    image.addEventListener('click', () => {
      const imageSrc = image.getAttribute('src');
      fetch(imageSrc)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'image';
          link.click();
          URL.revokeObjectURL(url);
          createPopup('Thank you for saving my picture! ❤️');
        });
    });
  });
  
  const schemeToggle = document.getElementById('mode');
  schemeToggle.onchange = (e) => {
    if (schemeToggle.checked === true) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      window.localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    }
  };
  
  const theme = window.localStorage.getItem('theme');
  if (theme == 'dark') {
    schemeToggle.checked = false;
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }
  
  if (theme == 'light') {
    schemeToggle.checked = true;
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }