import { Client, Events } from 'discord.js';

export default {
	name: Events.ClientReady,
	once: true,

	execute(client: Client) {
		console.log(`[READY] ${client.user?.tag} is up and ready to go!`);
		console.log(
			`[READY] ${client.guilds.cache.size} servers, ${client.users.cache.size} members`
		);
	},
};
