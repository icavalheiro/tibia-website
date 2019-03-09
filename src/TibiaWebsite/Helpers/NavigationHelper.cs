using TibiaWebsite.Models.Navigation;
using Newtonsoft.Json;
using System.IO;

namespace TibiaWebsite.Helpers
{
    public static class NavigationHelper
    {
        public static NavigationCategory[] GetAllCategories()
        {
            var jsonToLoad = "./Data/navigation.json";
            var json = File.ReadAllText(jsonToLoad);

            return JsonConvert.DeserializeObject<NavigationCategory[]>(json);
        }
    }
}