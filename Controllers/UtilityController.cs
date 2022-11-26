using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ASPnetCoreReact.Services;

namespace ASPnetCoreReact.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UtilityController : ControllerBase
    {
        private readonly ILogger<UtilityController> _logger;

        public UtilityController(ILogger<UtilityController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        public ActionResult<string> ReturnHTMLfromJS(string js)
        {
            return HtmlWrapper4JS.WrapJSinHTML(js);
        }
    }
}
