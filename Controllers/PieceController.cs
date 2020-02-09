using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using GuessWegmons.PokeApi;
using GuessWegmons.Models;

namespace GuessWegmons.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PieceController : ControllerBase
    {
        RetrievePokemon retrievePokemon;

        public PieceController(RetrievePokemon retrievePokemon)
        {
            this.retrievePokemon = retrievePokemon;
        }

        public async Task<IEnumerable<PokemonDto>> GetPieces()
        {
            var pokeList = await retrievePokemon.CreateList();
            return pokeList.Select(pokemon => new PokemonDto(pokemon));
        }
    }
}