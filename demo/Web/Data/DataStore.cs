using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Data
{
    public class DataStore : IDataStore
    {
        private static IQueryable<User> _users;

        public static IQueryable<User> Users => _users ??= User.Seed().AsQueryable();

    }
}
