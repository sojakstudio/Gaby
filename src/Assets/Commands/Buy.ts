import {
  MessageEmbed,
  BaseCommandInteraction,
  CommandInteractionOptionResolver
} from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { imageurl, color } from '../Utils/EmbedConfig.js';
import ItemBundle from '../Minigame/Items/ItemBundle.js';
import ICommand from '../Interfaces/ICommand.js';

const sword = ItemBundle.find(item => item.name === 'Sword');
const starsword = ItemBundle.find(item => item.name === 'StarSword');
const shield = ItemBundle.find(item => item.name === 'Shield');
const pickaxe = ItemBundle.find(item => item.name === 'Pickaxe');
const randombox = ItemBundle.find(item => item.name === 'RandomBox');

const command: ICommand = {
  Builder: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Buy an item')
    .addStringOption(option =>
      option
        .setName('item')
        .setDescription('select your item')
        .addChoices(
          { name: `Sword (${sword!.price}₩}) level: ${sword!.level}`, value: 'Sword' },
          { name: `Star Sword (${starsword!.price}₩}) level: ${starsword!.level}`, value: 'StarSword' },
          { name: `Shield (${shield!.price}₩) level: ${shield!.level}`, value: 'Shield' },
          { name: `Pickace (${pickaxe!.price}₩) level: ${pickaxe!.level}`, value: 'Pickaxe' },
          { name: `RandomBox (${randombox!.price}₩) level: ${randombox!.level}`, value: 'Random' },
        )
        .setRequired(true)
    ) as SlashCommandBuilder,
  SlashExecute: async (interaction: BaseCommandInteraction) => {
    const oItem = (
      interaction.options as CommandInteractionOptionResolver
    ).getString('item');

    let bought;

    if (oItem === 'Random') {
      while (true) {
        bought = ItemBundle[Math.floor(Math.random() * ItemBundle.length)];
        if (!(bought.name === 'RandomBox')) break;
      }

      const embed = new MessageEmbed()
        .setAuthor('Gaby', imageurl)
        .setColor(color)
        .setTitle('== !Shop cart! ==')
        .addField('you bought', `(RandomBox : 150₩)\n${bought.level} item; ${bought.name} (${bought.price}₩)`);
      
      interaction.reply({ embeds: [embed] });
      return;
    }

    bought = ItemBundle.find(item => item.name === oItem);

    const embed = new MessageEmbed()
      .setAuthor('Gaby', imageurl)
      .setColor(color)
      .setTitle('== !Shop cart! ==')
      .addField('you bought', `${bought!.level} item; ${oItem} (${bought!.price}₩)`);
    
    interaction.reply({ embeds: [embed] });
  },
};

export default command;