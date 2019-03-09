using TibiaWebsite.Models.Navigation;
using Newtonsoft.Json;
using System.IO;

namespace TibiaWebsite.Helpers
{
    public static class ConfigLoader
    {
        public static T Load<T>(string pathToConfig){
            var jsonToLoad = pathToConfig;
            var json = File.ReadAllText(jsonToLoad);

            return JsonConvert.DeserializeObject<T>(json);
        }
    }
}