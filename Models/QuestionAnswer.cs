using Newtonsoft.Json;

namespace GuessWegmons.Models
{
    /// <summary>
    /// Stores information on a question and its answer.
    /// </summary>
    public class QuestionAnswer
    {
        /// <summary>
        /// Question as a string.
        /// </summary>
        public string question { get; set; }

        /// <summary>
        /// Answer as a bool.
        /// True = yes, false = no.
        /// </summary>
        public bool? answer { get; set; }

        /// <summary>
        /// Which player asked the question.
        /// 1 = player 1, 2 = player 2.
        /// </summary>
        public int player { get; set; }

        /// <summary>
        /// Create an empty QuestionAnswer object.
        /// </summary>
        public QuestionAnswer() { }

        /// <summary>
        /// Create a QuestionAnswer object with a set question and answer.
        /// </summary>
        /// <param name="question">Question string</param>
        /// <param name="answer">Answer bool: true = yes, false = no</param>
        /// <param name="plauer">Which player asked the question: 1 = p1, 2 = p2</param>
        public QuestionAnswer(string question, bool answer, int player) 
        {
            this.question = question;
            this.answer = answer;
            this.player = player;
        }
    }
}