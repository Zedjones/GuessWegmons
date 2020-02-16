using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;
using GuessWegmons.Models;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for handling questions.
    /// </summary>
    [ApiController]
    [Route("api/room/[controller]")]
    public class LeaveController : ControllerBase
    {
        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;

        /// <summary>
        /// Create a Question Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        public LeaveController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        /// <summary>
        /// Get a question from the room.
        /// </summary>
        /// <returns>QuestionAnswer object with question</returns>
        [HttpGet]
        public ActionResult<bool> GetQuestion()
        {
            var player = HttpContext.Session.GetInt32("player").Value;
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);

            // update room info

            return Ok(true);
        }
    }
}