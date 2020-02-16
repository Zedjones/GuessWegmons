using System.Collections.Generic;
using System.Linq;
using GuessWegmons.PokeApi;
using System;

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
        /// Player 1 correct answer.
        /// </summary>
        public string Player1Answer { get; set; }

        /// <summary>
        /// Player 2 correct answer.
        /// </summary>
        public string Player2Answer { get; set; }

        /// <summary>
        /// List of the questions and their answers that have been in this room so far.
        /// </summary>
        public Stack<QuestionAnswer> questionsAndAnswers { get; set; }

        /// <summary>
        /// Room 'name'.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Pokemon data.
        /// </summary>
        public List<PokemonDto> PokemonDtos { get; set; }
        
        /// <summary>
        /// Player's turn.
        /// </summary>
        public int Turn { get; set; }

        /// <summary>
        /// Player that has won.
        /// </summary>
        public int? PlayerWon { get; set; }

        public bool GameOver => !(PlayerWon is null);

        /// <summary>
        /// Create the list of Pokemon.
        /// </summary>
        /// <param name="retrievePokemon">Retrieve Pokemon object</param>
        public async void CreatePokemonList(RetrievePokemon retrievePokemon)
        {
            var pokeList = await retrievePokemon.CreateList();
            PokemonDtos = pokeList.Select(poke => new PokemonDto(poke.Item1, poke.Item2)).ToList();
            Random rnd = new Random();
            Player1Answer = PokemonDtos[rnd.Next(0, 25)].Name;
            Player2Answer = PokemonDtos[rnd.Next(0, 25)].Name;
        }
    }
}