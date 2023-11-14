
const OpenAI = require('openai')
const openai= new OpenAI({
  apiKey : "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",
  dangerouslyAllowBrowser: true
})
export async function sendMsgToOpenAI(message){
    const res = await openai.chat.completions.create({
        model:'text-davinci-003' ,//this is the model we are using there are number of models
        prompt: message,
        temperature : 0.7,
        max_tokens: 256,
        top_p:1,
        frequency_penalty:0,
        presence_penalty:0,
    });
    return res.choices[0].text;
}