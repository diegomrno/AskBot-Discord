const {
    Client,
    Intents,
    MessageActionRow,
    MessageButton,
} = require('discord.js');//Require discord.js
const config = require("../config/config.json"); //Get bot config
const language = require("../config/language.json")
const { Message } = require("discord.js");
const { v4 } = require("uuid");
const { showModal, Modal, TextInputComponent, ModalSubmitInteraction } = require("discord-modals");
const discordModals = require('discord-modals');
const { MessageEmbed } = require('discord.js');

//Create discord client
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})


discordModals(client);

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'EXECUTE_MODAL') {
            const modal = new Modal() // We create a Modal
                .setCustomId('modal')
                .setTitle('Poser une question')
                .addComponents([
                    await new TextInputComponent()
                        .setCustomId('title')
                        .setLabel('Titre de votre question/problème')
                        .setStyle('SHORT')
                        .setMinLength(4)
                        .setMaxLength(100)
                        .setPlaceholder('Votre titre')
                        .setRequired(true),
                    new TextInputComponent()
                        .setCustomId('ask')
                        .setLabel('Expliquez votre question/problème')
                        .setStyle('LONG')
                        .setMinLength(4)
                        .setMaxLength(4000)
                        .setPlaceholder('Votre problème...')
                        .setRequired(true),
                ]);

            await showModal(modal, {
                client,
                interaction,
            });

        };

    };

});

client.on('modalSubmit', async (modal) => {
    const channel = client.channels.cache.find(channel => channel.name === config.askchannel)
    if (modal.customId === 'modal') {
        const ask = modal.getTextInputValue('ask');
        const title = modal.getTextInputValue('title');

        const SentAskMessage = await channel.send({
            content: `**Une nouvelle question a été posée par **${modal.user.username}.`,
            fetchReply: true
        });

        const Embed = new MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle(`${title}`)
            .setURL('https://cdn.discordapp.com/attachments/706486471938408469/965351483304476682/Component_675.png')
            .setAuthor({ name: modal.user.username, iconURL: modal.user.avatarURL(), url: 'https://discord.js.org' })
            .setThumbnail('https://cdn.discordapp.com/attachments/706486471938408469/965351483304476682/Component_675.png')
            .addField(`${modal.user.username} a une nouvelle question :`, ask, true)
            .setTimestamp()
            .setFooter({ text: 'AskBOT', iconURL: 'https://cdn.discordapp.com/attachments/706486471938408469/965351483304476682/Component_675.png' });

        const thread = await channel.threads.create({
            name: `"${title}"`,
            autoArchiveDuration: 1440,
            reason: "f",
        });

        thread.send(`<@${modal.user.id}>**, voici votre thread ! Les helpers vous aiderons ; )**`)
        thread.send({ embeds: [Embed] });
        console.log(`[AskBOT]: New request : "${modal.user.username}" has been posted new ask about "${title}" in your ask channel`);
        modal.deferReply();
        modal.deleteReply();
    }

});

client.on("ready", async () => {
    const channel = client.channels.cache.find(channel => channel.name === config.triggerchannel)

    const CustomIds = {
        MODAL: `DISCORD_MODAL` + v4(),
        BUTTON: `EXECUTE_MODAL`
    }
    /**
     * @type {Message}
     */
    const SentMessage = await channel.send({
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
})

client.login(config.token);