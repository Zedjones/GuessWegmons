using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;
using Microsoft.Extensions.Logging;
using GuessWegmons.Models;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for assigning an answer to a guess in a room.
    /// TO DO : DELETE ?
    /// </summary>
    [ApiController]
    [Route("api/room/answer")]
    public class GuessAnswerController : ControllerBase
    {
        /// <summary>
        /// Logger.
        /// </summary>
        private readonly ILogger<StorageService> logger;

        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;

        /// <summary>
        /// Create a GuessAnswer Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        /// /// <param name="logger">Logger</param>
        public GuessAnswerController(StorageService storageService, ILogger<StorageService> logger)
        {
            this.storageService = storageService;
        }

        /// <summary>
        /// Set an answer for a room.
        /// </summary>
        /// <param name="answer"></param>
        public void SetAnswer([FromQuery(Name = "answer")] string answer)
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
            //storageService.AddAnswer(room, new QuestionAnswer{ answer = answer})
        }
    }
}