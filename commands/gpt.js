module.exports = {
  name: 'ask',
  aliases: ['chat'],
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Vui lòng nhập từ khóa tìm kiếm.`)
    const regex = /(who are you|whoareyou|ban la ai|bạn là ai| mày là ai| may la ai)/i;
    if (regex.test(string)) return message.channel.send(`Tôi là Vivy, trợ lí ảo của server Discord NGT-Esport được lập trình bởi Dũng Nguyễn.`)
    else {
      const axios = require('axios');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }
      const requestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": string }]
      }

      await message.channel.sendTyping();

      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, { headers });
        const answer = response.data.choices[0].message.content;
        message.channel.send(answer);
      } catch (error) {
        console.log(error.response.data);
        message.channel.send(error.response.data.error.message);
      }
    }
  }
}
