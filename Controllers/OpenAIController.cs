using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;
using System.Text;

namespace ASPnetCoreReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OpenAIController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> UseChatGPT(string query)
        {
            var result = new StringBuilder();
            var openAiApi = new OpenAIAPI("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");
            var completionRequest = new CompletionRequest()
            {
                Prompt = query,
                Model = OpenAI_API.Models.Model.ChatGPTTurbo,
                MaxTokens = 1024
            };
            var completions = await openAiApi.Completions.CreateCompletionAsync(completionRequest);
            foreach (var completion in completions.Completions) 
            { 
                result.Append(completion.Text);
            }
            return Ok(result.ToString());
        }
    }
}
