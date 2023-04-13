module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave', 's'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Không có bài hát nào đang phát!`)
    queue.stop()
    message.channel.send(`${client.emotes.success} | Dừng!`)
  }
}
