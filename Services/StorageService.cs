using System.Collections.Concurrent;
using GuessWegmons.Models;

namespace GuessWegmons.Services
{
    public class StorageService
    {
        ConcurrentBag<Room> rooms;

        public StorageService()
        {
            rooms = new ConcurrentBag<Room>();
        }
    }
}