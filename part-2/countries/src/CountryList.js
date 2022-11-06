function CountryList({ countries, setSelectedCountry }) {
  return (
    <>
      {countries.map((country, indx) => {
        return (
          <div key={indx}>
            <span>{country.name.common}</span>
            <button onClick={() => setSelectedCountry(country)}>show</button>
          </div>
        );
      })}
    </>
  );
}

export { CountryList };
