const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
╭━━━━〔 *${settings.botName || 'ICON-X MD'}* 〕━━━━╮
┃ 🛠️ Version: *${settings.version || '1.0.0'}*
┃ 👤 Owner: *${settings.botOwner || 'Mr Elephant'}*
╰━━━━━━━━━━━━━━━━━━━━━━━╯

*COMMAND LIST:*

╭───〔 🌐 *GENERAL* 〕───╮
│ ● .help | .menu
│ ● .ping
│ ● .alive
│ ● .tts <text>
│ ● .owner
│ ● .joke
│ ● .quote
│ ● .fact
│ ● .weather <city>
│ ● .news
│ ● .attp <text>
│ ● .lyrics <title>
│ ● .8ball <question>
│ ● .groupinfo
│ ● .staff
│ ● .vv
│ ● .trt <text>
│ ● .ss <url>
│ ● .jid
│ ● .url <link>
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 👮 *ADMIN* 〕───╮
│ ● .ban @user
│ ● .kick @user
│ ● .warn @user
│ ● .promote @user
│ ● .demote @user
│ ● .mute
│ ● .unmute
│ ● .delete
│ ● .clear
│ ● .tagall
│ ● .hidetag
│ ● .antilink
│ ● .antibadword
│ ● .welcome
│ ● .goodbye
│ ● .setgname <name>
│ ● .setgpp
│ ● .resetlink
│ ● .lock
│ ● .unlock
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 🔒 *OWNER* 〕───╮
│ ● .mode <public/private>
│ ● .clearsession
│ ● .cleartmp
│ ● .update
│ ● .settings
│ ● .autostatus
│ ● .autoread
│ ● .anticall
│ ● .pmblocker
│ ● .setpp
│ ● .setmention
│ ● .broadcast <text>
│ ● .eval <code>
│ ● .reboot
│ ● .shutdown
│ ● .backup
│ ● .restore
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 🎨 *EDITING* 〕───╮
│ ● .sticker
│ ● .simage
│ ● .remini
│ ● .removebg
│ ● .blur
│ ● .crop
│ ● .meme <text>
│ ● .take
│ ● .emojimix <emoji1> <emoji2>
│ ● .igs <url>
│ ● .igsc <username>
│ ● .gif
│ ● .circle
│ ● .mirror
│ ● .grayscale
│ ● .sepia
│ ● .resize
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 🤖 *AI & GAMES* 〕───╮
│ ● .gpt <question>
│ ● .gemini <question>
│ ● .imagine <prompt>
│ ● .flux <prompt>
│ ● .sora <prompt>
│ ● .tictactoe
│ ● .hangman
│ ● .trivia
│ ● .truth
│ ● .dare
│ ● .blackjack
│ ● .dice
│ ● .coinflip
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 📥 *DOWNLOADER* 〕───╮
│ ● .play <song>
│ ● .song <title>
│ ● .video <url>
│ ● .spotify <url>
│ ● .ytmp4 <url>
│ ● .ytmp3 <url>
│ ● .instagram <url>
│ ● .facebook <url>
│ ● .tiktok <url>
│ ● .twitter <url>
│ ● .soundcloud <url>
│ ● .pinterest <url>
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 🔤 *TEXTMAKER* 〕───╮
│ ● .neon <text>
│ ● .glitch <text>
│ ● .fire <text>
│ ● .ice <text>
│ ● .snow <text>
│ ● .matrix <text>
│ ● .hacker <text>
│ ● .devil <text>
│ ● .sand <text>
│ ● .metal <text>
│ ● .water <text>
│ ● .lava <text>
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 💻 *SYSTEM* 〕───╮
│ ● .git
│ ● .github
│ ● .sc
│ ● .repo
│ ● .script
│ ● .runtime
│ ● .stats
│ ● .log
│ ● .pingall
│ ● .announce <text>
│ ● .clean
│ ● .optimize
│ ● .test
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭───〔 📱 *SOCIAL* 〕───╮
│ ● .instagram
│ ● .facebook
│ ● .twitter
│ ● .tiktok
│ ● .youtube
│ ● .telegram
│ ● .whatsapp
╰━━━━━━━━━━━━━━━━━━━━━━╯

*Join our channel for updates:*`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        const contextInfo = {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363426745883545@newsletter',
                newsletterName: '𝗜𝗖𝗢𝗡-𝗫 𝗠𝗗 𝗨𝗣𝗗𝗔𝗧𝗘𝗦',
                serverMessageId: -1
            }
        };

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo
            }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;