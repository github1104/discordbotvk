const { Client, MessageEmbed, Collection } = require('discord.js');
const { prefix } = require('./config.json')
const fs = require("fs");
const listlevel = require("../../data/configlevel.json")
var listUser = require("../../data/user.json")
const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})


client.on("ready", () => {
    console.log('Bot is online! my name is' + client.user.username);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: '_h for help',
            type: 'PLAYING'
        }
    })

});


client.on("message", async message => {
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) {

        return
    };
    if(message.author.bot) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);


    // if (cmd === 'info') {
    //     console.log(48, message.author)
    //     fs.readFile('./data/user.json', (err, data) => {
    //         if (err) throw err;

    //         let user = JSON.parse(data);

    //         if (user.filter(u => u.name === message.author.username).length < 1) {
    //             user.push({
    //                 name: message.author.username,
    //                 level: 1,
    //                 exp: 0,
    //                 rank: 'Iron',
    //                 win: 0,
    //                 lose: 0
    //             })
    //             let data = JSON.stringify(user, null, 2)
    //             fs.writeFile('./data/user.json', data, (err) => {
    //                 if (err) throw err;
    //                 console.log("data written to file")
    //             })
    //         } else {
    //             user.map(u => {
    //                 if (u.name === message.author.username) {
    //                     u.exp += 25;
    //                     let data = JSON.stringify(user, null, 2)
    //                     fs.writeFile('./data/user.json', data, (err) => {
    //                         if (err) throw err;
    //                         console.log("data written to file")
    //                     })
    //                 }
    //             })
    //             console.log(65, user)
    //         }

    //     })
    // }
    // if (cmd === "level") {
    //     let level = {};
    //     fs.readFile('./data/configlevel.json', (err, data) => {
    //         if (err) throw err;
    //         let level = JSON.parse(data);
    //         for (i = 1; i <= 60; i++) {
    //             level.level.push({
    //                 level: i,
    //                 exp: 20 * i * (1 + i)
    //             })
    //         }

    //         const data1 = JSON.stringify(level, null, 2)
    //         fs.writeFile('./data/configlevel.json', data1, (err) => {
    //             if (err) throw err;
    //             console.log("data written to file")
    //         })
    //         console.log(89, level);
    //     })
    // };
})

client.login(process.env.BOT_TOKEN);