const { CommandInteraction, Client } = require("discord.js");
const { commandBuilder } = require("discordjsh");

module.exports = {
    devOnly: true, //devOnly sets it to be in your testing guild
    data: new commandBuilder()
    .setName(`test`)
    .setDescription(`Testing command`),
    /**
     * Executes the interaction.
     * @param {CommandInteraction} interaction The slash command.
     * @param {Client} client The discord client.
     */
    async execute(interaction, client){
        await interaction.reply({
            content: `⭐ Working!`,
            ephemeral: true
        });
    }
}