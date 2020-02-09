using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Models;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        StorageService storageService;
        public RoomController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        public ActionResult<RoomDto> GetRoom()
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var playerId = HttpContext.Session.GetInt32("player").Value;
            var room = storageService.GetRoom(roomName);
            if(room is null)
            {
                return BadRequest();
            }
            return new RoomDto(storageService.GetRoom(roomName), playerId);
        }
    }
}