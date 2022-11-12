const imageBaseUrl = "http://openweathermap.org/img/wn";

const kelvinToCelcius = (tempInK) => (tempInK - 273.15).toFixed(2);
const getImageString = (weather) => {
  return weather ? `${imageBaseUrl}/${weather.icon}@2x.png` : "";
};

export default function Weather({ name, weatherInfo }) {
  // console.log(weatherInfo);
  const weatherInCelcius = kelvinToCelcius(weatherInfo.main["temp"]);
  return (
    <>
      <h3>Weather in {name}</h3>
      <div>temperature {weatherInCelcius} Celcius</div>
      <img src={getImageString(weatherInfo.weather[0])} alt="weather icon" />
      <div>wind {weatherInfo.wind.speed} m/s</div>
    </>
  );
}
