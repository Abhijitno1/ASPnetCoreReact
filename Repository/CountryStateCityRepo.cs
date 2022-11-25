using ASPnetCoreReact.Models;

namespace ASPnetCoreReact.Repository
{
    public class CountryStateCityRepo : ICountryStateCityRepo
    {
        readonly DatabaseContext _databaseContext = new();

        public CountryStateCityRepo(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public List<Country> GetAllCountries()
        {
            return _databaseContext.Countries.ToList();
        }

        public List<State> GetStatesForCountry(Country country)
        {
            return _databaseContext.States.Where(s => s.CountryId == country.Id).ToList();
        }

        public List<City> GetCitiesForStateNCountry(Country country, State state)
        {
            return _databaseContext.Cities.Where(ct => ct.CountryId == country.Id
                && ct.StateId == state.Id).ToList();
        }
    }
}
