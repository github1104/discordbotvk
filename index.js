const { Client, MessageEmbed, Collection } = require('discord.js');
const { prefix } = require('./config.json');
const fs = require("fs");
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
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client,message,args);
    
});

client.login(process.env.BOT_TOKEN);