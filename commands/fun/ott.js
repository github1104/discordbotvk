const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["✌", "👊", "✋"];
module.exports = {
    name: "ott",
    category: "fun",
    description: 'oan tu ti ra cai j ra cai lon',
    usage: "ott",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL({ format: 'png' }))
            .setDescription("lady first 🤞!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr, 1);
        console.log(19,reacted)
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
        
        const result = await getResult(reacted, botChoice);

        await m.reactions.removeAll();
        
        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);
        function getResult(me, clientChose) {
            if ((me === "✋" && clientChose === "👊") ||
                (me === "👊" && clientChose === "✌") ||
                (me === "✌" && clientChose === "✋")) {
                return "You win ＞﹏＜";
            }else if(me === clientChose){
                return "nice choice !"
            }else{
                return "You lose (￣_,￣ )";
            }
        }
    }
}