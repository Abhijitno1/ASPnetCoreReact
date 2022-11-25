using ASPnetCoreReact.Models;

namespace ASPnetCoreReact.Repository
{
    public interface ICountryStateCityRepo
    {
        List<Country> GetAllCountries();
        List<City> GetCitiesForStateNCountry(Country country, State state);
        List<State> GetStatesForCountry(Country country);
    }
}