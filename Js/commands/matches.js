const { SlashCommandBuilder } = require('@discordjs/builders');
const HLTV = require('hltv-api').default;

const matchesEmbed = {
	color: 0x0049ff,
	title: 'Partidas de hoje',
	url: 'https://www.hltv.org/',
	author: {
		name: 'HLTV',
		icon_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4102e83a14a6b68a-profile_image-300x300.jpeg',
		url: 'https://www.hltv.org/',
	},
	fields: []
};

function createAllMatches(match, embed) {
    if (match['event']['name'] == '' || match['teams'][0]['name'] == ''|| match['teams'][0]['name'] == '') {
        return
    } else {
        embed.fields.push( {name: `${match['event']['name']} - ${match['map']}`, value: `${match['teams'][0]['name']} X ${match['teams'][1]['name']}`} );
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('matches')
		.setDescription('Replies with today next matches!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('return all today next matches!')
        ),
	async execute(interaction) {
	
        const matches = await HLTV.getMatches();

        console.log(matches[1]['time']);

        if (interaction.options.getSubcommand() === 'all') {
            matches.forEach(match => createAllMatches(match, matchesEmbed))

            await interaction.reply({ embeds: [matchesEmbed] });
        }
	},
};
