
module.exports = {
    name: 'setwel',
    description: 'set welcome message',
    cooldown: 5,
    args:true,
    usage: '<text>',
    execute(message, args) {
        message.channel.send('successful set welcome message');
    }
}