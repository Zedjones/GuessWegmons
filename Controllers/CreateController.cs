using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
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
        Logger<CreateController> logger;

        /// <summary>
        /// Create a CreateController object.
        /// </summary>
        /// <param name="storageService">Storage Service object for manipulating rooms</param>
        public CreateController(StorageService storageService, Logger<CreateController> logger)
        {
            this.storageService = storageService;
            this.logger = logger;
        }

        /// <summary>
        /// Create a new room using the Session Id of the current player.
        /// </summary>
        /// <returns>Name of the created room</returns>
        [HttpPost]
        public Dictionary<string, string> Create(string hard)
        { 
            logger.LogInformation(hard);
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