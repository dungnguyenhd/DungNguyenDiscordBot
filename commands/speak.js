const { createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { getAudioUrl } = require('google-tts-api');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  name: 'speak',
  aliases: ['s', 'sp'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ');

    if (!message.member.voice.channel) {
      return message.reply('You need to join a voice channel first!');
    }

    const audioURL = getAudioUrl(string, {
      lang: 'vi',
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });

    const connection = joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.member.voice.channel.guild.id,
      adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(audioURL);
    player.play(resource);
    connection.subscribe(player);
  },
}
