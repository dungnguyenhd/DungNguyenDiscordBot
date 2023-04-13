const { AttachmentBuilder } = require("discord.js");

module.exports = {
  name: 'image',
  run: async (client, message, args) => {
    const string = args.join(' ');
    if (!string) return message.channel.send(`${client.emotes.error} | Vui lòng nhập từ khóa tìm kiếm.`)

    const axios = require("axios");

    let data = JSON.stringify({
      "prompt": string,
      "n": 1,
      "size": "1024x1024"
    });

    await message.channel.sendTyping();

    const options = {
      method: 'POST',
      url: 'https://api.openai.com/v1/images/generations',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      data: data
    };

    axios.request(options).then(function (response) {
      // Create a new embed with the image URL
      const image = new AttachmentBuilder(response.data.data[0].url, { name: `${string}.png`})

      message.channel.send({ files: [image]});
    }).catch(function (error) {
      console.error(error);
    });
  }
}
