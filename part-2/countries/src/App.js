import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Countries } from "./Countries";

function App() {
  const [countryName, setCountryName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({});

  let countries = useRef([]);

  const filterContries = () => {
    return countries.current.filter((country) =>
      country.name.common.toLowerCase().includes(countryName.toLowerCase())
    );
  };

  const onChangeCountryName = (e) => {
    setCountryName(e.target.value);
    setSelectedCountry({});
  };

  const filtredCountries = countryName.length ? filterContries() : [];
  if (filtredCountries.length === 1) {
    setCountryName("");
    setSelectedCountry(filtredCountries[0]);
  }

  useEffect(() => {
    console.log("Calling useEffect");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => (countries.current = response.data));
  }, []);

  return (
    <div>
      <div>
        find countries{" "}
        <input value={countryName} onChange={onChangeCountryName} />
      </div>
      <Countries
        countriesStore={filtredCountries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
}

export default App;
