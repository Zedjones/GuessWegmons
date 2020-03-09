using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;
using System.Collections.Generic;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for creating rooms.
    /// </summary>
    [ApiController]
    [Route("api/room/[controller]")]
    public class CreateController : ControllerBase
    {
        /// <summary>
        /// Storage Service object for manipulating rooms.
        /// </summary>
        StorageService storageService;

        /// <summary>
        /// Create a CreateController object.
        /// </summary>
        /// <param name="storageService">Storage Service object for manipulating rooms</param>
        public CreateController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        /// <summary>
        /// Create a new room using the Session Id of the current player.
        /// </summary>
        /// <returns>Name of the created room</returns>
        [HttpPost]
        public Dictionary<string, string> Create([FromBody] string hard)
        { 
            bool hardMode = false;
            if (hard.Equals("true")) {
                hardMode = true;
            }
            var roomName = storageService.CreateRoom(HttpContext.Session.Id, hardMode);
            HttpContext.Session.SetString("roomName", roomName);
            HttpContext.Session.SetInt32("player", 1);
            return new Dictionary<string, string>{ {"id", roomName} };
        }
    }
}