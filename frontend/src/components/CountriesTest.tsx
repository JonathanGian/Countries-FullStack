import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries, selectAllCountries } from "../store/slices/countriesSlice";
import { RootState } from "../store";

const CountriesList = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectAllCountries);
  const loading = useSelector((state: RootState) => state.countries.loading);
  const error = useSelector((state: RootState) => state.countries.error);

  useEffect(() => {
    dispatch(fetchAllCountries() as any);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {countries.length > 0 ? (
        countries.map((country, index) => <li key={index}>{String(country.name)}</li>)
      ) : (
        <p>No countries found</p>
      )}
    </ul>
  );
};

export default CountriesList;