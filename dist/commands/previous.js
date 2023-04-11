module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Không có bài hát nào trong hàng chờ`)
    const song = queue.previous()
    message.channel.send(`${client.emotes.success} | Đang phát:\n${song.name}`)
  }
}
