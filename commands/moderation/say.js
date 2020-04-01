const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: 'Says your input via bot',
    usage: "<input>",
    cooldown: 5,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("Nothing to say?").then(m => m.delete(5000));



        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({ format: 'png' }))
            .setDescription(args.join(" "))
            
        message.channel.send(embed);


    }
}