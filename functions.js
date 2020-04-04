const fs = require("fs");
module.exports = {
    getMember(message, toFind = '') {
        toFind = toFind.toLowerCase();
        let target = message.mentions.users.first();
        console.log(5, target)
        if (!message.mentions.users.size) {
            console.log(7, message.member);
            return message.member;
        } else if (message.mentions.users.size) {
            message.guild.members.fetch(target).then(member => {
                console.log(10, member)

            })
            return message.guild.members.fetch(target);
        }

    },

    formatDate: function (date) {
        return new Intl.DateTimeFormat('en-GB').format(date);
    },

    promptMessage: async function (message, author, time, validReactions, limit, mention) {
        time *= 1000;
        let filter;
        for (const reaction of validReactions) await message.react(reaction)
        if (!mention) {
            filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id
        } else {
            filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id || user.id === mention.id
        }


        return message
            .awaitReactions(filter, { max: limit, time: time })
            .then(collected => {
                let reacted = collected.map(e => e);
                let dataReact=[];
                reacted.map(r => {
                    let emoji = r.emoji.name;
                    let users = r.users.cache;
                    users.map(user => {
                        if (user === author || user === mention) {
                            let data = {emoji,user}
                            dataReact.push(data)
                        };
                    })
                })
                return dataReact;
            });
    },

    getEmojiByName: async function (client, emoji, server) {
        let emo = client.emojis.cache.filter(e => e.guild.name === server && e.id === emoji).map(e => e);
        if (emo.length < 1) emo = client.emojis.cache.filter(e => e.guild.name === server && e.name === emoji).map(e => e);
        return emo;
    },

    getData: async function (client, data) {
        console.log(data)
    }

}