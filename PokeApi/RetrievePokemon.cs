using System;
using PokeApiNet;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace GuessWegmons.PokeApi
{
    /// <summary>
    /// Use the Poke Api to generate a board of pokemon.
    /// </summary>
    public class RetrievePokemon
    {
        /// <summary>
        /// Logger.
        /// </summary>
        private readonly ILogger<RetrievePokemon> logger;

        /// <summary>
        /// Poke Client for utilizing the Poke Api.
        /// </summary>
        private PokeApiClient pokeClient;

        /// <summary>
        /// Stored random object for generating a random number.
        /// </summary>
        private static Random random = new Random();

        /// <summary>
        /// Create a Retrieve Pokemon object.
        /// </summary>
        /// <param name="logger">Logger</param>
        public RetrievePokemon(ILogger<RetrievePokemon> logger)
        {
            pokeClient = new PokeApiClient();
            this.logger = logger;
        }

        /// <summary>
        /// Create and send a full list of Pokemon.
        /// </summary>
        /// <returns>List of Pokemon</returns>
        public async Task<IEnumerable<(Pokemon, PokemonSpecies)>> CreateList()
        {
            var allPokemonList = await pokeClient.GetNamedResourcePageAsync<Pokemon>(Int32.MaxValue, 0);

            var usedPokemon = PickPokemon(allPokemonList.Count, 25);
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            var pokemonTasks = usedPokemon.Select(async (i) =>
            {
                var newPoke = await pokeClient.GetResourceAsync<Pokemon>(allPokemonList.Results[i]);
                while (newPoke.Sprites.FrontDefault is null)
                {
                    int newIndex;
                    do
                    {
                        newIndex = random.Next(0, allPokemonList.Count - 1);
                    }
                    while (usedPokemon.Contains(newIndex));
                    newPoke = await pokeClient.GetResourceAsync<Pokemon>(allPokemonList.Results[newIndex]);
                }
                var newPokeSpecies = await pokeClient.GetResourceAsync<PokemonSpecies>(newPoke.Species);
                logger.LogInformation($"Pokemon '{newPoke.Name}' added to board.");
                return (newPoke, newPokeSpecies);
            });
            var pokemon = await Task.WhenAll(pokemonTasks);
            stopwatch.Stop();
            logger.LogInformation($"Fetching took {stopwatch.Elapsed}");
            return pokemon;
        }

        /// <summary>
        /// Get a unique number for a Pokemon to add to the board.
        /// </summary>
        /// <param name="size">Size of the list</param>
        /// <returns>Number for the Pokemon</returns>
        private List<int> PickPokemon(int size, int capacity)
        {
            var usedPokemon = new List<int>();
            while (usedPokemon.Count != capacity)
            {
                var num = random.Next(0, size - 1);
                // Make sure number is unique
                while (usedPokemon.Contains(num))
                    num = random.Next(0, size - 1);
                usedPokemon.Add(num);
                logger.LogInformation($"Pokemon at Id '{num}' expected to be added to board.");
            }
            return usedPokemon;
        }
    }
}