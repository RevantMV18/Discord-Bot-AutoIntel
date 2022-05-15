const express = require("express")
const app = express()
 
app.get("/", (req, res) => {
 res.send("helloooo!")
 })
app.listen(3000, () => {
 console.log("your bot is online")
 })

const Discord = require('discord.js');

const fetch = require('node-fetch');

const client = new Discord.Client();

API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    // ignore messages from the bot itself
    if (message.author.bot) {
        return;
    }
    // form the payload
    const payload = {
        inputs: {
            text: message.content
        }
    };
    // form the request headers with Hugging Face API key
    const headers = {
        'Authorization': 'Bearer ' + process.env.HUGGINGFACE_TOKEN
    };
    
    // set status to typing
    message.channel.startTyping();
    // query the server
    const response = await fetch(API_URL, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: headers
    });
    const data = await response.json();
    let botResponse = '';
    if (data.hasOwnProperty('generated_text')) {
        botResponse = data.generated_text;
    } else if (data.hasOwnProperty('error')) { // error condition
        botResponse = data.error;
    }
    // stop typing
    message.channel.stopTyping();
    // send message to channel as a reply
    message.reply(botResponse);
})

client.login(process.env.DISCORD_TOKEN);
const mySecret = process.env['DISCORD_TOKEN']
