using System.Collections.Generic;
using System.Linq;

namespace GuessWegmons.Models
{
    public class PokemonDto
    {
        public PokemonDto(PokeApiNet.Pokemon fromMon)
        {
            Name = fromMon.Species.Name;
            PictureURL = fromMon.Sprites.FrontDefault;
            Types = fromMon.Types.Select(type => type.Type.Name).ToList();
        }

        public string Name { get; set; }
        public List<string> Types { get; set; }
        public string PictureURL { get; set; }
    }
}