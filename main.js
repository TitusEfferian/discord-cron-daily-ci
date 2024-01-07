const { Client, Events, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DEV_CHANNEL = process.env.DISCORD_BOT_DEV_CHANNEL;
const token = process.env.DISCORD_TOKEN;

client.once(Events.ClientReady, async readyClient => {
    const canvas = Canvas.createCanvas(1000, 500);
    const context = canvas.getContext('2d');

    // Fill the background to ensure text contrast
    context.fillStyle = 'grey'; // Use a neutral color for the background
    context.fillRect(0, 0, canvas.width, canvas.height);

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
    const start = new Date(now.getFullYear(), 0, 1); // Start from January 1st
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    const yearLength = (new Date(now.getFullYear() + 1, 0, 1) - start) / oneDay; // Days in year
    const progress = (day / yearLength) * rectWidth;

    // Draw the green background color inside the rect, filling the calculated percentage of the width
    context.fillStyle = 'green';
    context.fillRect(rectX, rectY, progress, rectHeight);

    // Set up stroke style
    context.strokeStyle = 'black'; // Stroke color
    context.lineWidth = 8; // Stroke width

    // Draw the stroke on top of the filled rectangles
    context.strokeRect(rectX, rectY, rectWidth, rectHeight);

    // Set up the font style for the text
    context.font = '20px Arial';
    context.fillStyle = 'black'; // Ensure text color contrasts with background
    context.textAlign = 'center'; // Align the text centrally
    context.textBaseline = 'middle'; // Align the text in the middle of the baseline

    // Calculate the position for the text
    const text = `${(day / yearLength * 100).toFixed(2)}% HAS PASSED FOR THIS YEAR`;
    const textX = canvas.width / 2; // Center the text in the x-axis
    const textY = rectY + rectHeight + 50; // Position the text 50 pixels below the rectangle

    // Draw the text
    context.fillText(text, textX, textY);

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
