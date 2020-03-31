const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: 'Report a member',
    usage: '<mention | id>',
    run: async (client, message, args) => {
        if (message.deletable) message.delete({ timeout: 5000 });

        let rMember;
        if (message.mentions.users.size) {
            rMember = message.mentions.members.first();
        }

        console.log(15, rMember);
        if (!rMember)
            return message.reply("Couldn't find that person").then(m => m.delete({ timeout: 5000 }));

        if (rMember.user.bot || rMember.user.id === message.member.id)
            return message.reply("Can't report that member").then(m => m.delete({ timeout: 5000 }));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report!").then(m => m.delete({ timeout: 5000 }));

        const channel = message.guild.channels.cache.find(channel => channel.name === "reports-ban");

        if (!channel)
            return message.channel.send("I count not find a \`#report\` channel").then(m => m.delete({ timeout: 5000 }));

        const embed = new MessageEmbed()
            .setColor("#ffff00")
            .setTimestamp()
            .setThumbnail(rMember.user.displayAvatarURL({ format: 'png' }))
            .setFooter(message.guild.name, message.guild.iconURL({ format: 'png' }))
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
            .setDescription(stripIndents`**> Member:** ${rMember} (id: ${rMember.id})
            **> Reported by:** ${message.member} (id: ${message.member.id})
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    },
}