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

    promptMessage: async function(message,author,time, validReactions){
        time *= 1000;

        for(const reaction of validReactions) await message.react(reaction)

        const filter = (reaction,user) => validReactions.includes(reaction.emoji.name) && user.id === author.id

        return message
            .awaitReactions(filter,{max:100,time: time})
            .then(collected => {

                // collected.first() && collected.first().emoji.name
            });
    }
}