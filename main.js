// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, AttachmentBuilder, } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const DEV_CHANNEL = process.env.DISCORD_BOT_DEV_CHANNEL;
const token = process.env.DISCORD_TOKEN;

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, async readyClient => {
    // const canvas = Canvas.createCanvas(700, 250);
    // const context = canvas.getContext('2d');
    // // Select the font size and type from one of the natively available fonts
    // context.font = '60px sans-serif';

    // // Select the style that will be used to fill the text in
    // context.fillStyle = 'white';
    // context.fillText('hello world', 50, 50)

    // // Use the helpful Attachment class structure to process the file for you
    // const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    const canvas = Canvas.createCanvas(200, 200);
    const context = canvas.getContext('2d');

    // Draw a square
    context.fillStyle = 'blue'; // Square color
    context.fillRect(50, 50, 100, 100); // x, y, width, height

    // Convert canvas to buffer
    const buffer = canvas.toBuffer();

    // Create an attachment and send it
    const attachment = new AttachmentBuilder(buffer, { name: 'square.png' });
    // message.channel.send({ files: [attachment] });
    readyClient.channels.cache.get(DEV_CHANNEL).send({
        files:[attachment]
    });

    /**
     * how to end the operation and make this code exit?
     */
    client.destroy();
});

// Log in to Discord with your client's token
client.login(token);