module.exports = {
  name: 'bật',
  aliases: ['p', 'b', 'play', 'bat'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.error} | Nhập tên bài hát hoặc link bài hát để tìm kiếm.`)
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
