const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv');

const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000;

dotenv.config();

app.listen(PORT, () => {
  console.log('Listening on port 3000...')
})

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('Js/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('Js/events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Js/commands/${file}`);

	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./Js/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('guildCreate', async guild => {
	console.log(`Joined a guild: ${guild.name} !`);
})

client.on('guildDelete', guild => {
	console.log(`Left a guild ${guild.name} !`);
})

client.login(process.env.DISCORD_TOKEN);