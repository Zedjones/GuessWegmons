using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for joining a room.
    /// </summary>
    [ApiController]
    [Route("api/room/[controller]")]
    public class JoinController : ControllerBase
    {
        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;

        /// <summary>
        /// Create a Join Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        public JoinController(StorageService storageService)
        {
            this.storageService = storageService;
        }
        
        /// <summary>
        /// Receive a request to join a room.
        /// </summary>
        /// <param name="roomId">Id of the room to join</param>
        /// <returns>Status of request</returns>
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