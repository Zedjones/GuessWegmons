using System.Collections.Generic;
using System.Linq;
using GuessWegmons.PokeApi;

namespace GuessWegmons.Models
{
    /// <summary>
    /// Store information about a Room object.
    /// </summary>
    public class Room
    {
        /// <summary>
        /// Player 1 session Id.
        /// </summary>
        public string Player1Session { get; set; }

        /// <summary>
        /// Player 2 session Id.
        /// </summary>
        public string Player2Session { get; set; }

        /// <summary>
        /// List of the questions and their answers that have been in this room so far.
        /// </summary>
        public Stack<QuestionAnswer> questionsAndAnswers { get; set; }

        /// <summary>
        /// Room 'name'.
        /// </summary>
        public string Name { get; set; }
        public List<PokemonDto> PokemonDtos { get; set; }

        public async void CreatePokemonList(RetrievePokemon retrievePokemon)
        {
            var pokeList = await retrievePokemon.CreateList();
            PokemonDtos = pokeList.Select(poke => new PokemonDto(poke)).ToList();
        }
    }
}