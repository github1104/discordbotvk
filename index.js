const { Client, MessageEmbed, Collection } = require('discord.js');

const { prefix, token, tokenTest } = require('./config.json')
const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();


client.on("ready", () => {
    console.log('Bot is online! my name is' + client.user.username);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'YOU',
            type: 'WATCHING'
        }
    })
});

client.on("message", async message => {

    if (!message.guild) return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        try {
            const msg = await message.channel.send(' Pinging...');

            msg.edit(`Pong!\nPing is ${Math.floor(msg.createdAt - message.createdAt)}ms`);
        } catch (error) {
            console.log(error)
        }
    }

    if (cmd === "say") {

        if (!args.length)
            return message.reply("Nothing to say?").then(m => m.delete(5000));
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setColor(roleColor)
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setImage(client.user.displayAvatarURL())
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            message.channel.send(embed);
        }

    }

    if (cmd === "server") {
        message.channel.send(`This server is : ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }

});

client.login(token);