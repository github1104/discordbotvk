module.exports = {
    name: 'setremove',
    description: 'set remove message',
    cooldown: 5,
    args:true,
    usage: '<text>',
    execute(message, args) {
        message.channel.send('successful set remove message');
    }
}