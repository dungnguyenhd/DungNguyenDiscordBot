require('dotenv').config();
const { ActivityType } = require('discord.js');
const cron = require('cron');
const { DisTube } = require('distube');
const { Manager } = require("erela.js");
const nodes = [
  {
    host: "node1.kartadharta.xyz",
    password: "kdlavalink",
    port: 443,
    secure: true
  }
];

const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildPresences
  ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

//
client.manager = new Manager({
  // The nodes to connect to, optional if using default lavalink options
  nodes,
  // Method to send voice data to Discord
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
    if (guild) guild.shard.send(payload);
  }
});

// Emitted whenever a node connects
client.manager.on("nodeConnect", node => {
  console.log(`Node "${node.options.identifier}" kết nối thành công.`)
})

// Emitted whenever a node encountered an error
client.manager.on("nodeError", (node, error) => {
  console.log(`Node "${node.options.identifier}" lỗi mẹ rồi: ${error.message}.`)
})

// THIS IS REQUIRED. Send raw events to Erela.js
client.on("raw", d => client.manager.updateVoiceState(d));
//
//

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Không tìm thấy yêu cầu!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Không tìm thấy yêu cầu!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} you wanna play lét play.`)
});

client.once("ready", () => {
  console.log(`Online as ${client.user.tag}`);

  const options = [
    {
      type: ActivityType.Watching,
      text: "master Dung Nguyen working",
      status: "idle"
    },
    {
      type: ActivityType.Listening,
      text: "commands",
      status: "online"
    },
    {
      type: ActivityType.Playing,
      text: "music for master",
      status: "idle"
    },
    {
      type: ActivityType.Competing,
      text: "Ycomm Hanoi",
      status: "dnd"
    },
    {
      type: ActivityType.Streaming,
      text: "update core system",
      status: "dnd"
    },
  ];

  setInterval(() => {
    const option = Math.floor(Math.random() * options.length);
    client.user.setPresence({
      activities: [{
        name: options[option].text,
        type: options[option].type
      }],
      status: options[option].status
    });
  }, 10 * 10000);

  let scheduledMessage = new cron.CronJob('00 15 03 * * *', () => {
    let now = new Date().getTime();
    let countDownDate = new Date("Feb 2,2025 5:00:00").getTime();
    let timeleft = countDownDate - now;

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    const guild = client.guilds.cache.get('797845913774981181');
    const channel = guild.channels.cache.get('797845914324041769');
    channel.send(`Đếm ngày xa Linh: còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
  });

  // When you want to start it, use:
  scheduledMessage.start();
});

// client.on('presenceUpdate', async (oldPresence, newPresence) => {
//   try {
//     if ((!oldPresence || oldPresence.status === 'offline') && newPresence.status === 'online' && newPresence.userId !== '951496858323267614') {
//       if (newPresence.userId === '797864861987766294') {
//           const string = [
//             `Chào Linh nhá`,
//             `<@${newPresence.userId}> good to see you!`,
//             `Cyka blyat <@${newPresence.userId}>`,
//             `Daijoubu <@${newPresence.userId}>`,
//           ];
//           const randomIndex = Math.floor(Math.random() * string.length);
//           const randomString = string[randomIndex];
//         channel.send(randomString);
//       }
//     }
//   }
//   catch (error) {
//     console.log(error);
//   }
// });

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${client.emotes.error} | Bạn phải trong một kênh voice!`)
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Lỗi: \`${e}\``)
  }
})

const status = queue =>
  `Âm lượng: \`${queue.volume}%\` | Lọc: \`${queue.filters.names.join(', ') || 'Off'}\` | Lặp: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Hàng đợi' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.play} | Bật \`${song.name}\` - \`${song.formattedDuration}\`\nYêu cầu bởi ngài: ${song.user
      }\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | Thêm ${song.name} - \`${song.formattedDuration}\` vào hàng đợi bởi ${song.user}`
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Thêm \`${playlist.name}\` playlist (${playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`${client.emotes.error} | Lỗi mẹ rồi: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send('Không ai trong talk cả! Rời khỏi talk...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} Không tìm thấy kết quả \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Hết !'))
client.login(process.env.TOKEN)