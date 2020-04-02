const { MessageEmbed } = require("discord.js");
const {getEmojiByName } = require('../../functions.js')

module.exports = {
    name: "emo",
    category: "info",
    description: 'pick emoji',
    usage: "<id emo>",
    cooldown: 5,
    run: async (client, message, args) => {
        if(!args[0]) return (await message.reply('write your name emoji')).delete({timeout:5000})

        if(args[0] === 'list'){
            let listemo = await client.emojis.cache.filter(e => e.guild.name === 'emojiSeverLol').map(e => e).join(" ");
            console.log(listemo)
            return message.channel.send(listemo);
        }

        // console.log(args[0].split(/:/))
        let emo = await getEmojiByName(client,args[0],'emojiSeverLol');

        if(emo.length < 1) return message.reply('Cant find that emoji')
        console.log(22,emo)
        return message.channel.send(emo);
    }
}