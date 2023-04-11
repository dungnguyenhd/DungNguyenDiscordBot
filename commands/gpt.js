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
      let data = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": string
          }
        ]
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://openai80.p.rapidapi.com/chat/completions',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '161c0f8a5emsh6f0acc0af1ec2b6p11e379jsn7cd7c0697694',
          'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
        },
        data: data
      };

      await message.channel.sendTyping();

      axios.request(config)
        .then((response) => {
          response.data.choices.map((choice) => { return message.channel.send(choice.message.content); });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
