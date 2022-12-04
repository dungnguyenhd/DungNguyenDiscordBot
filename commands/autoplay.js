module.exports = {
  name: 'chui',
  aliases: ['c'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send(`${client.emotes.success} | no one`)
    else return message.channel.send('Tôi năm nay hơn 70 tuổi chưa gặp cái trường hợp nào mà nó láo như ' + `<@${string}> ` + 'thế này cả')
  }
}