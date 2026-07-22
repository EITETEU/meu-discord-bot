require("dotenv").config();

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once("ready", async () => {
  console.log(`Bot online: ${client.user.tag}`);

  const canal = await client.channels.fetch(process.env.CHANNEL_ID);

  if (canal) {
    const { EmbedBuilder } = require("discord.js");

const regras = new EmbedBuilder()
.setColor("Red")
.setTitle("📜 Regras do Servidor")
.setDescription(`
・Respeitar todos que estão no servidor.
・Não pratique spam ou flood de mensagens.
・Utilizar os canais de forma adequada.
・Não enviar conteúdo ilegal ofensivo e/ou explícito.
・Não compartilhar informações sem consentimento.
・Proibido qualquer tipo de preconceito.
・Proibido discussões políticas e religiosas.
・Proibido o uso de contas secundárias (contas alt).
・Proibido farm de XP.
・Proibido jogar utilizando hack ou qualquer meio de vantagem.
`)
.setFooter({ text: "Leia as regras antes de participar!" });

canal.send({ embeds: [regras] });

  }
});

client.login(process.env.TOKEN);
