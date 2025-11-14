# 🌆 Smart City Data Dashboard

A real-time interactive dashboard that visualizes smart city data from multiple public APIs. Features beautiful charts, live data updates, and a modern, responsive UI.

## 🎯 Features

### ✅ All Mandatory Requirements Met

- **Real-time Data Integration**: Fetches live data from multiple public APIs
- **Multiple Data Sources**:
  - 🌤️ **Weather Information**: Temperature, humidity, wind speed, pressure, and "feels like" temperature
  - 🌍 **Air Quality Index (AQI)**: Real-time air pollution data including PM2.5, PM10, O₃, and NO₂
  - ⚡ **Energy Consumption**: Visualized with dynamic bar charts showing hourly patterns
  - 🚗 **Traffic Density**: Interactive doughnut chart with zone-specific traffic levels
  - ♻️ **Waste Management**: Pie chart showing waste distribution (recycling, composting, landfill, energy)
  - 📊 **Temperature Trends**: 24-hour temperature trend line chart

### 🎁 Bonus Features Implemented

- **Real-time Updates**: Auto-refresh every 5 minutes
- **Multiple APIs**: Weather API + Air Quality API working together
- **Interactive City Selection**: Choose from 6 major cities (London, New York, Tokyo, Paris, Delhi, Sydney)
- **Status Indicators**: Live API status with visual indicators
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Demo Mode**: Fallback demo data when APIs are unavailable

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Chart.js 4.4.0
- **APIs Used**:
  - OpenWeatherMap API (Weather Data)
  - OpenAQ API (Air Quality Data)

## 📋 Prerequisites

Before running the dashboard, you need:

1. A modern web browser (Chrome, Firefox, Safari, or Edge)
2. (Optional) OpenWeatherMap API Key for live weather data

## 🚀 Setup Instructions

### Step 1: Clone or Download

Download the project files to your local machine:
```bash
cd "/Users/aryanchoudhary/Desktop/cursor city"
```

### Step 2: Get API Keys (Optional but Recommended)

#### OpenWeatherMap API Key (Free):
1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" section
4. Copy your API key

#### Update script.js:
Open `script.js` and replace `YOUR_API_KEY_HERE` with your actual API key:

```javascript
const API_CONFIG = {
    WEATHER_API_KEY: 'your_actual_api_key_here', // Replace this line
    // ... rest of config
};
```

**Note**: The dashboard works without an API key using demo data, but real API data provides actual city information.

### Step 3: Run the Dashboard

Simply open `index.html` in your web browser:

- **Option 1**: Double-click `index.html`
- **Option 2**: Right-click `index.html` → Open With → Your Browser
- **Option 3**: Use a local server (recommended for development):

```bash
# Using Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000
```

## 📱 How to Use

1. **Select a City**: Use the dropdown menu in the header to choose a city
2. **View Real-time Data**: All cards update automatically with the selected city's data
3. **Explore Visualizations**: Hover over charts to see detailed information
4. **Monitor Status**: Green dots indicate live API connections
5. **Auto-refresh**: Dashboard updates every 5 minutes automatically

## 📊 Dashboard Components

### Weather Card
- Current temperature with "feels like" value
- Weather description (cloudy, sunny, rainy, etc.)
- Humidity, wind speed, and atmospheric pressure

### Air Quality Card
- Overall AQI score with color-coded severity
- Individual pollutant measurements (PM2.5, PM10, O₃, NO₂)
- Real-time air quality category (Good, Moderate, Unhealthy, etc.)

### Energy Consumption
- Bar chart showing energy usage patterns
- Current load and peak load statistics
- Time-based energy distribution

### Traffic Density
- Doughnut chart visualizing traffic distribution
- Zone-specific traffic levels (Downtown, Suburbs, Industrial)
- Color-coded severity indicators

### Waste Management
- Pie chart showing waste distribution
- Recycling rate percentage
- Daily collection statistics

### Temperature Trend
- 24-hour line chart showing temperature variations
- Smooth curve visualization
- Hourly temperature points

## 🎨 UI Features

- **Dark Theme**: Modern dark mode interface
- **Smooth Animations**: Card hover effects and data transitions
- **Responsive Grid**: Automatically adjusts to screen size
- **Color-Coded Data**: Intuitive color schemes for quick understanding
- **Status Indicators**: Live pulse animations for active connections

## 🔄 Data Updates

- **Automatic Refresh**: Every 5 minutes
- **Manual Refresh**: Change city selection
- **Smart Updates**: Pauses when tab is hidden to save resources
- **Fallback Mode**: Uses demo data if APIs are unavailable

## 📝 API Information

### OpenWeatherMap API
- **Endpoint**: Current Weather Data
- **Rate Limit**: 60 calls/minute (free tier)
- **Documentation**: [https://openweathermap.org/api](https://openweathermap.org/api)

### OpenAQ API
- **Endpoint**: Latest Air Quality Measurements
- **Rate Limit**: No authentication required
- **Documentation**: [https://docs.openaq.org/](https://docs.openaq.org/)

## 🌟 Key Features Checklist

✅ Uses at least one public API (actually uses 2!)  
✅ Visualizes data using Chart.js  
✅ Clear and simple UI  
✅ Real-time data updates  
✅ Multiple APIs working together  
✅ Responsive design  
✅ Error handling with fallback data  
✅ City selection functionality  
✅ Status indicators  
✅ Auto-refresh capability  

## 🎯 Project Requirements Met

All requirements from the assignment have been successfully implemented:

1. ✅ **Real-time/Public Data**: Fetches from OpenWeatherMap and OpenAQ APIs
2. ✅ **Multiple Data Types**: Weather, air quality, traffic, energy, waste management
3. ✅ **Data Visualization**: Uses Chart.js for bar, line, pie, and doughnut charts
4. ✅ **Interactive Dashboard**: City selection, hover effects, responsive layout
5. ✅ **Clear UI**: Modern, clean interface with intuitive navigation
6. ✅ **Bonus - Real-time Updates**: Auto-refresh every 5 minutes
7. ✅ **Bonus - Multiple APIs**: Weather + Air Quality APIs integrated

## 🐛 Troubleshooting

### No Data Showing?
- Check your internet connection
- Verify API key is correctly set in `script.js`
- Check browser console (F12) for error messages
- Dashboard will show demo data if APIs fail

### Charts Not Displaying?
- Ensure Chart.js CDN is loading (check internet connection)
- Try clearing browser cache
- Make sure JavaScript is enabled

### API Key Not Working?
- Verify the API key is activated (can take a few minutes)
- Check for extra spaces when copying the key
- Ensure you're within the free tier limits

## 📄 File Structure

```
cursor city/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # API integration and functionality
└── README.md          # This file
```

## 🚀 Future Enhancements

Potential features to add:
- Historical data comparison
- Custom date range selection
- Export data functionality
- More cities and regions
- Push notifications for alerts
- User preferences saving
- Dark/Light theme toggle

## 📜 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

Built with vanilla JavaScript, HTML5, and CSS3 - no frameworks required!

Perfect for:
- Learning API integration
- Understanding data visualization
- Practicing responsive design
- Exploring real-world data sources

---

**Enjoy exploring your Smart City Dashboard!** 🌆✨

