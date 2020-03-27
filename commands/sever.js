module.exports = {
    name:'sever',
    description:'info sever',
    execute(message, args){
        message.channel.send(`This server is : ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nThe total number of users currently boosting this server: ${message.guild.premiumSubscriptionCount}`);

    },
}