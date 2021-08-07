const axios = require("axios")
const cheerio = require("cheerio")
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/871789208610693211/HWThH0GxZDufHH3okEGAxhJkRB1cnhE3twb5EdsK06m9JvJP-lL2_vLcNR5xx2z3QNbr");

let previousValue;
 
main();
setInterval(main, 1000);

async function fetchHTML(url) {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

async function main () {
  const $ = await fetchHTML("https://slickdeals.net/newsearch.php?pp=20&sort=newest&previousdays=1&forumid%5b%5d=71&forumid%5b%5d=25&forumid%5b%5d=9&forumid%5b%5d=30&forumid%5b%5d=53&forumid%5b%5d=4&forumid%5b%5d=54&forumid%5b%5d=10&forumid%5b%5d=38&forumid%5b%5d=39&forumid%5b%5d=8&forumid%5b%5d=13&r=1")
  let newValue = $('div.resultRow:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)').text()
  let newItemLink =  $('div.resultRow:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)').attr('href')
  let oldValue = $('div.resultRow:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)').text()
  let oldItemLink = $('div.resultRow:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)').attr('href')

  if( typeof previousValue === 'undefined' ){
    console.log(`Latest item: ${newValue}, link is https://slickdeals.net${newItemLink}`);
    startWebhook(newItemLink, newValue)
  } else if( previousValue !== newValue){
    console.log(`New item:  ${newValue}, link is https://slickdeals.net${newItemLink}`);
    console.log(Date());
    oldWebhook(oldItemLink, oldValue)
    newWebhook(newItemLink, newValue)
  }

  previousValue = newValue;
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
  }, 100)
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

async function startWebhook(url, item) {
  const embed = new MessageBuilder()
  .setTitle('Monitor is online!')
  .setAuthor('BB Monitors', '')
  .addField(`Latest post URL:`, `[link](https://www.slickdeals.net${url})`, true)
  .setColor('#00FF00')
  .setThumbnail('https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
  .setDescription(`Latest post: ${item}`)
  .setFooter('', 'https://cdn.discordapp.com/icons/718372968383643678/de8ebf56f71dccba06039dcd27426e30.webp?size=256')
  .setTimestamp();
  hook.send(embed);
}

// let listTime = $('#searchResults > div:nth-child(1) > div.mainDealInfo > div > div > div').text.split('Posted')[1].split('\n')[0].substring(11,7)
// $('#searchResults > div:nth-child(1) > div.mainDealInfo > div > div > div').text.split('Posted')[1].split('\n')[0].substring(11,7)