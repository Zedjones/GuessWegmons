using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Models;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for each room.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;
        
        /// <summary>
        /// Create a Room Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        public RoomController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        /// <summary>
        /// Receive a request for getting a room.
        /// </summary>
        /// <returns>Status of a request</returns>
        public ActionResult<RoomDto> GetRoom()
        {
            var playerId = HttpContext.Session.GetInt32("player");
            if (!playerId.HasValue)
            {
                return BadRequest();
            }
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
            if (!(room.PlayerWon is null) && (room.Player1Session is null || room.Player2Session is null)) {
                storageService.RemovePlayer(roomName, playerId.Value);
                HttpContext.Session.Remove("player");
                HttpContext.Session.Remove("roomName");
            }
            if (room is null)
            {
                return BadRequest();
            }
            return new RoomDto(storageService.GetRoom(roomName), playerId.Value);
        }
    }
}