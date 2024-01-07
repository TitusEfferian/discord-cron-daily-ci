
const { Client, Events, GatewayIntentBits, AttachmentBuilder, } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DEV_CHANNEL = process.env.DISCORD_BOT_DEV_CHANNEL;
const token = process.env.DISCORD_TOKEN;

client.once(Events.ClientReady, async readyClient => {
    // const canvas = Canvas.createCanvas(200, 200);
    // const context = canvas.getContext('2d');

    // // Draw a square
    // context.fillStyle = 'blue'; // Square color
    // context.fillRect(50, 50, 100, 100); // x, y, width, height

    // // Convert canvas to buffer
    // const buffer = canvas.toBuffer();

    // // Create an attachment and send it
    // const attachment = new AttachmentBuilder(buffer, { name: 'square.png' });

    readyClient.channels.cache.get(DEV_CHANNEL).send("hello world again");
    client.destroy();
});


client.login(token);