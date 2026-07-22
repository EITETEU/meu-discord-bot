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

    try {

        const canal = await client.channels.fetch(1529331723387801691);

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
🚀 **Quer juntar uma grana enquanto joga com seus amigos?**

Tem uma nova oportunidade para todos do servidor!

👥 Convide seus amigos e ajude nossa comunidade a crescer.

💵 **Cada convite válido vale R$0,10**

Chame seus amigos para entrar, jogar e participar do servidor.

Esse dinheiro pode ajudar naquele **AP com a galera**, comprar algo que você queria ou simplesmente guardar uma renda extra. 🔥

📊 Quer saber quantas pessoas você já convidou?

Use:

\`/invites\`

⚠️ Apenas convites reais serão contabilizados.
            `)
            .setFooter({
                text: "Obrigado por fortalecer nossa comunidade ❤️"
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



client.login(process.env.TOKEN);

