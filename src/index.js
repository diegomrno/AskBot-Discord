const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Importing Rest & api-types
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

//Loading Config
const config = require('../config/config.json');
console.log('Config Loaded');
var owners = config.owners;

client.on('ready', async () => {
	console.log(`${client.user.tag} is Ready!`);
});

client.login(config.token).catch(() => console.log('Invalid Token.Make Sure To Fill config.json'));