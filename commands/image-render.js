const { AttachmentBuilder } = require("discord.js");

module.exports = {
  name: 'image',
  run: async (client, message, args) => {
    const string = args.join(' ');
    const spl = string.split('&');
    if (!string) return message.channel.send(`${client.emotes.error} | Vui lòng nhập từ khóa tìm kiếm.`)
    let size = spl[2] ? spl[2] : "1024x1024";

    const axios = require("axios");

    let data = JSON.stringify({
      "prompt": spl[2] ? spl[1] : string,
      "n": 1,
      "size": size
    });

    await message.channel.sendTyping();

    const options = {
      method: 'POST',
      url: 'https://openai80.p.rapidapi.com/images/generations',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '161c0f8a5emsh6f0acc0af1ec2b6p11e379jsn7cd7c0697694',
        'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
      },
      data: data
    };

    axios.request(options).then(function (response) {
      // Create a new embed with the image URL
      const image = new AttachmentBuilder(response.data.data[0].url, { name: `${spl[2] ? spl[1] : string}.png`})

      message.channel.send({ files: [image]});
    }).catch(function (error) {
      console.error(error);
    });
  }
}
