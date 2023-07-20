import 'dotenv/config.js';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, any>;
		categories: Collection<string, any>;
	}
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands: any = [];

(async () => {
	client.commands = new Collection();
	client.categories = new Collection();

	const commandFiles = await readdir(join(__dirname, './commands'));
	for (const file of commandFiles) {
		const command = (await import(`./commands/${file}`)).default;
		commands.push(command.data.toJSON());

		client.commands.set(command.data.name, command);
		if (client.categories[command.category])
			client.categories[command.category].push(command.data.name);
		else client.categories[command.category] = [command.data.name];
	}

	const eventFiles = await readdir(join(__dirname, './events'));
	for (const file of eventFiles) {
		const event = (await import(`./events/${file}`)).default;
		client.on(event.name, (...args) => event.execute(...args));
	}
})();

client.on('ready', async () => {
	await client.application?.commands.set([]);
	await client.application?.commands.set(commands);
});

client.login(process.env.BOT_TOKEN);
