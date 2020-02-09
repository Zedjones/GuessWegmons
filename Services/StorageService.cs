using System.Collections.Concurrent;
using System.Collections.Generic;
using GuessWegmons.Models;
using GuessWegmons.PokeApi;
using System.Linq;
using System;
using Microsoft.Extensions.Logging;

namespace GuessWegmons.Services
{
    /// <summary>
    /// Service for room storage.
    /// </summary>
    public class StorageService
    {
        /// <summary>
        /// Logger.
        /// </summary>
        private readonly ILogger<StorageService> logger;

        /// <summary>
        /// All rooms currently being used.
        /// </summary>
        public ConcurrentBag<Room> rooms;

        /// <summary>
        /// Stored random object for generating a hex string.
        /// </summary>
        private static Random random = new Random();

        /// <summary>
        /// Retrieve Pokemon object for creating Pokemon.
        /// </summary>
        private RetrievePokemon retrievePokemon;

        /// <summary>
        /// Create a new Storage Service.
        /// </summary>
        /// <param name="logger">Logger</param>
        /// <param name="retrievePokemon">Retrieve Pokemon object for creating Pokemon</param>
        public StorageService(ILogger<StorageService> logger, RetrievePokemon retrievePokemon)
        {
            rooms = new ConcurrentBag<Room>();
            this.logger = logger;
            this.retrievePokemon = retrievePokemon;
        }

        /// <summary>
        /// Create a new room.
        /// </summary>
        /// <param name="playerId">Player session Id to add</param>
        /// <returns>Name of the created room</returns>
        public string CreateRoom(string playerId)
        {
            string roomName = GetRandomHexNumber(6);
            while (rooms.Any(room => room.Name.Equals(roomName)))
                roomName = GetRandomHexNumber(6);
            var newRoom = new Room()
            {
                Name = roomName,
                Player1Session = playerId,
                Player2Session = null,
                PokemonDtos = new List<PokemonDto>(),
                questionsAndAnswers = new Stack<QuestionAnswer>(),
                Turn = 1,
                PlayerWon = null
            };
            newRoom.CreatePokemonList(retrievePokemon);
            Random rnd = new Random();
            newRoom.Player1Answer = newRoom.PokemonDtos[rnd.Next(0, 25)].Name;
            newRoom.Player2Answer = newRoom.PokemonDtos[rnd.Next(0, 25)].Name;
            rooms.Add(newRoom);
            logger.LogInformation($"Room created with name '{roomName}'.");
            return roomName;
        }

        /// <summary>
        /// Increment to the next turn.
        /// </summary>
        /// <param name="roomName">Room to increment turn for</param>
        /// <returns>If successfull</returns>
        public bool IncrementTurn(string roomName)
        {
            Room roomToUpdate;
            if (rooms.TryTake(out roomToUpdate))
            {
                roomToUpdate.Turn++;
                rooms.Add(roomToUpdate);
                logger.LogWarning($"Room '{roomName}' turn incremented.");
                return true;            
            }
            else
            {
                logger.LogWarning($"Room '{roomName}' did not exist, turn failed to increment.");
                return false;
            }
        }

        /// <summary>
        /// Add a player to a room.
        /// </summary>
        /// <param name="roomName">Room name</param>
        /// <param name="playerId">Player session Id to add</param>
        /// <returns>True if room exists, false if it does not</returns>
        public bool AddPlayer(string roomName, string playerId)
        {
            Room roomToUpdate;
            if (rooms.TryTake(out roomToUpdate))
            {
                roomToUpdate.Player2Session = playerId;
                rooms.Add(roomToUpdate);
                logger.LogInformation($"'{playerId}' successfully joined room '{roomName}'.");
                return true;
            }
            else
            {
                logger.LogInformation($"'{playerId}' failed to join room '{roomName}', room does not exist.");
                return false;
            }
        }

        /// <summary>
        /// Get a random hex string, see
        /// https://stackoverflow.com/questions/1054076/randomly-generated-hexadecimal-number-in-c-sharp#.
        /// </summary>
        /// <param name="digits">Length of string</param>
        /// <returns>Generated hex string</returns>
        public static string GetRandomHexNumber(int digits)
        {
            byte[] buffer = new byte[digits / 2];
            random.NextBytes(buffer);
            string result = String.Concat(buffer.Select(x => x.ToString("X2")).ToArray());
            if (digits % 2 == 0)
                return result;
            return result + random.Next(16).ToString("X");
        }

        /// <summary>
        /// Add a new question to a room.
        /// </summary>
        /// <param name="roomName">Name of the room</param>
        /// <param name="question">Question to add</param>
        public void AddQuestion(string roomName, QuestionAnswer question)
        {
            Room roomToUpdate;
            if (rooms.TryTake(out roomToUpdate))
            {
                roomToUpdate.questionsAndAnswers.Push(question);
                rooms.Add(roomToUpdate);
                logger.LogInformation($"'{question}' successfully added to room '{roomName}'.");
            }
            else
            {
                logger.LogInformation($"'{question}' failed to add to room '{roomName}', room does not exist.");
            }
        }

        /// <summary>
        /// Add a new answer to a room.
        /// </summary>
        /// <param name="roomName">Name of the room</param>
        /// <param name="answer">Answer to add</param>
        public void AddAnswer(string roomName, QuestionAnswer answer)
        {
            Room roomToUpdate;
            if (rooms.TryTake(out roomToUpdate))
            {
                var question = roomToUpdate.questionsAndAnswers.Pop();
                question.answer = answer.answer;
                roomToUpdate.questionsAndAnswers.Push(question);
                rooms.Add(roomToUpdate);
                logger.LogInformation($"'{answer}' successfully added to room '{roomName}'.");
            }
            else
            {
                logger.LogInformation($"'{answer}' failed to add to room '{roomName}', room does not exist.");
            }
        }

        /// <summary>
        /// Get a room based on name.
        /// </summary>
        /// <param name="roomName">Name of the room</param>
        /// <returns>Retrieved room object</returns>
        public Room GetRoom(string roomName)
        {
            var room = rooms.Where(room => room.Name == roomName).FirstOrDefault();
            return room;
        }
    }
}