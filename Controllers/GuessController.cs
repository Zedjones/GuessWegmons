using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using GuessWegmons.Services;
using GuessWegmons.Models;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for handling final guesses.
    /// </summary>
    [ApiController]
    [Route("api/room/[controller]")]
    public class GuessController : ControllerBase
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
        /// Create a Guess Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        /// <param name="logger">Logger</param>
        public GuessController(StorageService storageService, ILogger<StorageService> logger)
        {
            this.storageService = storageService;
            this.logger = logger;
        }

        /// <summary>
        /// Verify if a guess is correct.
        /// </summary>
        /// <param name="guess">Guess to check</param>
        [HttpPost]
        public ActionResult<bool> MakeGuess([FromQuery(Name = "guess")] string guess)
        {
            var player = HttpContext.Session.GetInt32("player").Value;
            var room = storageService.GetRoom(HttpContext.Session.GetString("roomName"));
            if (!(room is null))
            {
                // If player is 1, verify their guess = number 2's correct answer
                if (player == 1)
                {
                    if (room.Player2Answer.Equals(guess))
                    {
                        logger.LogInformation($"Guess '{guess}' = Answer '{room.Player2Answer}', guess was correct!");
                        room.PlayerWon = 1;
                        storageService.RemovePlayer(room.Name, 1);
                        return Ok(true);
                    }
                    logger.LogInformation($"Guess '{guess}' != Answer '{room.Player2Answer}', guess was incorrect!");
                    storageService.IncrementTurn(room.Name);
                    return Ok(false);
                }
                // If player is 2, verify their guess = number 1's correct answer
                else
                {
                    if (room.Player1Answer.Equals(guess))
                    {
                        logger.LogInformation($"Guess '{guess}' = Answer '{room.Player1Answer}', guess was correct!");
                        room.PlayerWon = 2;
                        storageService.RemovePlayer(room.Name, 2);
                        return Ok(true); 
                    }  
                    logger.LogInformation($"Guess '{guess}' != Answer '{room.Player1Answer}', guess was incorrect!");
                    storageService.IncrementTurn(room.Name);
                    return Ok(false);
                }
            }
            else
            {
                logger.LogError($"Room '{room}' was null, guess entry failed.");
                return false;
            }
        }
    }
}