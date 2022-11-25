using ASPnetCoreReact.Models;
using ASPnetCoreReact.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ASPnetCoreReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly ICountryStateCityRepo _repository;
        public CountriesController(ICountryStateCityRepo repository)
        {
            this._repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Country>> GetAllCountries()
        {
            return _repository.GetAllCountries();
        }

        [HttpGet("{countryId}/states")]
        public ActionResult<IEnumerable<State>> FetchStatesForCountry(int countryId)
        {
            return _repository.GetStatesForCountry(new Country { Id = countryId });
        }

        [HttpGet("{countryId}/states/{stateId}/cities")]
        public ActionResult<IEnumerable<City>> FetchCitiesForStateNCountry(int countryId, int stateId)
        {
            return _repository.GetCitiesForStateNCountry(new Country { Id = countryId }, new State { Id = stateId });
        }
    }
}
