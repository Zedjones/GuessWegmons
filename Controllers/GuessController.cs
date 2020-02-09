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
        public StorageService storageService;

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
        /// <param name="player">Player making the guess (1 = p1, 2 = p2)</param>
        [HttpPost]
        public void MakeGuess(string guess, int player)
        {
            var room = storageService.GetRoom(HttpContext.Session.GetString("roomName"));
            if (!(room is null))
            {
                // If player is 1, verify their guess = number 2's correct answer
                if (player == 1)
                {
                    if (room.Player2Answer.Equals(guess))
                        logger.LogInformation($"Guess '{guess}' = Answer '{room.Player2Answer}', guess was correct!");
                    else
                        logger.LogInformation($"Guess '{guess}' != Answer '{room.Player2Answer}', guess was incorrect!");
                }
                // If player is 2, verify their guess = number 1's correct answer
                else
                {
                    if (room.Player1Answer.Equals(guess))
                        logger.LogInformation($"Guess '{guess}' = Answer '{room.Player1Answer}', guess was correct!");
                    else
                        logger.LogInformation($"Guess '{guess}' != Answer '{room.Player1Answer}', guess was incorrect!");
                }
            }
            else
            {
                logger.LogError($"Room '{room}' was null. Guess entry failed.");
            }
        }
    }
}