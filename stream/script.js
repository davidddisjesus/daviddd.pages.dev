const allowedIP = '76.111.185.108';

function isAllowedIP(ip) {
  return ip === allowedIP;
}

function redirectTo(url) {
  window.location.href = url;
}

function redirectTo404() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'none'; // Hide the loading screen
  const iframe = document.createElement('iframe');
  iframe.src = 'https://quar.pages.dev/404.html';
  iframe.style.width = '100%';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.margin = '0';
  iframe.style.padding = '0';
  document.body.innerHTML = '';
  document.body.appendChild(iframe);
}

const currentYearElement = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

// Show loading screen while IP is being checked
const loadingScreen = document.createElement('div');
loadingScreen.setAttribute('class', 'loading');
loadingScreen.setAttribute('id', 'loading-screen');

const loadingContent = document.createElement('div');
loadingContent.setAttribute('class', 'loading-content');

const loadingImage = document.createElement('img');
loadingImage.src = './assets/load.png?v=1';

const loadingText = document.createElement('p');
loadingText.textContent = 'Loading...';
loadingText.classList.add('loading-text');

loadingContent.appendChild(loadingImage);
loadingContent.appendChild(loadingText);
loadingScreen.appendChild(loadingContent);
document.body.appendChild(loadingScreen);

fetch('https://api.ipify.org?format=json')
  .then((response) => response.json())
  .then((data) => {
    const clientIP = data.ip;
    if (!isAllowedIP(clientIP)) {
      redirectTo404();
    }
    loadingScreen.style.display = 'none'; // Hide the loading screen after IP check
  })
  .catch((error) => {
    console.error('Error fetching IP address - defaulting to 404', error);
    redirectTo404();
    loadingScreen.style.display = 'none'; // Hide the loading screen on error
  });

