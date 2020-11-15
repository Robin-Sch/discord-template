require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require('./utils/register');

const client = new Client();
client.commands = new Collection();

(async () => {
	await loadCommands(client);
	await loadEvents(client);
	await client.login(process.env.TOKEN);
})();