module.exports = {
  name: 'ask',
  aliases: ['chat, vivy'],
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Vui lòng nhập từ khóa tìm kiếm.`)
    const regex = /(who are you|whoareyou|ban la ai|bạn là ai| mày là ai| may la ai)/i;
    if (regex.test(string)) return message.channel.send(`Tôi là Vivy, trợ lí ảo của server Discord NGT-Esport được lập trình bởi Dũng Nguyễn.`)
    else {
      const axios = require('axios');

      const headers = {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a2a54a3203msh9c44dd7f554da86p1d230bjsn4187c62b271a',
        'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
      }
      const requestBody = {
        "question": string
      }

      await message.channel.sendTyping();

      try {
        const response = await axios.post('https://simple-chatgpt-api.p.rapidapi.com/ask', requestBody, { headers });
        const answer = response.data.answer;
        message.channel.send(answer);
      } catch (error) {
        console.log(error.response);
        message.channel.send(error.response);
      }
    }
  }
}
