module.exports = {
    name:'kick',
    description:'Kick a user from the server.',
    usage: '<user>',
    args:true,
    guildOnly: true,
    execute(message, args){
        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!');
        }
        if(!message.mentions.users.size){
            return message.reply('You need to tag a user in order to kick them!');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
}