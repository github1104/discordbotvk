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
    }
}