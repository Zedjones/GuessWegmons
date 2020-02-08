using Microsoft.AspNetCore.Mvc;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/room/[controller]")]
    public class CreateController : ControllerBase
    {
        public CreateController(Services.StorageService app)
        {

        }

        [HttpPost]
        public string Create()
        {
            return "";   
        }
    }
}