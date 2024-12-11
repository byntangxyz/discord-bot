const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  StringSelectMenuBuilder,
} = require("discord.js");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const token = process.env.DISCORD_TOKEN;

// Membuat app Express
const app = express();
const port = process.env.PORT || 3000;

// Endpoint untuk menjaga server tetap hidup
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

// Menjalankan server Express
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const prefix = "b!";

client.once("ready", () => {
  console.log(`Bot ${client.user.tag} sudah online!`);
  client.user.setPresence({
    activities: [{ name: "b!help", type: 2 }], // "type: 2" untuk Listening
    status: "idle",
  });
});

client.on("messageCreate", (message) => {
  if (message.content === `${prefix}info`) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Bot Info")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: "BxGusFundz",
        iconURL: "https://bxlinks.vercel.app/logo.png",
        url: "https://discord.js.org/",
      })
      .setDescription(
        "Ini adalah bot Discord sederhana menggunakan Discord.js! aku dikembangkan oleh sang master king Bintang Maulana"
      )
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .addFields(
        { name: "Nama Bot", value: `${client.user.tag}`, inline: true },
        { name: "Prefix Command", value: "b!", inline: true },
        { name: "Library", value: "Discord.js", inline: true }
      )

      .setTimestamp()
      .setFooter({
        text: "Dibuat oleh Bintang",
        iconURL: "https://bxlinks.vercel.app/logo.png",
      });

    message.channel.send({ embeds: [embed] });
  }
  if (message.content === `${prefix}mc`) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Minecraft Bedrock Server")
      .setDescription("pvn1.lyeenstore.xyz:19156")
      .addFields(
        { name: "Current Status", value: "🟢 ONLINE", inline: true },
        { name: "Description", value: "Sever Telah Online!", inline: true }
      )

      .setTimestamp()
      .setFooter({
        text: `${client.user.tag}`,
        iconURL: "https://bxlinks.vercel.app/logo.png",
      });

    message.channel.send({ embeds: [embed] });
  }
  // Jangan balas pesan dari bot sendiri
  if (message.author.bot) return;
  const regex1 = /\bmakasi\b.*$/i;
  const regex2 = /\blogin\b.*$/i;

  if (message.content.toLowerCase().includes("halo")) {
    const responses = [
      "Hai, apa kabar? Semoga harimu menyenangkan ya! 😊",
      "Halo juga! Ada yang bisa aku bantu? 🌸",
      "Oh, hai~ Senang bertemu denganmu! ✨",
      "Halo! Jangan lupa istirahat yang cukup, ya! 💤",
      "Hai hai~ Kamu luar biasa hari ini! 😇",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    message.channel.send(randomResponse);
  } else if (regex1.test(message.content)) {
    const responses = [
      "Macama ganteng 😘",
      "Hehe makaci? makaci juga sayang 🤗",
      "makasih doang? aku maunya kamu suka aku 🥰",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    message.channel.send(randomResponse);
  } else if (regex2.test(message.content)) {
    const responses = [
      "Gass infokan permabaran",
      "Aku mau ikut, tapi aku sadar aku cuman bot:(",
      "cupu",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    message.channel.send(randomResponse);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === `${prefix}role`) {
    const button1 = new ButtonBuilder()
      .setCustomId("role_1")
      .setLabel("Cowo")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("👳‍♂️");

    const button2 = new ButtonBuilder()
      .setCustomId("role_2")
      .setLabel("Cewe")
      .setStyle(ButtonStyle.Success)
      .setEmoji("👩‍🦰");

    const row = new ActionRowBuilder().addComponents(button1, button2);

    await message.channel.send({
      content: "Pilih gender kamu:",
      components: [row],
    });
  }

  if (message.content.toLowerCase() === `${prefix}game`) {
    const button1 = new ButtonBuilder()
      .setCustomId("role_1")
      .setLabel("Cowo")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("👳‍♂️");

    const button2 = new ButtonBuilder()
      .setCustomId("role_2")
      .setLabel("Cewe")
      .setStyle(ButtonStyle.Success)
      .setEmoji("👩‍🦰");

    const row = new ActionRowBuilder().addComponents(button1, button2);

    await message.channel.send({
      content: "Pilih gender kamu:",
      components: [row],
    });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "role_1") {
    const roleHe = interaction.guild.roles.cache.find(
      (role) => role.name === "He/Him"
    );
    const roleShe = interaction.guild.roles.cache.find(
      (role) => role.name === "She/Her"
    );

    if (roleHe) {
      // Jika member sudah memiliki role "She/Her", hapus role tersebut
      if (interaction.member.roles.cache.has(roleShe.id)) {
        await interaction.member.roles.remove(roleShe);
      }

      // Tambahkan role "He/Him" jika belum ada
      if (!interaction.member.roles.cache.has(roleHe.id)) {
        await interaction.member.roles.add(roleHe);
        await interaction.reply({
          content: "Kamu telah memilih role cowo (He/Him)",
          ephemeral: true,
        });
      } else {
        await interaction.member.roles.remove(roleHe);
        await interaction.reply({
          content: "Kamu telah menghapus role cowo (He/Him)",
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: "Role He/Him tidak ditemukan!",
        ephemeral: true,
      });
    }
  }

  if (interaction.customId === "role_2") {
    const roleShe = interaction.guild.roles.cache.find(
      (role) => role.name === "She/Her"
    );
    const roleHe = interaction.guild.roles.cache.find(
      (role) => role.name === "He/Him"
    );

    if (roleShe) {
      // Jika member sudah memiliki role "He/Him", hapus role tersebut
      if (interaction.member.roles.cache.has(roleHe.id)) {
        await interaction.member.roles.remove(roleHe);
      }

      // Tambahkan role "She/Her" jika belum ada
      if (!interaction.member.roles.cache.has(roleShe.id)) {
        await interaction.member.roles.add(roleShe);
        await interaction.reply({
          content: "Kamu telah memilih role perempuan (She/Her)",
          ephemeral: true,
        });
      } else {
        await interaction.member.roles.remove(roleShe);
        await interaction.reply({
          content: "Kamu telah menghapus role perempuan (She/Her)",
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: "Role She/Her tidak ditemukan!",
        ephemeral: true,
      });
    }
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content === `${prefix}role2`) {
    // Membuat menu dropdown untuk memilih role
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("role_select")
        .setPlaceholder("Pilih game kamu!")
        .addOptions(
          {
            label: "Minecraft",
            value: "mc",
            emoji: "⛏",
          },
          {
            label: "Free Fire",
            value: "ff",
            emoji: "🏹",
          },
          {
            label: "Mobile Legend",
            value: "ml",
            emoji: "⚔",
          }
        )
    );

    await message.channel.send({
      content: "Pilih role game kamu dengan dropdown berikut:",
      components: [row],
    });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "role_select") {
    const selectedRole = interaction.values[0];
    let role;

    if (selectedRole === "mc") {
      role = interaction.guild.roles.cache.find((r) => r.name === "Minecraft");
    } else if (selectedRole === "ff") {
      role = interaction.guild.roles.cache.find((r) => r.name === "Free Fire");
    } else if (selectedRole === "ml") {
      role = interaction.guild.roles.cache.find(
        (r) => r.name === "Mobile Legend"
      );
    }

    if (role) {
      if (interaction.member.roles.cache.has(role.id)) {
        await interaction.member.roles.remove(role);
        await interaction.reply({
          content: `Role ${role.name} telah dihapus!`,
          ephemeral: true,
        });
      } else {
        await interaction.member.roles.add(role);
        await interaction.reply({
          content: `Role ${role.name} telah ditambahkan!`,
          ephemeral: true,
        });
      }
    } else {
      await interaction.reply({
        content: "Role tidak ditemukan!",
        ephemeral: true,
      });
    }
  }
});

// Login bot
client.login(token);
