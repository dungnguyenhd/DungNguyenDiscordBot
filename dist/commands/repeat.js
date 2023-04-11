module.exports = {
  name: 'goighostl',
  aliases: ['goighostl'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.success} | <@${'797864861987766294'}>`)
    else return message.channel.send(`<@${'797864861987766294'}> `+string)
  }
}
