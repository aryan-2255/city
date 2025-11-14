// Map Page JavaScript

// City Data (from script.js)
const CITIES = {
    london: { lat: 51.5074, lon: -0.1278, name: 'London', country: 'UK' },
    newyork: { lat: 40.7128, lon: -74.0060, name: 'New York', country: 'USA' },
    tokyo: { lat: 35.6762, lon: 139.6503, name: 'Tokyo', country: 'Japan' },
    paris: { lat: 48.8566, lon: 2.3522, name: 'Paris', country: 'France' },
    delhi: { lat: 28.6139, lon: 77.2090, name: 'Delhi', country: 'India' },
    sydney: { lat: -33.8688, lon: 151.2093, name: 'Sydney', country: 'Australia' },
    mumbai: { lat: 19.0760, lon: 72.8777, name: 'Mumbai', country: 'India' },
    singapore: { lat: 1.3521, lon: 103.8198, name: 'Singapore', country: 'Singapore' },
    dubai: { lat: 25.2048, lon: 55.2708, name: 'Dubai', country: 'UAE' },
    losangeles: { lat: 34.0522, lon: -118.2437, name: 'Los Angeles', country: 'USA' },
    chicago: { lat: 41.8781, lon: -87.6298, name: 'Chicago', country: 'USA' },
    toronto: { lat: 43.6532, lon: -79.3832, name: 'Toronto', country: 'Canada' },
    berlin: { lat: 52.5200, lon: 13.4050, name: 'Berlin', country: 'Germany' },
    madrid: { lat: 40.4168, lon: -3.7038, name: 'Madrid', country: 'Spain' },
    rome: { lat: 41.9028, lon: 12.4964, name: 'Rome', country: 'Italy' },
    amsterdam: { lat: 52.3676, lon: 4.9041, name: 'Amsterdam', country: 'Netherlands' },
    barcelona: { lat: 41.3851, lon: 2.1734, name: 'Barcelona', country: 'Spain' },
    seoul: { lat: 37.5665, lon: 126.9780, name: 'Seoul', country: 'South Korea' },
    beijing: { lat: 39.9042, lon: 116.4074, name: 'Beijing', country: 'China' },
    shanghai: { lat: 31.2304, lon: 121.4737, name: 'Shanghai', country: 'China' },
    hongkong: { lat: 22.3193, lon: 114.1694, name: 'Hong Kong', country: 'China' },
    bangkok: { lat: 13.7563, lon: 100.5018, name: 'Bangkok', country: 'Thailand' },
    istanbul: { lat: 41.0082, lon: 28.9784, name: 'Istanbul', country: 'Turkey' },
    moscow: { lat: 55.7558, lon: 37.6173, name: 'Moscow', country: 'Russia' },
    saopaulo: { lat: -23.5505, lon: -46.6333, name: 'São Paulo', country: 'Brazil' },
    mexicocity: { lat: 19.4326, lon: -99.1332, name: 'Mexico City', country: 'Mexico' }
};

let selectedCity = null;

// Initialize Map
document.addEventListener('DOMContentLoaded', () => {
    populateCityList();
    setupCityMarkers();
    setupEventListeners();
});

// Populate City List
function populateCityList() {
    const cityList = document.getElementById('cityList');
    
    Object.entries(CITIES).forEach(([key, city]) => {
        const cityItem = document.createElement('div');
        cityItem.className = 'city-list-item';
        cityItem.dataset.cityKey = key;
        cityItem.innerHTML = `
            <div>
                <div class="city-name">${city.name}</div>
                <div class="city-country">${city.country}</div>
            </div>
            <span>→</span>
        `;
        
        cityItem.addEventListener('click', () => selectCity(key));
        cityList.appendChild(cityItem);
    });
}

// Convert lat/lon to SVG coordinates
function latLonToSVG(lat, lon) {
    // Simple equirectangular projection
    const x = ((lon + 180) / 360) * 1000;
    const y = ((90 - lat) / 180) * 500;
    return { x, y };
}

// Get random color based on city (simulated air quality)
function getCityColor(cityKey) {
    const colors = ['#10b981', '#10b981', '#f59e0b', '#10b981', '#ef4444', '#10b981'];
    const hash = cityKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
}

// Setup City Markers on Map
function setupCityMarkers() {
    const markersGroup = document.getElementById('cityMarkers');
    
    Object.entries(CITIES).forEach(([key, city]) => {
        const { x, y } = latLonToSVG(city.lat, city.lon);
        const color = getCityColor(key);
        
        const markerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        markerGroup.setAttribute('class', 'city-marker');
        markerGroup.dataset.cityKey = key;
        
        // Circle marker
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', color);
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', '2');
        
        // City name text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y - 10);
        text.setAttribute('text-anchor', 'middle');
        text.textContent = city.name;
        
        markerGroup.appendChild(circle);
        markerGroup.appendChild(text);
        markersGroup.appendChild(markerGroup);
        
        // Click handler
        markerGroup.addEventListener('click', () => selectCity(key));
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('mapCitySearch');
    searchInput.addEventListener('input', (e) => {
        filterCities(e.target.value);
    });
    
    // Close info card
    document.getElementById('closeInfoCard').addEventListener('click', () => {
        document.getElementById('cityInfoCard').style.display = 'none';
        selectedCity = null;
        
        // Remove active class from all items
        document.querySelectorAll('.city-list-item').forEach(item => {
            item.classList.remove('active');
        });
    });
    
    // View details button
    document.getElementById('viewDetailsBtn').addEventListener('click', () => {
        if (selectedCity) {
            window.location.href = `dashboard.html?city=${selectedCity}&name=${CITIES[selectedCity].name}`;
        }
    });
}

// Filter Cities
function filterCities(searchTerm) {
    const items = document.querySelectorAll('.city-list-item');
    const term = searchTerm.toLowerCase();
    
    items.forEach(item => {
        const cityKey = item.dataset.cityKey;
        const city = CITIES[cityKey];
        const matchesSearch = city.name.toLowerCase().includes(term) || 
                            city.country.toLowerCase().includes(term);
        
        item.style.display = matchesSearch ? 'flex' : 'none';
    });
}

// Select City
function selectCity(cityKey) {
    selectedCity = cityKey;
    const city = CITIES[cityKey];
    
    // Update active state in list
    document.querySelectorAll('.city-list-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.cityKey === cityKey) {
            item.classList.add('active');
        }
    });
    
    // Show info card
    const infoCard = document.getElementById('cityInfoCard');
    document.getElementById('selectedCityName').textContent = city.name;
    document.getElementById('cityCoords').textContent = `${city.lat.toFixed(2)}°, ${city.lon.toFixed(2)}°`;
    document.getElementById('cityClimate').textContent = getClimateType(city.lat);
    
    infoCard.style.display = 'block';
    
    // Highlight marker
    document.querySelectorAll('.city-marker').forEach(marker => {
        marker.style.opacity = marker.dataset.cityKey === cityKey ? '1' : '0.4';
    });
}

// Get Climate Type (simplified)
function getClimateType(lat) {
    const absLat = Math.abs(lat);
    if (absLat >= 60) return 'Polar/Subarctic';
    if (absLat >= 40) return 'Temperate';
    if (absLat >= 23.5) return 'Subtropical';
    return 'Tropical';
}

// Add pulse animation to markers
setInterval(() => {
    document.querySelectorAll('.city-marker circle').forEach((circle, index) => {
        setTimeout(() => {
            circle.style.opacity = '0.5';
            setTimeout(() => {
                circle.style.opacity = '1';
            }, 300);
        }, index * 100);
    });
}, 5000);

