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
        loadingScreen.style.display = 'none'; // Hide the loading screen after IP check
    })
    .catch((error) => {
        console.error('Error fetching IP address - defaulting to 404', error);
        redirectTo404();
        loadingScreen.style.display = 'none'; // Hide the loading screen on error
    });

// Array of strings for the page title
const stringsArray = [
    "M",
    "AM",
    "EAM",
    "REAM",
    "TREAM",
    "STREAM",
    "ESTREAM",
    "NESTREAM",
    "ONESTREAM",
    "HONESTREAM",
    "PHONESTREAM",
    " PHONESTREAM",
    "  PHONESTREAM",
    "* PHONESTREAM *",
    "   PHONESTREAM",
    "* PHONESTREAM *",
    "   PHONESTREAM",
    "* PHONESTREAM *",
    "   #HONESTREA#",
    "   ##ONESTRE##",
    "       ##NESTR##  ",
    "          ##EST##",
    "             ##S##",
    "                ###",
    "                   #",
    "  ",
    "  ",
    "  ",
    "                    S",
    "                  SE",
    "                SEL",
    "             SELE",
    "          SELEC",
    "       SELECT",
    "    SELECT " , 
    "  SELECT  A",
    "SELECT  A  ",
    "ELECT  A  D",
    "LECT  A  DE",
    "ECT  A  DEV",
    "CT  A  DEVI",
    "T  A  DEVIC",
    "  A  DEVICE",
    "A  DEVICE",
    "  DEVICE",
    "DEVICE",
    "EVICE",
    "VICE",
    "ICE",
    "CE",
    "E",
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
];

let currentIndex = 0;

// Function to set the page title to the current string in the array
function setPageTitle() {
    document.title = stringsArray[currentIndex];
    currentIndex = (currentIndex + 1) % stringsArray.length; // Increment and loop back to the start
}

// Function to update the page title every 50 milliseconds
function updatePageTitleLoop() {
    setPageTitle();
    setTimeout(updatePageTitleLoop, 250); // 50 milliseconds
}

// Start the loop
updatePageTitleLoop();
