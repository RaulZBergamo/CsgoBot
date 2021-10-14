const { SlashCommandBuilder } = require('@discordjs/builders');
const HLTV = require('hltv-api').default

module.exports = {
	data: new SlashCommandBuilder()
		.setName('results')
		.setDescription('Replies with the results!')
        .addSubcommand(subcommand => 
            subcommand
                .setName('match_id')
                .setDescription('Search by match id !')    
                .addStringOption(option => option.setName('match_id').setDescription('Match id !'))
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('event_name')    
                .setDescription('Search by event name !') 
                .addStringOption(option => option.setName('event_name').setDescription('Event name !'))
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('team_name')
                .setDescription('Search by team name !') 
                .addStringOption(option => option.setName('team_name').setDescription('Team name!'))
        ),
	async execute(interaction) {
    
        const results = await HLTV.getResults();
        
        let matchesList = []
        let new_string = ''

        if (interaction.options.getSubcommand() === 'match_id') {
            const match_id = interaction.options.getString('match_id');

            for (let i = 0; i < results.length; i++) {
                if (results[i]['matchId'] === match_id) {
                    new_string = `${results[i]['event']} - ${results[i]['maps']}\n${results[i]['team1']['name']} ${results[i]['team1']['result']} X ${results[i]['team2']['result']} ${results[i]['team2']['name']}`;
                }  
            }

            await interaction.reply(new_string);

        } else if (interaction.options.getSubcommand() === 'event_name') {
            const event_name = interaction.options.getString('event_name');

            for (let i = 0; i < results.length; i++) {
                if (results[i]['event'] === event_name) {
                    new_string = `${results[i]['event']} - ${results[i]['maps']}\n${results[i]['team1']['name']} ${results[i]['team1']['result']} X ${results[i]['team2']['result']} ${results[i]['team2']['name']}`;
                    matchesList.push(`${new_string}\n`)
                }  
            }
            
            new_string = matchesList.reduce((acc, cur) => acc += `${cur}\n`, "");

            await interaction.reply(new_string);
        } else if (interaction.options.getSubcommand() === 'team_name') {
            const team = interaction.options.getString('team_name');

            for (let i = 0; i < results.length; i++) {
                if (results[i]['team1']['name'] === team || results[i]['team2']['name'] === team) {
                    new_string = `${results[i]['event']} - ${results[i]['maps']}\n${results[i]['team1']['name']} ${results[i]['team1']['result']} X ${results[i]['team2']['result']} ${results[i]['team2']['name']}`;
                    matchesList.push(`${new_string}\n`)
                }  
            }

            new_string = matchesList.reduce((acc, cur) => acc += `${cur}\n`, "");

            await interaction.reply(new_string);
        }
	},
};