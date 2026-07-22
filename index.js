require("dotenv").config();

const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder 
} = require("discord.js");

const cron = require("node-cron");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


// Guarda a última mensagem enviada
let ultimaMensagem = null;


// Quando o bot ligar
client.once("clientReady", () => {
    console.log(`Bot online: ${client.user.tag}`);
});


// Mensagem automática todos os dias às 18:00
cron.schedule("* * * * *", async () => {

    console.log("Cron executou!");

    try {


        const canal = await client.channels.fetch("1529331723387801691");

        // Apaga mensagem antiga
        if (ultimaMensagem) {
            try {
                await ultimaMensagem.delete();
            } catch {
                console.log("Mensagem antiga já foi apagada.");
            }
        }

        const embed = new EmbedBuilder()
            .setColor("#00ff88")
            .setTitle("💰 Nova oportunidade no servidor!")
            .setDescription(`
🚀 **Quer juntar uma grana enquanto chama seus amigos?**

Agora você pode ajudar o servidor a crescer e ainda ganhar uma recompensa por isso!

👥 **Como funciona?**

Cada convite válido que trouxer uma nova pessoa para o servidor vale:

💵 **R$ 0,10 por convite confirmado**

Chame seus amigos, monte sua equipe e aproveite essa oportunidade para juntar aquele dinheiro para um **AP com a galera**, comprar algo que você queria ou simplesmente guardar uma grana extra. 🔥

📊 Quer saber quantas pessoas você já trouxe?

Use o comando:

\`/invites\`

aqui neste canal e acompanhe seus convites.

⚠️ **Importante:** apenas convites reais e membros que permanecerem no servidor serão contabilizados.
`)
            .setFooter({
                text: "Obrigado por ajudar nossa comunidade a crescer ❤️"
            });

        ultimaMensagem = await canal.send({
            content: "@everyone",
            embeds: [embed],
            allowedMentions: {
                parse: ["everyone"]
            }
        });

        console.log("Mensagem diária enviada!");

    } catch(error) {
        console.log("Erro ao enviar mensagem:", error);
    }

});
