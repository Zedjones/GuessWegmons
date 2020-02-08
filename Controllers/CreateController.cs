using Microsoft.AspNetCore.Mvc;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/room/[controller]")]
    public class CreateController : ControllerBase
    {
        StorageService storageService;
        public CreateController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        [HttpPost]
        public string Create()
        {
            return "";
        }
    }
}