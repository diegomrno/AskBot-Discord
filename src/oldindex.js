const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Modals, TextInputComponent, showModal } = require('discord-modals')
const { token } = require('../config/config.json');
const config = require('../config/config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const jsh = require("discordjsh");

const ClientBuilder = new jsh.Client({
    token: config.token,
    clientID: config.clientID,
    testGuildID: "948668505757220864"
})
.setCommandsDir("./src/utility/commands") //Set commands directory
.setContextDir("./src/utility/menus");

const client = ClientBuilder.create({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
	]
}) 

Modals(client);
/*
const modal = new Modal()
	.setCustomId('customid')
	.setTitle('Nouvelle question')
	.addComponents(
		new TextInputComponent() // We create an Text Input Component
			.setCustomId('title')
			.setLabel('Titre de votre question')
			.setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
			.setMinLength(3)
			.setMaxLength(100)
			.setPlaceholder('De quoi parle votre question ?')
			.setRequired(true), // If it's required or not

		new TextInputComponent() // We create an Text Input Component
			.setCustomId('ask')
			.setLabel('Votre question')
			.setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
			.setMinLength(5)
			.setMaxLength(4000)
			.setPlaceholder('Expliquez votre question...')
			.setRequired(true) // If it's required or not
	);

const ChannelStream = client.channels.cache.get('964874917965352961') || client.channels.fetch('964874917965352961');

const data = new SlashCommandBuilder()
	.setName("ask")
	.setDescription("Ask something...")*/
/*
client.on('ready', async () => {
	await client.guilds.cache.get("853700541867098112").commands.create(data);
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const ChannelStream = client.channels.cache.get('964874917965352961') || client.channels.fetch('964874917965352961');
	const inputBuffer = interaction.options;

	/*const thread = await ChannelStream.threads.create({
		name: 'mod-talk',
		autoArchiveDuration: 20,
		type: 'GUILD_PRIVATE_THREAD',
		reason: 'Needed a separate thread for moderation',
	});*//*
	showModal(modal, {
		client: client, // The showModal() method needs the client to send the modal through the API.
		interaction: interaction // The showModal() method needs the interaction to send the modal with the Interaction ID & Token.
	})
});*/
client.login(token);