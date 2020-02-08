using Microsoft.AspNetCore.Mvc;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/room/[controller]")]
    public class JoinController : ControllerBase
    {
        StorageService storageService;
        public JoinController(StorageService storageService)
        {
            this.storageService = storageService;
        }
        public void Join([FromQuery(Name = "id")] string id)
        {
        }
    }
}