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

    // Calculate the percentage of the year that has passed
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const yearLength = (new Date(now.getFullYear(), 11, 31) - start) / oneDay + 1; // Account for leap year
    const progress = (day / yearLength) * rectWidth;

    // Draw the green background color inside the rect, filling the calculated percentage of the width
    context.fillStyle = 'green';
    context.fillRect(rectX, rectY, progress, rectHeight);

    // Set up stroke style
    context.strokeStyle = 'black'; // Stroke color
    context.lineWidth = 8;         // Stroke width

    // Draw the stroke on top of the filled rectangles
    context.strokeRect(rectX, rectY, rectWidth, rectHeight);

    // Set up the font style for the text
    context.font = '40px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center'; // This will align the text centrally
    context.textBaseline = 'middle'; // This will align the text in the middle of the baseline

    // Calculate the position for the text
    const text = `${(day / yearLength * 100).toFixed(2)}% HAS PASSED FOR THIS YEAR`;
    const textX = canvas.width / 2; // This will center the text in the x-axis
    const textY = rectY + rectHeight + 48; // This will position the text 30 pixels below the rectangle

    // Draw the text
    context.fillText(text, textX, textY);


    context.font = '28px Arial';
    context.fillStyle = 'white';
    const keepItUpText = `asdasdasd`;
    const keepItUpTextX = canvas.width / 2;
    const keepItUpTextY = rectY + textY + 48;

    // Draw the text
    context.fillText(keepItUpText, keepItUpTextX, keepItUpTextY);

    try {
        // Convert canvas to buffer
        const buffer = canvas.toBuffer('image/png');
        // Create an attachment and send it
        const attachment = new AttachmentBuilder(buffer, { name: 'progress.png' });
        readyClient.channels.cache.get(DEV_CHANNEL).send({ files: [attachment] });
    } catch (error) {
        console.error('Error creating buffer:', error);
        readyClient.channels.cache.get(DEV_CHANNEL).send("An error occurred while creating the image.");
    }

    client.destroy();
});

client.login(token);
