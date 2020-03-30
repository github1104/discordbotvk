module.exports = {
    name:"ping",
    category:"info",
    description:'Returns latency and API ping',
    cooldown: 5,
    run: async (client,message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms`)
    },
}