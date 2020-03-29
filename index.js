const fs = require('fs');
const { Client, MessageEmbed, Collection } = require('discord.js');
const { prefix } = require('./config.json')
const client = new Client({
    disableEveryone: true
}); 

client.commands = new Collection();
const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns = new Collection();

for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

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
// member joinNout
var textWelcome = 'hello';
var textRemove = 'bye';
var textWelcome2 = '';
var textRemove2 = '';
client.on("guildMemberAdd", member => {
    client.channels.fetch('615758011742421004')
        .then(channel => {
            channel.send(`${textWelcome} <@${member.id}> ${textWelcome2}`);
        })
        .catch()
})

client.on("guildMemberRemove", member => {
    client.channels.fetch('615758011742421004')
        .then(channel => {
            channel.send(`${textRemove} <@${member.id}> ${textRemove2}`);
        })
        .catch()
})


client.on("message", async message => {

    if (!message.guild) return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();


    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));


    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;


    if (timestamps.has(message.author.id)) {

        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        if (now < expirationTime) {

            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }

    }

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }
    try {
        command.execute(message, args);
    } catch (err) {
        console.log(err)
    }

    if(command.args ){
        if(command.name === 'setwel'){
            textWelcome = message.content.slice(prefix.length).trim().replace('setwel ','');
            console.log(command.name)
        } 
        else if(command.name === 'setremove'){
            textRemove = message.content.slice(prefix.length).trim().replace('setremove ','');
            console.log(command.name)
        }
    }
    
});

client.login(process.env.BOT_TOKEN);