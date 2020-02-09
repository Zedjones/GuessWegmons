using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;
using GuessWegmons.Models;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/message/[controller]")]
    public class AnswerController : ControllerBase
    {
        StorageService storageService;
        public AnswerController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        [HttpPost]
        public void AddAnswer(QuestionAnswer answer)
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var playerNum = HttpContext.Session.GetInt32("player");
            storageService.AddAnswer(roomName, answer);
        }
        [HttpGet]
        public QuestionAnswer GetQuestion()
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
            return room.questionsAndAnswers.Peek();
        }
    }
}