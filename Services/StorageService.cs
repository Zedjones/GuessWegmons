using System.Collections.Concurrent;
using GuessWegmons.Models;
using System.Linq;

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