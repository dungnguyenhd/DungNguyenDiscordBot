module.exports = {
  name: 'tiep',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Không có bài hát nào đang trong hàng chờ!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Tiếp tục bài hát :)')
    } else {
      message.channel.send('Hàng đợi vẫn đang phát!')
    }
  }
}
