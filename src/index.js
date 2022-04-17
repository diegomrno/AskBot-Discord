const jsh = require("discordjsh"); //Require discordjsh
const Discord = require("discord.js"); //Require discord.js
const config = require("../config/config.json"); //Get bot config
const Modals = require("discord-modals"); //Import modal package

//Create a discordjsh client
const ClientBuilder = new jsh.Client({
    token: config.token,
    clientID: config.clientID,
    testGuildID: "699167004099084348"
})
.setCommandsDir("./src/utility/commands") //Set commands directory
.setContextDir("./src/utility/menus"); //Set context menus directory

//Create discord client
const client = ClientBuilder.create({
    intents: [
        "GUILDS"
    ],
    //...
});

Modals(client);

//No need to do `client.login()`