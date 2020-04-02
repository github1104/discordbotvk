const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getEmojiByName } = require('../../functions.js')

const fs = require("fs");
const listUser = require("../../data/user.json")
const listlevel = require("../../data/configlevel.json")
module.exports = {
    name: "rank",
    category: "fun",
    description: 'show info user',
    usage: "rank",
    run: async (client, message, args) => {
        const user = listUser.filter(u => u.name === message.author.username);
        let nameRank;
        let currentLevel;
        
        const level = listlevel.level;
        const rank = listlevel.rank;

        user.map(user => {
            nameRank = user.rank;
            currentLevel = user.level;
        })
        let expTotal = listlevel.level.filter(l => l.level === currentLevel).map(l => l.exp)
        console.log(18,expTotal)
        const emoRankDefault = await getEmojiByName(client,'Iron','emojiSeverLol')
        const emoRank = await getEmojiByName(client, nameRank, 'emojiSeverLol')
        //check user 
        if (user.length < 1) {
            listUser.push({
                name: message.author.username,
                level: 1,
                exp: 0,
                rank: 'Iron',
                win: 0,
                lose: 0,
                winrate: 0
            })
            let data = JSON.stringify(listUser, null, 2)
            fs.writeFile('./data/user.json', data, (err) => {
                if (err) throw err;
                console.log(" config user ")
            })
            const embed = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                .setDescription(stripIndents`** Level:** 1
                ** Exp:** 0
                ** Rank: ${emoRankDefault}** 
                ** W/L:** 0/0`)

            message.channel.send(embed);
        } else {
            const user = listUser.filter(u => u.name === message.author.username);

            user.map(user => {

                const embed = new MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                    .setDescription(stripIndents`** Level:** ${user.level}
                ** Exp:** ${user.exp}xp/${expTotal}xp
                ** Rank: ${emoRank}** 
                ** W/L:** ${user.win}/${user.lose}
                ** Winrate:** ${user.winrate}%`)

                message.channel.send(embed);
            })

        }


    }
}