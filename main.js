const { Client, Events, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DEV_CHANNEL = process.env.DISCORD_BOT_DEV_CHANNEL;
const token = process.env.DISCORD_TOKEN;

client.once(Events.ClientReady, async readyClient => {
    const canvas = Canvas.createCanvas(1000, 500);
    const context = canvas.getContext('2d');

    // Fill the background with a neutral color for text contrast
    context.fillStyle = 'grey';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set up the font style for the text
    context.font = '60px sans-serif';
    context.fillStyle = 'black';
    context.textAlign = 'center';

    // Draw the text in the center of the canvas
    const text = 'HELLO WORLD';
    const textX = canvas.width / 2;
    const textY = canvas.height / 2;
    context.fillText(text, textX, textY);

    try {
        // Convert canvas to buffer
        const buffer = canvas.toBuffer('image/png');
        // Create an attachment and send it
        const attachment = new AttachmentBuilder(buffer, { name: 'text-test.png' });
        readyClient.channels.cache.get(DEV_CHANNEL).send({ files: [attachment] });
    } catch (error) {
        console.error('Error creating buffer:', error);
        readyClient.channels.cache.get(DEV_CHANNEL).send("An error occurred while creating the image.");
    }

    client.destroy();
});

client.login(token);
