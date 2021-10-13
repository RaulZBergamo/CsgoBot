const { SlashCommandBuilder } = require('@discordjs/builders');
const HLTV = require('hltv-api').default

module.exports = {
	data: new SlashCommandBuilder()
		.setName('results')
		.setDescription('Replies with the results!')
        .addStringOption(option => option.setName('match_id').setDescription('Match id !')),
	async execute(interaction) {
    
        const results = await HLTV.getResults();
        const match_id = interaction.options.getString('match_id');

        let new_string = ''

        for (let i = 0; i < results.length; i++) {
            if (results[i]['matchId'] === match_id) {
                new_string = `${results[i]['event']} - ${results[i]['maps']}\n${results[i]['team1']['name']} ${results[i]['team1']['result']} X ${results[i]['team2']['result']} ${results[i]['team2']['name']}`;
            }  else  if (results[i]['matchId'] !== match_id) {
                // await interaction.reply({ content: `Deu algum erro bixu, juro que eu vou resovler !`, ephemeral: true })
            }
        }

        console.log(match_id);

        await interaction.reply(new_string)
	},
};