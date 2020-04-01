const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: 'kick a member',
    usage: '<mention | id>',
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.cache.find(c => c.name === "reports-ban") || message.channel;

        if (message.deletable) message.delete({ timeout: 5000 });
        //no mention
        if (!args[0]) {
            return message.reply("Please provide a person to kick")
                .then(m => m.delete({ timeout: 5000 }))
        }


        //no author permission
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ You do not have permission to kick members. Please contact a staff member")
                .then(m => m.delete({ timeout: 5000 }));
        }

        //no bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ I do not have permission to kick members. Please contact a staff member")
                .then(m => m.delete({ timeout: 5000 }));
        }

        //no reason
        if (!args[1]) {
            return message.reply("Please provide a reason to kick")
                .then(m => m.delete({ timeout: 5000 }))
        }

        const toKick = message.mentions.members.first();

        //No member found
        if (!toKick) {
            return message.reply("Couldn'n find that member,try again!")
                .then(m => m.delete({ timeout: 5000 }))
        }

        //Can't kick urself
        if (message.author.id === toKick.id) {
            return message.reply("Can't kick yourself, smartboiiii")
                .then(m => m.delete({ timeout: 5000 }))
        }

        //Kickable
        if (!toKick.kickable) {
            return message.reply("Can't kick that person due to role hierarchy,i suppose.")
                .then(m => m.delete({ timeout: 5000 }))
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL({ format: 'png' }))
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ format: 'png' }))
            .setTimestamp()
            .setDescription(stripIndents`**Kicked member:** ${toKick} (id: ${toKick.id}))
            **> Kicked by:** ${message.author} (${message.author.id})
            **> Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor("This verification becomes invalid after 60s")
            .setDescription(stripIndents`Vote to kick ${toKick}
            **> Kicked by:** ${message.author} 
            **> Reason:** ${args.slice(1).join(" ")}`);

        logChannel.send(promptEmbed).then(async msg => {
            await promptMessage(msg, message.author, 60, ["✅", "❌"]);
            let resultYes = 1;
            let resultNo = 1;
            
            for (let react of msg.reactions.cache) {
                console.log(77, react[0], react[1].count)
                if (react[0] === "✅") {
                    resultYes = react[1].count;
                } else if (react[0] === "❌") {
                    resultNo = react[1].count;
                }
            }
            const resultEmbed = new MessageEmbed()
                .setColor("#ff00ff")
                .setAuthor(`Result of vote kick ${toKick}`)
                .setDescription(stripIndents`✅: ${resultYes}
                ❌: ${resultNo}
                **> Result:** ${resultYes<resultNo ? "kick be canceled":"kicked member"}`)
                .setFooter(message.member.displayName, message.author.displayAvatarURL({ format: 'png' }))
            logChannel.send(resultEmbed);
            if (resultYes > resultNo) {
                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send("ops something went wrong")
                    })
                logChannel.send(embed);
            } else {
                message.reply("kick canceled...")
                    .then(m => m.delete({ timeout: 5000 }));
            }
            console.log(98, resultYes, resultNo)


        })


    }
}