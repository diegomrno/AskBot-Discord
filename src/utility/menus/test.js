const { ContextMenuInteraction, Client } = require("discord.js");
const { ContextMenuBuilder } = require("discord.js-util");

module.exports = {
    devOnly: true,
    data: new ContextMenuBuilder()
    .setName(`⭐ Test Menu`)
    .setType("MESSAGE"),
    /**
     * Executes the context menu interaction.
     * @param {ContextMenuInteraction} interaction The context menu.
     * @param {Client} client The discord.js client.
     */
    async execute(interaction, client){
        await interaction.reply({
            content: `You selected: ${interaction.options.getMessage("message").content}`, //Note: You need the intent to access message content in april
            ephemeral: true
        });
    }
}