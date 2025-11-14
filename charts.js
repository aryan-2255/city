// Charts Page JavaScript

let currentCity = 'london';
let allCharts = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeAllCharts();
    setupEventListeners();
    updateLastUpdate();
});

// Setup Event Listeners
function setupEventListeners() {
    // City selector
    document.getElementById('citySelect').addEventListener('change', (e) => {
        currentCity = e.target.value;
        updateAllCharts();
    });
    
    // Chart filter buttons
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter charts
            const view = btn.dataset.view;
            filterCharts(view);
        });
    });
}

// Filter Charts by Category
function filterCharts(view) {
    const allCards = document.querySelectorAll('.chart-card');
    
    if (view === 'all') {
        allCards.forEach(card => card.classList.remove('hidden'));
    } else {
        allCards.forEach(card => {
            const category = card.dataset.category;
            if (category === view) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
}

// Initialize All Charts
function initializeAllCharts() {
    const chartConfig = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: { color: '#94a3b8', font: { size: 11 } }
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
    
    // Temperature Trend Chart
    allCharts.temp = new Chart(document.getElementById('tempChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [18, 20, 19, 22, 24, 23, 21],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: chartConfig
    });
    
    // Humidity Chart
    allCharts.humidity = new Chart(document.getElementById('humidityChart'), {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Humidity (%)',
                data: [65, 70, 68, 72, 75, 71, 69],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: '#3b82f6',
                borderWidth: 2
            }]
        },
        options: chartConfig
    });
    
    // Energy Consumption Chart
    allCharts.energy = new Chart(document.getElementById('energyConsumptionChart'), {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: 'Energy (MW)',
                data: [6500, 5800, 7200, 8900, 9200, 8100],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: chartConfig
    });
    
    // Traffic Flow Chart
    allCharts.traffic = new Chart(document.getElementById('trafficFlowChart'), {
        type: 'radar',
        data: {
            labels: ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'],
            datasets: [{
                label: 'Traffic Density',
                data: [65, 72, 80, 75, 85, 70, 68, 60],
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                borderColor: '#8b5cf6',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: { color: '#94a3b8' }
                }
            },
            scales: {
                r: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#334155' },
                    pointLabels: { color: '#94a3b8' }
                }
            }
        }
    });
    
    // AQI Chart
    allCharts.aqi = new Chart(document.getElementById('aqiChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'AQI',
                data: [45, 52, 48, 55, 62, 58, 50],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: chartConfig
    });
    
    // Pollutants Comparison
    allCharts.pollutants = new Chart(document.getElementById('pollutantsChart'), {
        type: 'bar',
        data: {
            labels: ['PM2.5', 'PM10', 'O₃', 'NO₂', 'SO₂', 'CO'],
            datasets: [{
                label: 'Concentration (µg/m³)',
                data: [35, 45, 55, 40, 20, 15],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(236, 72, 153, 0.7)'
                ],
                borderWidth: 2
            }]
        },
        options: chartConfig
    });
    
    // Wind Speed Chart
    allCharts.windSpeed = new Chart(document.getElementById('windSpeedChart'), {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Wind Speed (m/s)',
                data: [3.5, 4.2, 3.8, 5.1, 4.8, 3.2, 3.9],
                borderColor: '#06b6d4',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: chartConfig
    });
    
    // Peak Hours Distribution
    allCharts.peakHours = new Chart(document.getElementById('peakHoursChart'), {
        type: 'doughnut',
        data: {
            labels: ['Morning Peak', 'Midday', 'Evening Peak', 'Night'],
            datasets: [{
                data: [30, 20, 35, 15],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
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
}

// Update All Charts with New Data
function updateAllCharts() {
    // Generate new random data based on city (simulated)
    const variation = Math.random() * 5;
    
    // Update temperature
    allCharts.temp.data.datasets[0].data = generateWeekData(20, 5);
    allCharts.temp.update();
    
    // Update humidity
    allCharts.humidity.data.datasets[0].data = generateWeekData(70, 8);
    allCharts.humidity.update();
    
    // Update energy
    allCharts.energy.data.datasets[0].data = [
        6500 + variation * 100,
        5800 + variation * 100,
        7200 + variation * 100,
        8900 + variation * 100,
        9200 + variation * 100,
        8100 + variation * 100
    ];
    allCharts.energy.update();
    
    // Update traffic
    allCharts.traffic.data.datasets[0].data = generateRadarData();
    allCharts.traffic.update();
    
    // Update AQI
    allCharts.aqi.data.datasets[0].data = generateWeekData(50, 10);
    allCharts.aqi.update();
    
    // Update wind speed
    allCharts.windSpeed.data.datasets[0].data = generateWeekData(4, 2);
    allCharts.windSpeed.update();
    
    updateLastUpdate();
}

// Generate Week Data
function generateWeekData(base, variance) {
    return Array.from({ length: 7 }, () => 
        Math.round((base + (Math.random() - 0.5) * variance * 2) * 10) / 10
    );
}

// Generate Radar Data
function generateRadarData() {
    return Array.from({ length: 8 }, () => 
        Math.round(50 + Math.random() * 40)
    );
}

// Update Last Update Time
function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

// Auto-refresh data every 5 minutes
setInterval(updateAllCharts, 300000);

