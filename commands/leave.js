module.exports = {
  name: 'thoat',
  aliases: ['move', 'leave', 'thoát'],
  run: async (client, message) => {
    client.distube.voices.leave(message)
  }
}
