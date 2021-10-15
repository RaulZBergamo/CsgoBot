const { SlashCommandBuilder } = require('@discordjs/builders');
const HLTV = require('hltv-api').default

module.exports = {
	data: new SlashCommandBuilder()
		.setName('player')
		.setDescription('Replies with Player info!'),
	async execute(interaction) {
		
        const playersResponse = await HLTV.getStatsByMatchId();

        console.log(playersResponse);

	},
};
