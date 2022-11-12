import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Countries } from "./Countries";
import { Country } from "./Country";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://api.openweathermap.org";
const GEO_URL = "geo/1.0/direct";
const WEATHER_URL = "data/2.5/weather";

function App() {
  const [countryName, setCountryName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});

  let countries = useRef([]);

  const filterContries = () => {
    return countries.current.filter((country) =>
      country.name.common.toLowerCase().includes(countryName.toLowerCase())
    );
  };

  const onChangeCountryName = (e) => {
    setCountryName(e.target.value);
  };

  const onSelectCountry = (country) => {
    console.log("Calling onSelectCountry");
    setCountryName("");
    setSelectedCountry(country);
  };

  const filtredCountries = countryName.length ? filterContries() : [];

  if (filtredCountries.length === 1) {
    onSelectCountry(filtredCountries[0]);
  }

  useEffect(() => {
    console.log("Calling useEffect");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => (countries.current = response.data));
  }, []);

  useEffect(() => {
    if (selectedCountry.capital) {
      axios
        .get(
          `${BASE_URL}/${GEO_URL}?q=${selectedCountry.capital[0]}&appid=${API_KEY}`
        )
        .then((response) => {
          let countryCoordinate = response.data[0];
          axios
            .get(
              `${BASE_URL}/${WEATHER_URL}?lat=${countryCoordinate.lat}&lon=${countryCoordinate.lon}&appid=${API_KEY}`
            )
            .then((response) => {
              setWeatherInfo(response.data);
              console.log(response.data);
            });
        });
    }
  }, [selectedCountry]);

  return (
    <div>
      <div>
        find countries{" "}
        <input value={countryName} onChange={onChangeCountryName} />
      </div>
      <Countries
        countriesStore={filtredCountries}
        selectedCountry={selectedCountry}
        setSelectedCountry={onSelectCountry}
      />
      {Object.keys(selectedCountry).length ? (
        <Country country={selectedCountry} weatherInfo={weatherInfo} />
      ) : null}
    </div>
  );
}

export default App;
