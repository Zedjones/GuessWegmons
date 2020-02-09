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
    [Route("api/message/[controller]")]
    public class QuestionController : ControllerBase
    {
        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;

        /// <summary>
        /// Create a Question Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        public QuestionController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        /// <summary>
        /// Add an question to the room data.
        /// </summary>
        /// <param name="answer">Question to add</param>
        [HttpPost]
        public void AddQuestion(QuestionAnswer question)
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var playerNum = HttpContext.Session.GetInt32("player");
            question.player = playerNum.Value;
            storageService.AddQuestion(roomName, question);
        }

        /// <summary>
        /// Get a question from the room.
        /// </summary>
        /// <returns>QuestionAnswer object with question</returns>
        [HttpGet]
        public QuestionAnswer GetQuestion()
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
            // Make sure the turn is correct
            if (room.questionsAndAnswers.Count == room.Turn)
            {
                return room.questionsAndAnswers.Peek();
            }
            return null;
        }
    }
}