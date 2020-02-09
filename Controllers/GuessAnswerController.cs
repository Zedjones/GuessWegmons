using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/room/answer")]
    public class GuessAnswerController : ControllerBase
    {
        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;
        public GuessAnswerController(StorageService storageService)
        {
            this.storageService = storageService;
        }
        public void SetAnswer([FromQuery(Name = "answer")] string answer)
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
        }
    }
}