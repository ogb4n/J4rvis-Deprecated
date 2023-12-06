const fs = require("node:fs");
const path = require("node:path");
const Database = require('better-sqlite3');
const { Client, Partials, Collection, Events, GatewayIntentBits, Guild, GuildMember, ActivityType } = require("discord.js");
const { ReactionRole } = require("discordjs-reaction-role");
const { channel } = require("node:diagnostics_channel");

const db = new Database("whitelist.sqlite");
require("dotenv").config();


// CLIENT JARVIS
const client = new Client({
	partials: [Partials.Message, Partials.Reaction],
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildMessageReactions,
	],
});

const eth_pricebot = new Client({
	partials: [Partials.Message, Partials.Reaction],
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildMessageReactions,
	],
});

const sol_pricebot = new Client({
	partials: [Partials.Message, Partials.Reaction],
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildMessageReactions,
	],
});

const btc_pricebot = new Client({
	partials: [Partials.Message, Partials.Reaction],
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildMessageReactions,
	],
});

const xmr_pricebot = new Client({
	partials: [Partials.Message, Partials.Reaction],
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildMessageReactions,
	],
});


eth_pricebot.once(Events.ClientReady, () => {
	console.log(`Logged in as ${eth_pricebot.user}!`);
});

btc_pricebot.once(Events.ClientReady, () => {
	console.log(`Logged in as ${btc_pricebot.user}!`);
});

sol_pricebot.once(Events.ClientReady, () => {
	console.log(`Logged in as ${sol_pricebot.user}!`);
});

xmr_pricebot.once(Events.ClientReady, () => {
	console.log(`Logged in as ${sol_pricebot.user}!`);
});



// Reaction Role Manager
const rr = new ReactionRole(client, [
	{ messageId: process.env.ROLE_MESSAGE_ID, reaction: "🕵️‍♀️", roleId: process.env.ROLE_CYBER},
	{ messageId: process.env.ROLE_MESSAGE_ID, reaction: "🛠️", roleId: process.env.ROLE_ADMINSYS},
	{ messageId: process.env.ROLE_MESSAGE_ID, reaction: "🧑‍💻", roleId: process.env.ROLE_DEVELOPPEUR},
	{ messageId: process.env.ROLE_MESSAGE_ID, reaction: "🧑‍🎓", roleId: process.env.ROLE_STUDENT},
	{ messageId: process.env.ROLE_MESSAGE_ID, reaction: "🤵", roleId: process.env.ROLE_AUTRE},
  ]);


// function fetchinfos(url, cryptoToken) {
// 	fetch(url).then(crypto_response => crypto_response.json()).then(data => {
// 		let crypto_price = data.weightedAvgPrice;
// 		let crypto_price_change = parseFloat(data.priceChangePercent);
// 		console.log(cryptoToken + cryptoprice_change);
// 		crypto_price = parseFloat(crypto_price).toFixed(0);
// 	})
// }

function UpdatePrice() {

	//const channel_btc = client.channels.cache.get(process.env.CHANNEL_BITCOIN);
	fetch(process.env.BTC_URL).then(btc_response => btc_response.json()).then(data => {
		let btc_price = data.weightedAvgPrice;
		let price_change = parseFloat(data.priceChangePercent);
		btc_price = parseFloat(btc_price).toFixed(0);
		if (price_change < 0) {
			btc_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${btc_price} USDT`, type: ActivityType.Custom }],
				status: 'dnd',});
		}
		else if (price_change > 0) {
			btc_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${btc_price} USDT`, type: ActivityType.Custom }],
				status: 'online',
			});
		}
	})

	//const channel_eth = client.channels.cache.get(process.env.CHANNEL_ETH);
	fetch(process.env.ETH_URL).then(eth_response => eth_response.json()).then(data => {
		let eth_price = data.weightedAvgPrice;
		let price_change = parseFloat(data.priceChangePercent);
		eth_price = parseFloat(eth_price).toFixed(0);
		if (price_change < 0) {
			eth_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${eth_price} USDT`, type: ActivityType.Custom }],
				status: 'dnd',});
				// client.guilds.cache.get(process.env.GUILD_ID).members.cache.get('1115237775432757328').roles.add('Bull');
		}
		else if (price_change > 0) {
			eth_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${eth_price} USDT`, type: ActivityType.Custom }],
				status: 'online',});
		}
	})

	//const channel_sol = client.channels.cache.get(process.env.CHANNEL_SOL);
	fetch(process.env.SOL_URL).then(sol_response => sol_response.json()).then(data => {
		let sol_price = data.weightedAvgPrice;
		let price_change = parseFloat(data.priceChangePercent);
		sol_price = parseFloat(sol_price).toFixed(0);

		if (price_change < 0) {
			sol_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${sol_price} USDT`, type: ActivityType.Custom }],
				status: 'dnd',});
		}
		else if (price_change > 0) {
			sol_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${sol_price} USDT`, type: ActivityType.Custom }],
				status: 'online',
			});
		}
	})

	//const channel_xmr = client.channels.cache.get(process.env.CHANNEL_XMR);
	fetch(process.env.XMR_URL).then(xmr_response => xmr_response.json()).then(data => {
		let xmr_price = data.weightedAvgPrice;
		let price_change = parseFloat(data.priceChangePercent);
		xmr_price = parseFloat(xmr_price).toFixed(0);
		if (price_change < 0) {
			
			xmr_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${xmr_price} USDT`, type: ActivityType.Custom }],
				status: 'dnd',});
		}
		else if (price_change > 0) {
			xmr_pricebot.user.setPresence({
				activities: [{ name: `${data.priceChangePercent}% || ${xmr_price} USDT`, type: ActivityType.Custom }],
				status: 'online',
			});
		}
	})

	console.log('Prices Updated')
}

// Commands Handler 
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	//reload every commands at startup
	const { exec } = require('child_process');
	exec('node commands_deployment.js', (err, stdout, stderr) => {
		if (err) {
			// node couldn't execute the command
			return;
		}
		// the *entire* stdout and stderr (buffered)
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});

	client.user.setPresence({
		activities: [{ name: `Attend une commande`, type: ActivityType.Custom }],
		status: 'dnd',
	  });

	  UpdatePrice();
	  setInterval(UpdatePrice, 120000);

	console.log("J4rvIs est connecté !");
});


client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		} else {
			await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
		}
	}
});

// whitelist appliance
client.on("guildMemberAdd", (member) => {
	// setting up query
	const query = db.prepare('SELECT * FROM users WHERE userID = ?');
	// on va cherche le résultat
	const result = query.get(member.user.id);
	console.log(result);
	// check si user est dans la db
	if (result === undefined) {
		// il y est pas, on le kick
		member.kick();
	} else {
		// il y est, on le welcome
		member.send(`Welcome to the server, ${member.displayName}!`);
		member.roles.add(process.env.ROLE_INVITE);
	}
});

//bot init



eth_pricebot.login(process.env.ETH_PRICEBOT);
sol_pricebot.login(process.env.SOL_PRICEBOT);
btc_pricebot.login(process.env.BTC_PRICEBOT);
xmr_pricebot.login(process.env.XMR_PRICEBOT);
client.login(process.env.TOKEN);