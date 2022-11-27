import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const onChangeHandler = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  return (
    <AsyncPaginate
      placeholder='Search for a city'
      debounceTimeout={600}
      value={search}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
