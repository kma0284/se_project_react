# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Weather App

## Description
A React weather application that displays current weather conditions based on the user’s location. If geolocation is unavailable, the app falls back to a default location.

## Features
- Real-time weather data
- Geolocation-based weather detection
- Fallback coordinates if location access is denied
- Dynamic weather icons and conditions

## Technologies Used
- React
- Vite
- JavaScript (ES6+)
- Weather API
- CSS

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   npm install
3. Create a `.env` file:
   VITE_API_KEY=your_api_key_here
4. Run the app:
   npm run dev

## Fallback Location

If geolocation fails, the app uses:

latitude: 28.5383  
longitude: -81.3792

## Deployment
(Add your deployed link here)

## Screenshots
(Add images or screen recording here)
