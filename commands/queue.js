module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Không có gì để bật cả!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Đang phát:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`)
  }
}
