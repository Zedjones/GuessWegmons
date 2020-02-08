using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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
        [HttpPost]
        public ActionResult Join([FromQuery(Name = "id")] string roomId)
        {
            var playerId = HttpContext.Session.Id;
            if(storageService.AddPlayer(roomId, playerId))
            {
                HttpContext.Session.SetString("roomName", roomId);
                HttpContext.Session.SetInt32("player", 2);
                return Ok(roomId);
            }
            return BadRequest();
        }
    }
}