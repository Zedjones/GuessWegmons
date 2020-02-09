using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;
using GuessWegmons.Models;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/message/[controller]")]
    public class QuestionController : ControllerBase
    {
        StorageService storageService;
        public QuestionController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        [HttpPost]
        public void AddQuestion(QuestionAnswer question)
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var playerNum = HttpContext.Session.GetInt32("player");
            question.player = playerNum.Value;
            storageService.AddQuestion(roomName, question);
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