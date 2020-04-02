const { MessageEmbed } = require("discord.js");
const { promptMessage, getEmojiByName, getData } = require("../../functions.js");
const { stripIndents } = require("common-tags");


const fs = require("fs");

var thisUser;

const chooseArr = ["✌", "👊", "✋"];
module.exports = {
    name: "ott",
    category: "fun",
    description: 'oan tu ti ra cai j ra cai lon',
    usage: "ott",
    run: async (client, message, args) => {
        let currentLevel;
        let currentExp;
        //check user 
        if (listUser.filter(u => u.name === message.author.username).length < 1) {
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
                fs.readFile('./data/user.json', (err, data) => {
                    if (err) throw err;
                    listUser = JSON.parse(data);
                    currentLevel = 1;
                    currentExp = 0;
                })
            })
        } {
            listUser.filter(u => u.name === message.author.username).map(u => {
                currentLevel = u.level;
                currentExp = u.exp;
            })
        }
        //emo
        let emoWin = await getEmojiByName(client, '2923_MikuDab', 'emojiSever');
        let emoLose = await getEmojiByName(client, '7920_NakoWhy', 'emojiSever');
        let emoTie = await getEmojiByName(client, '4995_flying_stone', 'emojiSever');
        let emo = await getEmojiByName(client, '5156_PrinzEugenDeal', 'emojiSever');

        //define


        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ format: 'png' }))
            .setDescription(`how to win ${emo}`)
            .setTimestamp();
        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr, 1);
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();

        if (result === 'win') {
            console.log('win')
            embed
                .addField('+200exp', `${reacted} vs ${botChoice}`)
                .setDescription(stripIndents`**Win!** ${emoWin}`)
            m.edit(embed);
        } else if (result === 'lose') {
            console.log('lose')
            embed
                .addField('-50xp', `${reacted} vs ${botChoice}`)
                .setDescription(stripIndents`**Lose!** ${emoLose}`)
            m.edit(embed);
        } else {
            embed
                .addField('so lucky', `${reacted} vs ${botChoice}`)
                .setDescription(stripIndents`**Tie!** ${emoTie}`)
            m.edit(embed);
        }




        function getResult(me, clientChose) {
            if ((me === "✋" && clientChose === "👊") ||
                (me === "👊" && clientChose === "✌") ||
                (me === "✌" && clientChose === "✋")) {
                setUser(listUser, message, 'win', currentLevel, currentExp)

                return "win";
            } else if (me === clientChose) {
                return "tie"
            } else {
                setUser(listUser, message, 'lose', currentLevel, currentExp)
                return "lose";
            }
        }
    }
}

function setUser(user, message, result, currentLevel, currentExp) {
    user.map(u => {
        if (u.name === message.author.username) {
            if (result === 'win') {
                u.exp += 200;
                u.win += 1;
                u.winrate = parseInt(u.win * 100 / (u.win + u.lose))
                let expNeedToUp = listlevel.level.filter(l => l.level === currentLevel).map(l => l.exp) - currentExp
                let rank = listlevel.rank.filter(l => l.minLevel <= currentLevel && currentLevel < l.maxLevel).map(r => r.maxLevel)
                if (expNeedToUp <= 200) {
                    u.level += 1;
                    console.log('level up')
                    if (u.level > rank) {
                        let rankNew = listlevel.rank.filter(l => l.minLevel <= currentLevel && currentLevel < l.maxLevel).map(r => r.rank)
                        u.rank = rankNew
                        console.log('up rank')
                        const embed = new MessageEmbed()
                            .setColor(message.member.displayHexColor)
                            .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                            .setDescription(stripIndents`** Rank Up!**`)
                        message.channel.send(embed)
                    }
                    const embed = new MessageEmbed()
                        .setColor(message.member.displayHexColor)
                        .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ format: 'png', dynamic: true }))
                        .setDescription(stripIndents`** Level Up!**`)
                    message.channel.send(embed)
                }

            } else if (result === 'lose') {
                if (u.exp < 30) u.exp = 0;
                else u.exp -= 50;
                u.lose += 1;
                u.winrate = parseInt(u.win * 100 / (u.win + u.lose))
            }
            thisUser = u
            let data = JSON.stringify(user, null, 2)
            fs.writeFile('./data/user.json', data, (err) => {
                if (err) throw err;
                console.log("data written to file")
            })

        }
    })

}