using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using GuessWegmons.Models;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    /// <summary>
    /// Controller for handling the pieces (Pokemon) on the board.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PieceController : ControllerBase
    {
        /// <summary>
        /// Storage service object for accessing Room info.
        /// </summary>
        private StorageService storageService;

        /// <summary>
        /// Create a Piece Controller object.
        /// </summary>
        /// <param name="storageService">Storage service object for accessing Room info</param>
        public PieceController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        /// <summary>
        /// Get the pieces (Pokemon) for the board.
        /// </summary>
        /// <returns>List of Pokemon data on the board</returns>
        public IEnumerable<PokemonDto> GetPieces()
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
            return room.PokemonDtos;
        }
    }
}