using System.Collections.Generic;
using System.Linq;

namespace GuessWegmons.Models
{
    /// <summary>
    /// Stores information/data about a Pokemon.
    /// </summary>
    public class PokemonDto
    {
        /// <summary>
        /// Name of the Pokemon.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Type(s) the Pokemon has.
        /// </summary>
        public List<string> Types { get; set; }

        /// <summary>
        /// Url of the sprite for the Pokemon.
        /// </summary>
        public string PictureURL { get; set; }

        /// <summary>
        /// Create a Pokemon Dto object.
        /// </summary>
        /// <param name="fromMon">Pokemon object is based on</param>
        public PokemonDto(PokeApiNet.Pokemon fromMon)
        {
            Name = fromMon.Name;
            PictureURL = fromMon.Sprites.FrontDefault;
            Types = fromMon.Types.Select(type => type.Type.Name).ToList();
        }
    }
}