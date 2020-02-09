using System.Collections.Generic;

namespace GuessWegmons.Models
{
    public class RoomDto
    {
        public RoomDto(Room fromRoom)
        {
            Player1In = fromRoom.Player1Session != null;
            Player2In = fromRoom.Player2Session != null;
            if (fromRoom.questionsAndAnswers is null)
            {
                questionsAndAnswers = new Stack<QuestionAnswer>();
            }
            else
            {
                questionsAndAnswers = fromRoom.questionsAndAnswers;

            }
            Name = fromRoom.Name;
        }

        /// <summary>
        /// Whether or not player 1 is in the game
        /// </summary>
        public bool Player1In { get; set; }

        /// <summary>
        /// Whether or not player 2 is in the game
        /// </summary>
        public bool Player2In { get; set; }

        /// <summary>
        /// List of the questions and their answers that have been in this room so far.
        /// </summary>
        public Stack<QuestionAnswer> questionsAndAnswers { get; set; }

        /// <summary>
        /// Room 'name'.
        /// </summary>
        public string Name { get; set; }
    }

}