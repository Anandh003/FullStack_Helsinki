import CountryInfo from "./CountryInfo";
import Weather from "./Weather";

function Country({ country, weatherInfo }) {
  return (
    <div>
      <CountryInfo country={country} />
      <br />
      {weatherInfo.main ? (
        <Weather country={country.capital[0]} weatherInfo={weatherInfo} />
      ) : null}
    </div>
  );
}

export { Country };
