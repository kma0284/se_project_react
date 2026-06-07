export const getCurrentCoordinates = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export function getWeatherCondition(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}

export const isDay = ({ sunrise, sunset }, now) => {
  const current = now;
  const sunriseMs = sunrise * 1000;
  const sunsetMs = sunset * 1000;

  return current > sunriseMs && current < sunsetMs;
};

export const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round((tempF - 32) * (5 / 9));

  return {
    city: data.name,
    temp: {
      F: tempF,
      C: tempC,
    },
    type: getWeatherCondition(data.main.temp),
    condition: data.weather?.[0]?.main?.toLowerCase() || "unknown",
    isDay: isDay(data.sys, Date.now()),
  };
};
