const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const express = require("express");
const app = express();

const token = process.env.TOKEN; // variável no Railway

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Quando o bot estiver online
client.once("ready", () => {
  console.log(`🤖 Bot online como ${client.user.tag}`);
});

// Captura comandos
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("+")) return;

  const log = `${message.author.tag} usou o comando: ${message.content}\n`;
  fs.appendFileSync("comandos.txt", log, "utf8");
});

// API para ler o arquivo comandos.txt
app.get("/", (req, res) => {
  res.send("LuckBot API está rodando.");
});

app.get("/comandos", (req, res) => {
  const dados = fs.readFileSync("comandos.txt", "utf8");
  res.type("text").send(dados);
});

// Porta padrão Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🌐 API online na porta ${PORT}`));

client.login(token);
