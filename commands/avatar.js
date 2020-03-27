const { Client, MessageEmbed, Collection } = require('discord.js');
module.exports = {
    name: 'avatar',
    description: 'avatar',
    aliases: ['icon', 'pfp'],
    execute(message, args) {

        const avatarList = message.mentions.users.map(user => {
            return new MessageEmbed()
                .setImage(user.displayAvatarURL({format: "png", dynamic: true}))
    
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    },
}