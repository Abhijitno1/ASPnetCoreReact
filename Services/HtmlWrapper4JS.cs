namespace ASPnetCoreReact.Services
{
    public static class HtmlWrapper4JS
    {
        public static string WrapJSinHTML(string js) 
        {
            return $"<html><body><script>{js}</script></body></html>";
        }
    }
}
