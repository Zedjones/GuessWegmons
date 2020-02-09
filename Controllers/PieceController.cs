using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using GuessWegmons.Models;
using GuessWegmons.Services;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PieceController : ControllerBase
    {
        StorageService storageService;

        public PieceController(StorageService storageService)
        {
            this.storageService = storageService;
        }

        public IEnumerable<PokemonDto> GetPieces()
        {
            var roomName = HttpContext.Session.GetString("roomName");
            var room = storageService.GetRoom(roomName);
            return room.PokemonDtos;
        }
    }
}