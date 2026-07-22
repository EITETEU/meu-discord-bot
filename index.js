require("dotenv").config();

// IMPORTAÇÕES
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const cron = require("node-cron");


// CRIA O BOT
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});


// QUANDO O BOT LIGAR
client.once("clientReady", () => {
  console.log(`Bot online: ${client.user.tag}`);
});


// MENSAGEM TODO DIA 18:00
cron.schedule("0 18 * * *", async () => {



  const canal = await client.channels.fetch("1529331723387801691");

  const embed = new EmbedBuilder()
    .setColor("#00ff88")
    .setTitle("💰 Nova oportunidade no servidor!")
    .setDescription(`
🚀 Quer juntar uma grana enquanto se diverte?

Agora você pode ajudar o servidor e ainda ganhar uma recompensa!

👥 Cada convite válido:
💵 **R$ 0,10**

Chame seus amigos para participar, jogar junto e fortalecer nossa comunidade.

📊 Para saber quantas pessoas você convidou:
\`/invites\`

🔥 Quanto mais amigos você trouxer, maior sua recompensa!
    `);

  canal.send({
    content: "@everyone",
    embeds: [embed],
    allowedMentions: {
      parse: ["everyone"]
    }
  });

});


// LOGIN DO BOT
client.login(process.env.TOKEN);
