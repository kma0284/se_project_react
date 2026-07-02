import { checkResponse } from "./api";

export const getCurrentCoordinates = () => {
  const fallback = {
    latitude: 28.5383, // Orlando
    longitude: -81.3792,
  };

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      () => {
        resolve(fallback);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  });
};

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then(checkResponse);
};

export function getWeatherCondition(tempF) {
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}

export const isDay = (sys, now = Date.now()) => {
  return now > sys.sunrise * 1000 && now < sys.sunset * 1000;
};

export const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp);
  const tempC = Math.round((tempF - 32) * (5 / 9));

  return {
    city: data.name,
    temp: {
      f: tempF,
      c: tempC,
    },
    type: getWeatherCondition(tempF),
    condition: data.weather?.[0]?.main?.toLowerCase() || "unknown",
    isDay: isDay(data.sys),
  };
};
