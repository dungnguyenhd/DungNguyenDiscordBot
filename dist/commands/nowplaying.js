module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'dangbatgiday'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Không có bài hát nào trong hàng đợi!`)
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | Đang bật **\`${song.name}\`**, bởi ${song.user}`)
  }
}
