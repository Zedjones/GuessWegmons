using System.Collections.Concurrent;
using GuessWegmons.Models;
using System.Linq;

namespace GuessWegmons.Services
{
    /// <summary>
    /// Service for room storage.
    /// </summary>
    public class StorageService
    {
        /// <summary>
        /// All rooms currently being used.
        /// </summary>
        public ConcurrentBag<Room> rooms;

        /// <summary>
        /// Stored random object for generating a hex string.
        /// </summary>
        private static Random random = new Random();

        /// <summary>
        /// Create a new Storage Service.
        /// </summary>
        public StorageService()
        {
            rooms = new ConcurrentBag<Room>();
        }

        /// <summary>
        /// Create a new room.
        /// </summary>
        /// <param name="playerId">Player session Id to add</param>
        /// <returns>Name of the room created</returns>
        public string CreateRoom(string playerId)
        {
            string roomName = GetRandomHexNumber(6);
            while (rooms.Contains(room => room.name.equals(roomName)))
                roomName = GetRandomHexNumber(6);
            rooms.Add(new Room()
            {
                Name = roomName,
                Player1Session = playerId,
                Player2Session = null
            });
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
                return true;
            }
            else
            {
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
    }
}