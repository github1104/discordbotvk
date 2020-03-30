const { MessageEmbed } = require("discord.js");
module.exports = {
    name:"say",
    aliases:["bc","broadcast"],
    category: "moderation",
    description:'Says your input via bot',
    usage: "<input>",
    cooldown: 5,
    run: async (client,message, args) => {
        if (message.deletable) message.delete();

        if(args.length < 1)
        return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor;
    
        if(args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
            .setColor(roleColor)
            .setTimestamp()
            .setFooter(client.user.username,client.user.displayAvatarURL)

            message.channel.send(embed);
        }
        else{
            message.channel.send(args.join(" "));
        }
    }
}