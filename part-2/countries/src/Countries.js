import { Country } from "./Country";
import { CountryList } from "./CountryList";

function Countries({ countriesStore, selectedCountry, setSelectedCountry }) {
  const showCountries = () => {
    if (countriesStore.length > 10) {
      return "Too many matches, specify another filter";
    } else if (countriesStore.length > 1) {
      return (
        <CountryList
          countries={countriesStore}
          setSelectedCountry={setSelectedCountry}
        />
      );
    }
  };

  return Object.keys(selectedCountry).length ? (
    <Country country={selectedCountry} />
  ) : (
    showCountries()
  );
}

export { Countries };
