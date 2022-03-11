const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

// IDK if that's enough

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hunter_exam')
		.setDescription('Begins the process of Hunter Exam'),

        async execute  (interaction )  {
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('Proceed_yes')
                .setLabel('Proceed')
                .setStyle('PRIMARY')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('Proceed_nah')
                .setLabel('Leave')
                .setStyle('SECONDARY')
            )

            const initial = await interaction.reply({
                content: "The Hunter Exam is an event which an applicant must pass in order to become a Hunter, an elite member of humanity and a part of the Hunter Association. These exams consist of several tests and stages which can vary drastically. Thus far, 289 Hunter Exams have taken place.[1] The Head of the Exam Commission is the Chairman of the Hunter Association themselves. Do you wish to participate?",
                components: [row],
                fetchReply: true
            })
// Making Buttons for registration

        const filter = i => {
            i.deferUpdate()
            return i.user.id === interaction.user.id};

// Applying filter

            const collector = initial.createMessageComponentCollector({ filter, time: 15000 });


            collector.on('collect', async i => {
	        if (i.customId === 'Proceed_yes') {
		  
		    
		    await interaction.editReply({ content: 'A button was clicked!' });
	       }
        });

// deferring collection cuz discord probs

            collector.on('end', async (collected) => {
            collected.forEach((click) => {
            console.log(click.user.id , click.customId)
            console.log(`Collected ${collected.size} items`)
        })

            if( collected.first()?.customId === 'Proceed_yes' ){

            await interaction.editReply({
                content: 'You have successfully registered for the Hunter Exam.'
             })
            }
            else await interaction.editReply({
                content: 'You did not register for the hunter exam.'
        })
// This will reply to button interaction.
     })
   }
}
