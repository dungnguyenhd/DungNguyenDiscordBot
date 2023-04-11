module.exports = {
  name: 'dung',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Không có bài hát nào đang trong hàng chờ!`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send('Tiếp tục bài hát :)')
    }
    queue.pause()
    message.channel.send('Tạm dừng bài hát :)')
  }
}
