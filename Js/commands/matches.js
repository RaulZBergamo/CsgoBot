const { SlashCommandBuilder } = require('@discordjs/builders');
const HLTV = require('hltv-api').default;

const matchesEmbed = {
	color: 0x2b6ea4,
	title: 'Partidas de hoje',
	url: 'https://www.hltv.org/',
	author: {
		name: 'HLTV',
		icon_url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4102e83a14a6b68a-profile_image-300x300.jpeg',
		url: 'https://www.hltv.org/',
	},
    thumbnail: {
		url: 'https://play-lh.googleusercontent.com/chI-8vX4CIbO-pm14tb5UAjip20CwmytQPdz8sBmqNjPqTp1tptpBOZc-aGyYqDesw',
	},
	fields: [],
    footer: {
		text: 'Half-Life TV Unofficial.',
	},
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
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('team_name')
                .setDescription('Search a especific team next matches!')
                .addStringOption(option => option.setName('team_name').setDescription('Enter team name').setRequired(true))    
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('event_name')
                .setDescription('Search all the matches for a specific event!')    
                .addStringOption(option => option.setName('event_name').setDescription('Enter event name').setRequired(true))
        ),
	async execute(interaction) {
	
        const matches = await HLTV.getMatches();

        matchesEmbed.fields = [];
        matchesEmbed.title = 'Partidas de hoje';
        matchesEmbed.thumbnail.url = 'https://play-lh.googleusercontent.com/chI-8vX4CIbO-pm14tb5UAjip20CwmytQPdz8sBmqNjPqTp1tptpBOZc-aGyYqDesw';

        if (interaction.options.getSubcommand() === 'all') {
            matches.forEach(match => createAllMatches(match, matchesEmbed))

            await interaction.reply({ embeds: [matchesEmbed] });
        } else if (interaction.options.getSubcommand() === 'team_name') {

            const team = interaction.options.getString('team_name');

            for (let i = 0; i < matches.length; i++) {
                if (team.replace(/ /g, '').toUpperCase() === matches[i]['teams'][0]['name'].replace(/ /g, '').toUpperCase() || team.replace(/ /g, '').toUpperCase() === matches[i]['teams'][1]['name'].replace(/ /g, '').toUpperCase()) {
                    createAllMatches(matches[i], matchesEmbed);
                    matchesEmbed.thumbnail.url = matches[i]['event']['crest']
                    if (team.replace(/ /g, '').toUpperCase() === matches[i]['teams'][0]['name'].replace(/ /g, '').toUpperCase()) {
                        matchesEmbed.title = `Proximas partidas - ${matches[i]['teams'][0]['name']}`
                    } else {
                        matchesEmbed.title = `Proximas partidas - ${matches[i]['teams'][1]['name']}`
                    }
                } 
            }

            await interaction.reply({ embeds: [matchesEmbed] });

        } else if (interaction.options.getSubcommand() === 'event_name') {

            const event = interaction.options.getString('event_name');

            for (let i = 0; i < matches.length; i++) {
                if (event.replace(/ /g, '').toUpperCase() === matches[i]['event']['name'].replace(/ /g, '').toUpperCase()) {
                    createAllMatches(matches[i], matchesEmbed);
                    matchesEmbed.thumbnail.url = matches[i]['event']['crest']
                    matchesEmbed.title = `Proximas partidas para ${matches[i]['event']['name']}`
                } 
            }

            await interaction.reply({ embeds: [matchesEmbed] });

        }
	},
};
