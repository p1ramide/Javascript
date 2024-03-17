const { Telegraf } = require('telegraf');
const fs = require('fs');

const botToken = 'YOUR-TOKEN';
const adminID = 'YOUR-ADMIN-ID';

const { login } = require('./funzioni/login');
const { database } = require('./funzioni/database');
const { help } = require('./comandi/help');
const { triste } = require('./funzioni/gestore');
const { felice } = require('./funzioni/gestore');
const { non_alterata } = require('./funzioni/gestore');
const { alterata } = require('./funzioni/gestore');
const { molto_alterata } = require('./funzioni/gestore');
const { incazzata_nera } = require('./funzioni/gestore');

const bot = new Telegraf(botToken);

bot.start((ctx) => {
    login(ctx, adminID);
    bot.action('felice', (ctx) => felice(bot, ctx, adminID));
    bot.action('non_alterata', (ctx) => non_alterata(bot, ctx, adminID));
    bot.action('alterata', (ctx) => alterata(bot, ctx, adminID));
    bot.action('molto_alterata', (ctx) => molto_alterata(bot, ctx, adminID));
    bot.action('incazzata_nera', (ctx) => incazzata_nera(bot, ctx, adminID));
    bot.action('triste', (ctx) => triste(bot, ctx, adminID));
});

bot.command('help', (ctx) => {
    help(ctx, adminID);
});


bot.launch();
