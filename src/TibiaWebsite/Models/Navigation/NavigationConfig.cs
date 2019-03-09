namespace TibiaWebsite.Models.Navigation
{
    public struct NavigationConfig
    {
        public string logoUrl;
        public string loginText;
        public string loginHref;
        public string createAccountText;
        public string createAccountHref;
        public string downloadText;
        public string downloadHref;
        public NavigationCategory[] categories;
    }
}