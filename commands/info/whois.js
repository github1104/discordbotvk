const { getMember, formatDate } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: 'Returns user information',
    usage: "[username | id, | mentions]",
    run: async (client, message, args) => {
        const member = await getMember(message, args.join(" "));

        console.log(14,member)
        // Member variables
        const joined = formatDate(member.joinedAt);

        const roles = member.roles.cache;
        let roleMember = [];
        roles.map(r => {
            roleMember.push(r.name)
        })
        roleMember.join(", ");
        console.log(24, member.user.presence.activities.toString())

        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
            .setColor(member.displayHexColor)
            .addField('Sơ yếu lí lịch', stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roleMember}`, true)
            .addField('User informtions', stripIndents`**> ID:** ${member.user.id}
            **> Discord Tag:** ${member.user.tag}
            **> Created at:** ${created}`)
            .setTimestamp()


        if (member.user.presence.activities) {

            embed.addField(`Currently playing `, `**> Name:** ${member.user.presence.activities.toString()}`);
        }
        message.channel.send(embed);
    }

}