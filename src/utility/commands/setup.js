const { MessageButton, Message } = require("discord.js");
const { CommandInteraction, Client } = require("discord.js");
const { commandBuilder } = require("discordjsh");
const { v4 } = require("uuid");
const { showModal, Modal, TextInputComponent, ModalSubmitInteraction } = require("discord-modals");
const DiscordModals = require("discord-modals");
const { Formatters } = require('discord.js');

module.exports = {
    data: new commandBuilder()
        .setName(`setup`)
        .setDescription(`Setup your ask button`),
    /**
     * Executes the interaction.
     * @param {CommandInteraction} interaction The slash command.
     * @param {Client} client The discord client.
     */
    async execute(interaction, client) {
        const CustomIds = {
            MODAL: `DISCORD_MODAL` + v4(),
            BUTTON: `EXECUTE_MODAL`
        }

        /**
         * @type {Message}
         */
        const SentMessage = await interaction.reply({
            content: `Posez *votre question ou exposez* votre problème **ici**, une équipe *vous répondra ultérieurement* !`,
            components: [
                {
                    type: 1,
                    components: [
                        new MessageButton()
                            .setCustomId(CustomIds.BUTTON)
                            .setLabel(`Nouvelle question`)
                            .setStyle("PRIMARY")
                    ]
                }
            ],
            fetchReply: true
        });

        await SentMessage.awaitMessageComponent({
            componentType: "BUTTON",
            filter: i => i.user.id == interaction.user.id
        }).then(async btn => {
            const modal = new Modal()
                .setCustomId('askmodal')
                .setTitle('Nouvelle question')
                .addComponents(
                    new TextInputComponent()
                        .setCustomId('title')
                        .setLabel('Titre de votre question')
                        .setStyle('SHORT')
                        .setMinLength(3)
                        .setMaxLength(100)
                        .setPlaceholder('De quoi parle votre question ?')
                        .setRequired(true),

                    new TextInputComponent()
                        .setCustomId('ask')
                        .setLabel('Votre question')
                        .setStyle('LONG')
                        .setMinLength(5)
                        .setMaxLength(4000)
                        .setPlaceholder('Expliquez votre question...')
                        .setRequired(true)
                );

            await showModal(modal, {
                client,
                interaction: btn
            });

            client.on("modalSubmit", async (modal) => {
                if (modal.customId === 'askmodal') {
                    const firstResponse = modal.getTextInputValue('ask')
                    modal.reply('Congrats! Powered by discord-modals.' + Formatters.codeBlock('markdown', firstResponse))
                }

            });
        });
    }
}