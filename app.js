const apiKey = 'YOUR_API_key'; // Remplace par ta clé API OpenWeatherMap
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const iconUrl = 'https://openweathermap.org/img/wn/';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const unitToggle = document.getElementById('unit-toggle');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const forecastContainer = document.getElementById('forecast-container');

let isCelsius = true; // État des unités

// Chargement initial : mode sombre, géolocalisation ou dernière ville
window.addEventListener('load', () => {
    // Mode sombre
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        getWeather(lastCity);
    } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            (error) => {
                console.log('Géolocalisation refusée:', error);
            }
        );
    }

    // Enregistrer le service worker pour PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
});

// Recherche manuelle
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        localStorage.setItem('lastCity', city);
        getWeather(city);
    } else {
        showError('Veuillez entrer une ville.');
    }
});

// Toggle unités
unitToggle.addEventListener('click', () => {
    isCelsius = !isCelsius;
    unitToggle.textContent = isCelsius ? '°F' : '°C';
    const city = cityInput.value.trim() || localStorage.getItem('lastCity');
    if (city) {
        getWeather(city);
    }
});

// Toggle mode sombre
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
});

async function getWeather(city) {
    showLoading();
    try {
        const units = isCelsius ? 'metric' : 'imperial';
        const currentResponse = await fetch(`${baseUrl}weather?q=${city}&appid=${apiKey}&units=${units}&lang=fr`);
        if (!currentResponse.ok) throwError(currentResponse.status);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        const forecastResponse = await fetch(`${baseUrl}forecast?q=${city}&appid=${apiKey}&units=${units}&lang=fr`);
        if (!forecastResponse.ok) throwError(forecastResponse.status);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

        hideError();
    } catch (error) {
        showError(error.message);
        hideWeather();
    } finally {
        hideLoading();
    }
}

async function getWeatherByCoords(lat, lon) {
    showLoading();
    try {
        const units = isCelsius ? 'metric' : 'imperial';
        const currentResponse = await fetch(`${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=fr`);
        if (!currentResponse.ok) throwError(currentResponse.status);
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);

        const forecastResponse = await fetch(`${baseUrl}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=fr`);
        if (!forecastResponse.ok) throwError(forecastResponse.status);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        showError('Impossible de récupérer la météo par géolocalisation.');
    } finally {
        hideLoading();
    }
}

function throwError(status) {
    if (status === 401) throw new Error('Clé API invalide.');
    if (status === 404) throw new Error('Ville non trouvée.');
    throw new Error('Problème réseau.');
}

function displayCurrentWeather(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°${isCelsius ? 'C' : 'F'}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = Math.round(data.wind.speed * (isCelsius ? 3.6 : 2.237)); // km/h ou mph
    document.getElementById('pressure').textContent = data.main.pressure;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
    document.getElementById('weather-icon').src = `${iconUrl}${data.weather[0].icon}@2x.png`;
    currentWeather.classList.remove('hidden');
    currentWeather.classList.add('show');
}

function displayForecast(data) {
    forecastContainer.innerHTML = '';
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);
    dailyForecasts.forEach((day, index) => {
        const date = new Date(day.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const desc = day.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <p><strong>${date}</strong></p>
            <img src="${iconUrl}${icon}@2x.png" alt="${desc}">
            <p>${temp}°${isCelsius ? 'C' : 'F'}</p>
            <p>${desc}</p>
        `;
        forecastContainer.appendChild(forecastItem);
        setTimeout(() => forecastItem.classList.add('show'), index * 100); // Animation staggered
    });
    forecast.classList.remove('hidden');
    forecast.classList.add('show');
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function hideWeather() {
    currentWeather.classList.add('hidden');
    currentWeather.classList.remove('show');
    forecast.classList.add('hidden');
    forecast.classList.remove('show');
}
