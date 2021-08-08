const axios = require("axios")
const cheerio = require("cheerio")
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/871789208610693211/HWThH0GxZDufHH3okEGAxhJkRB1cnhE3twb5EdsK06m9JvJP-lL2_vLcNR5xx2z3QNbr");

let previousValue;
 
main();
setInterval(main, 2000);

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

async function main () {
  uh()
}

async function newWebhook(url, item) {
  setTimeout(() => {
    const embed = new MessageBuilder()
    .setTitle('Frontpage was updated')
    .setAuthor('BB Monitors', '')
    .setURL('https://slickdeals.net/newsearch.php?pp=20&sort=newest&previousdays=1&forumid%5b%5d=71&forumid%5b%5d=25&forumid%5b%5d=9&forumid%5b%5d=30&forumid%5b%5d=53&forumid%5b%5d=4&forumid%5b%5d=54&forumid%5b%5d=10&forumid%5b%5d=38&forumid%5b%5d=39&forumid%5b%5d=8&forumid%5b%5d=13&r=1')
    .addField(`New post url:`, `[link](https://www.slickdeals.net${url})`, true)
    .setColor('#00FF00')
    .setThumbnail('https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
    .setDescription(item)
    .setFooter('', 'https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
    .setTimestamp();
    hook.send(embed);
  }, 250)
}
async function oldWebhook(url, item) {
  const embed = new MessageBuilder()
  .setTitle('Old content')
  .setAuthor('BB Monitors', '')
  .addField(`~~Old post url:~~`, `~~https://www.slickdeals.net${url}~~`, true)
  .setColor('#FF0000')
  .setThumbnail('https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
  .setDescription(`~~${item}~~`)
  .setFooter('', 'https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
  .setTimestamp();

  hook.send(embed);
}

async function uh() {
  const embed = new MessageBuilder()
  .setTitle('Old content')
  .setAuthor('BB Monitors', '')
  .addField(`~~Old post url:~~`, `~~https://www.slickdeals.net~~`, true)
  .setColor('#FF0000')
  .setThumbnail('https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
  .setDescription(`~~~~`)
  .setFooter('', 'https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
  .setTimestamp();

  hook.send(embed);
}