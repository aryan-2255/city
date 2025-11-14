// API Configuration
const API_CONFIG = {
    // OpenWeatherMap API - Free tier (users should register at https://openweathermap.org/api)
    WEATHER_API_KEY: 'YOUR_API_KEY_HERE', // Replace with your API key
    WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
    
    // OpenAQ API - Free and open, no key required
    AIR_QUALITY_BASE_URL: 'https://api.openaq.org/v2'
};

// City Coordinates (Expanded)
const CITY_COORDS = {
    london: { lat: 51.5074, lon: -0.1278, name: 'London' },
    newyork: { lat: 40.7128, lon: -74.0060, name: 'New York' },
    tokyo: { lat: 35.6762, lon: 139.6503, name: 'Tokyo' },
    paris: { lat: 48.8566, lon: 2.3522, name: 'Paris' },
    delhi: { lat: 28.6139, lon: 77.2090, name: 'Delhi' },
    sydney: { lat: -33.8688, lon: 151.2093, name: 'Sydney' },
    mumbai: { lat: 19.0760, lon: 72.8777, name: 'Mumbai' },
    singapore: { lat: 1.3521, lon: 103.8198, name: 'Singapore' },
    dubai: { lat: 25.2048, lon: 55.2708, name: 'Dubai' },
    losangeles: { lat: 34.0522, lon: -118.2437, name: 'Los Angeles' },
    chicago: { lat: 41.8781, lon: -87.6298, name: 'Chicago' },
    toronto: { lat: 43.6532, lon: -79.3832, name: 'Toronto' },
    berlin: { lat: 52.5200, lon: 13.4050, name: 'Berlin' },
    madrid: { lat: 40.4168, lon: -3.7038, name: 'Madrid' },
    rome: { lat: 41.9028, lon: 12.4964, name: 'Rome' },
    amsterdam: { lat: 52.3676, lon: 4.9041, name: 'Amsterdam' },
    barcelona: { lat: 41.3851, lon: 2.1734, name: 'Barcelona' },
    seoul: { lat: 37.5665, lon: 126.9780, name: 'Seoul' },
    beijing: { lat: 39.9042, lon: 116.4074, name: 'Beijing' },
    shanghai: { lat: 31.2304, lon: 121.4737, name: 'Shanghai' },
    hongkong: { lat: 22.3193, lon: 114.1694, name: 'Hong Kong' },
    bangkok: { lat: 13.7563, lon: 100.5018, name: 'Bangkok' },
    istanbul: { lat: 41.0082, lon: 28.9784, name: 'Istanbul' },
    moscow: { lat: 55.7558, lon: 37.6173, name: 'Moscow' },
    saopaulo: { lat: -23.5505, lon: -46.6333, name: 'São Paulo' },
    mexicocity: { lat: 19.4326, lon: -99.1332, name: 'Mexico City' }
};

// Global Variables
let currentCity = 'london';
let charts = {};
let refreshInterval;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Check for URL parameters
    loadCityFromURL();
    initializeCharts();
    setupEventListeners();
    loadDashboardData();
    startAutoRefresh();
    updateCityHeader();
});

// Load City from URL Parameters
function loadCityFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    const cityName = urlParams.get('name');
    
    if (cityParam && CITY_COORDS[cityParam.toLowerCase()]) {
        currentCity = cityParam.toLowerCase();
        
        // Update the dropdown selection
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            citySelect.value = currentCity;
        }
        
        console.log(`Loading data for: ${cityName || CITY_COORDS[currentCity].name}`);
    }
}

// Update City Name in Header
function updateCityHeader() {
    const cityData = CITY_COORDS[currentCity];
    if (cityData) {
        // You can add a city name display element if needed
        document.title = `${cityData.name} - Smart City Dashboard`;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('citySelect').addEventListener('change', (e) => {
        currentCity = e.target.value;
        loadDashboardData();
    });
}

// Load All Dashboard Data
async function loadDashboardData() {
    updateLastUpdated();
    await Promise.all([
        fetchWeatherData(),
        fetchAirQualityData()
    ]);
    updateCharts();
}

// Fetch Weather Data
async function fetchWeatherData() {
    const coords = CITY_COORDS[currentCity];
    const weatherStatus = document.getElementById('weatherStatus');
    
    try {
        // Check if API key is set
        if (API_CONFIG.WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
            // Use demo data if no API key
            useDemoWeatherData();
            weatherStatus.style.background = '#f59e0b';
            document.getElementById('weatherApi').innerHTML = 'Weather (Demo) ⚠️';
            return;
        }
        
        const url = `${API_CONFIG.WEATHER_BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_CONFIG.WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Weather API error');
        
        const data = await response.json();
        updateWeatherUI(data);
        weatherStatus.style.background = '#10b981';
        document.getElementById('weatherApi').innerHTML = 'Weather ✓';
        
    } catch (error) {
        console.error('Weather API Error:', error);
        useDemoWeatherData();
        weatherStatus.style.background = '#ef4444';
        document.getElementById('weatherApi').innerHTML = 'Weather (Demo) ⚠️';
    }
}

// Update Weather UI
function updateWeatherUI(data) {
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('weatherDesc').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity + '%';
    document.getElementById('windSpeed').textContent = data.wind.speed + ' m/s';
    document.getElementById('pressure').textContent = data.main.pressure + ' hPa';
    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like) + '°C';
}

// Demo Weather Data
function useDemoWeatherData() {
    const demoData = {
        main: {
            temp: 18 + Math.random() * 5,
            feels_like: 16 + Math.random() * 5,
            humidity: 65 + Math.random() * 15,
            pressure: 1010 + Math.random() * 20
        },
        weather: [{ description: 'partly cloudy' }],
        wind: { speed: 3 + Math.random() * 3 }
    };
    updateWeatherUI(demoData);
}

// Fetch Air Quality Data
async function fetchAirQualityData() {
    const coords = CITY_COORDS[currentCity];
    const aqiStatus = document.getElementById('aqiStatus');
    
    try {
        const url = `${API_CONFIG.AIR_QUALITY_BASE_URL}/latest?coordinates=${coords.lat},${coords.lon}&radius=25000&limit=1`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Air Quality API error');
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            updateAirQualityUI(data.results[0]);
            aqiStatus.style.background = '#10b981';
            document.getElementById('airQualityApi').innerHTML = 'Air Quality ✓';
        } else {
            useDemoAirQualityData();
            aqiStatus.style.background = '#f59e0b';
            document.getElementById('airQualityApi').innerHTML = 'Air Quality (Demo) ⚠️';
        }
        
    } catch (error) {
        console.error('Air Quality API Error:', error);
        useDemoAirQualityData();
        aqiStatus.style.background = '#ef4444';
        document.getElementById('airQualityApi').innerHTML = 'Air Quality (Demo) ⚠️';
    }
}

// Update Air Quality UI
function updateAirQualityUI(data) {
    const measurements = data.measurements || [];
    
    let pm25 = '--', pm10 = '--', o3 = '--', no2 = '--';
    
    measurements.forEach(m => {
        const value = Math.round(m.value * 10) / 10;
        switch(m.parameter) {
            case 'pm25': pm25 = value; break;
            case 'pm10': pm10 = value; break;
            case 'o3': o3 = value; break;
            case 'no2': no2 = value; break;
        }
    });
    
    // Calculate simple AQI (simplified calculation)
    const aqiValue = Math.round((pm25 !== '--' ? pm25 : 35) * 2);
    const aqiCategory = getAQICategory(aqiValue);
    
    document.querySelector('.aqi-number').textContent = aqiValue;
    document.getElementById('aqiLabel').textContent = aqiCategory.label;
    document.querySelector('.aqi-number').style.background = aqiCategory.color;
    
    document.getElementById('pm25').textContent = pm25 + ' µg/m³';
    document.getElementById('pm10').textContent = pm10 + ' µg/m³';
    document.getElementById('o3').textContent = o3 + ' µg/m³';
    document.getElementById('no2').textContent = no2 + ' µg/m³';
}

// Demo Air Quality Data
function useDemoAirQualityData() {
    const demoData = {
        measurements: [
            { parameter: 'pm25', value: 15 + Math.random() * 20 },
            { parameter: 'pm10', value: 25 + Math.random() * 30 },
            { parameter: 'o3', value: 40 + Math.random() * 20 },
            { parameter: 'no2', value: 30 + Math.random() * 25 }
        ]
    };
    updateAirQualityUI(demoData);
}

// Get AQI Category
function getAQICategory(aqi) {
    if (aqi <= 50) return { label: 'Good', color: 'linear-gradient(135deg, #10b981, #059669)' };
    if (aqi <= 100) return { label: 'Moderate', color: 'linear-gradient(135deg, #f59e0b, #d97706)' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'linear-gradient(135deg, #f97316, #ea580c)' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'linear-gradient(135deg, #ef4444, #dc2626)' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: 'linear-gradient(135deg, #a855f7, #9333ea)' };
    return { label: 'Hazardous', color: 'linear-gradient(135deg, #7f1d1d, #991b1b)' };
}

// Initialize Charts
function initializeCharts() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: { color: '#94a3b8' }
            }
        },
        scales: {
            y: {
                ticks: { color: '#94a3b8' },
                grid: { color: '#334155' }
            },
            x: {
                ticks: { color: '#94a3b8' },
                grid: { color: '#334155' }
            }
        }
    };
    
    // Energy Chart
    charts.energy = new Chart(document.getElementById('energyChart'), {
        type: 'bar',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Energy (MW)',
                data: [6500, 5800, 7200, 8900, 9200, 8100],
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2
            }]
        },
        options: chartOptions
    });
    
    // Traffic Chart
    charts.traffic = new Chart(document.getElementById('trafficChart'), {
        type: 'doughnut',
        data: {
            labels: ['Light', 'Moderate', 'Heavy', 'Severe'],
            datasets: [{
                data: [25, 35, 30, 10],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(127, 29, 29, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#1e293b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', padding: 15 }
                }
            }
        }
    });
    
    // Waste Chart
    charts.waste = new Chart(document.getElementById('wasteChart'), {
        type: 'pie',
        data: {
            labels: ['Recycled', 'Composted', 'Landfill', 'Energy'],
            datasets: [{
                data: [45, 22, 18, 15],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#1e293b'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', padding: 15 }
                }
            }
        }
    });
    
    // Temperature Trend Chart
    charts.tempTrend = new Chart(document.getElementById('tempTrendChart'), {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [12, 11, 10, 14, 18, 21, 19, 15],
                borderColor: 'rgba(245, 158, 11, 1)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: chartOptions
    });
}

// Update Charts with Live Data
function updateCharts() {
    // Update energy chart with simulated real-time data
    const currentHour = new Date().getHours();
    const energyData = generateEnergyData(currentHour);
    charts.energy.data.datasets[0].data = energyData;
    charts.energy.update();
    
    // Update temperature trend with current data
    const tempData = generateTempTrendData();
    charts.tempTrend.data.datasets[0].data = tempData;
    charts.tempTrend.update();
    
    // Update traffic with random variations
    const trafficData = charts.traffic.data.datasets[0].data;
    charts.traffic.data.datasets[0].data = trafficData.map(v => 
        Math.max(5, v + (Math.random() - 0.5) * 5)
    );
    charts.traffic.update();
}

// Generate Energy Data based on time
function generateEnergyData(currentHour) {
    const baseLoad = 6000;
    const peakHours = [8, 9, 10, 16, 17, 18, 19, 20];
    
    return [0, 4, 8, 12, 16, 20].map(hour => {
        let load = baseLoad;
        if (peakHours.includes(hour)) {
            load += 2000 + Math.random() * 1000;
        } else if (hour >= 22 || hour <= 5) {
            load -= 500 + Math.random() * 500;
        } else {
            load += Math.random() * 1000;
        }
        return Math.round(load);
    });
}

// Generate Temperature Trend Data
function generateTempTrendData() {
    const baseTemp = 15;
    const hours = [0, 3, 6, 9, 12, 15, 18, 21];
    
    return hours.map(hour => {
        let temp = baseTemp;
        if (hour >= 12 && hour <= 15) {
            temp += 5 + Math.random() * 2;
        } else if (hour >= 6 && hour < 12) {
            temp += (hour - 6) * 0.8;
        } else if (hour > 15 && hour <= 21) {
            temp += 5 - (hour - 15) * 0.5;
        } else {
            temp -= 3 + Math.random() * 2;
        }
        return Math.round(temp * 10) / 10;
    });
}

// Update Last Updated Time
function updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('lastUpdated').textContent = `Last updated: ${timeString}`;
}

// Auto Refresh Data
function startAutoRefresh() {
    // Refresh every 5 minutes (300000 ms)
    refreshInterval = setInterval(() => {
        console.log('Auto-refreshing data...');
        loadDashboardData();
    }, 300000);
}

// Stop Auto Refresh (cleanup)
function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopAutoRefresh();
});

// Handle visibility change for efficient updates
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoRefresh();
    } else {
        startAutoRefresh();
        loadDashboardData();
    }
});

