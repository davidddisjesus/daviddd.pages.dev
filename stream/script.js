// Version //
const version = '0.1.1';
// Version //

const allowedIP = '76.111.185.108';

function isAllowedIP(ip) {
    return ip === allowedIP;
}

function showDialog() {
  dialogContainer.style.display = 'block';
}

function hideDialog() {
  dialogContainer.classList.add('fade-out');
  setTimeout(() => {
    dialogContainer.style.display = 'none';
    dialogContainer.classList.remove('fade-out');
  }, 300);
}

closeButton.addEventListener('click', hideDialog);

aboutButton.addEventListener('click', showDialog);

document.getElementById('version').textContent = version;

function redirectTo404() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
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
loadingImage.src = './assets/load.png';

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
        loadingScreen.style.display = 'none';
    })
    .catch((error) => {
        console.error('Error fetching IP address - defaulting to 404', error);
        redirectTo404();
        loadingScreen.style.display = 'none';
    });
    
function launchFullScreen(element) {
        if(element.requestFullScreen) {
            element.requestFullScreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }
    
function redirectTo(url) {
    const phoneName = event.target.textContent;
    const iframe = document.createElement('iframe');

    iframe.src = url;
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.className = 'frame';

    document.body.innerHTML = '';
    document.body.appendChild(iframe);
    
    launchFullScreen(iframe);
    document.title = `${phoneName} | PhoneStream`;
}