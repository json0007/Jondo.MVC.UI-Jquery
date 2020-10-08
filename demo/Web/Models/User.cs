using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Threading.Tasks;

namespace Web.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public DateTime Birthday { get; set; }

        public static IEnumerable<User> Seed()
        {
            using (StreamReader r = new StreamReader(@"Data\Mock\Users.json"))
            {
                string json = r.ReadToEnd();
                return JsonConvert.DeserializeObject<IEnumerable<User>>(json);
            }
        }
    }
}
