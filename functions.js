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

    promptMessage: async function(message,author,time, validReactions,limit){
        time *= 1000;

        for(const reaction of validReactions) await message.react(reaction)

        const filter = (reaction,user) => validReactions.includes(reaction.emoji.name) && user.id === author.id

        return message
            .awaitReactions(filter,{max:limit,time: time})
            .then(collected => {                
                return collected.first() && collected.first().emoji.name
            });
    },

    getEmojiByName: async function(client,emoji,server){
        let emo = client.emojis.cache.filter(e => e.guild.name === server && e.id === emoji ).map(e=>e) 
            || client.emojis.cache.filter(e => e.guild.name === server && e.name === name ).map(e=>e) 
        return emo;
    }
}