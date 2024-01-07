const { Client, Events, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DEV_CHANNEL = process.env.DISCORD_BOT_DEV_CHANNEL;
const token = process.env.DISCORD_TOKEN;

client.once(Events.ClientReady, async readyClient => {
    const canvas = Canvas.createCanvas(1000, 500);
    const context = canvas.getContext('2d');

    // Coordinates and dimensions for the rectangle
    const rectX = 50;
    const rectY = (canvas.height / 2) - 25;
    const rectWidth = canvas.width - 100;
    const rectHeight = 80;

    // Draw a white rectangle
    context.fillStyle = 'white';
    context.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Draw the green background color inside the rect, filling only 50% of the width
    context.fillStyle = 'green';
    context.fillRect(rectX, rectY, rectWidth / 2, rectHeight);

    // Set up stroke style
    context.strokeStyle = 'black'; // Stroke color
    context.lineWidth = 8;         // Stroke width

    // Draw the stroke on top of the filled rectangles
    context.strokeRect(rectX, rectY, rectWidth, rectHeight);

    try {
        // Convert canvas to buffer
        const buffer = canvas.toBuffer('image/png');
        // Create an attachment and send it
        const attachment = new AttachmentBuilder(buffer, { name: 'square.png' });
        readyClient.channels.cache.get(DEV_CHANNEL).send({ files: [attachment] });
    } catch (error) {
        console.error('Error creating buffer:', error);
        readyClient.channels.cache.get(DEV_CHANNEL).send("An error occurred while creating the image.");
    }

    client.destroy();
});

client.login(token);
