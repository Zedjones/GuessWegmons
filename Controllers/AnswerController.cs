using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;
using GuessWegmons.Models;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for handling answers.
    /// </summary>
    [ApiController]
    [Route("api/message/[controller]")]
    public class AnswerController : ControllerBase
    {
        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;

        /// <summary>
        /// Create a Question Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        public AnswerController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        /// <summary>
        /// Add an answer to the room data.
        /// </summary>
        /// <param name="answer">Answer to add</param>
        [HttpPost]
        public void AddAnswer(QuestionAnswer answer)
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var playerNum = HttpContext.Session.GetInt32("player");
            storageService.IncrementTurn(roomName);
            storageService.AddAnswer(roomName, answer);
        }

        /// <summary>
        /// Get an answer from the room.
        /// </summary>
        /// <returns>QuestionAnswer object with answer</returns>
        [HttpGet]
        public QuestionAnswer GetAnswer()
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
            return room.questionsAndAnswers.Peek();
        }
    }
}