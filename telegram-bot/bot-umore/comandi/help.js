const { Markup } = require('telegraf');

function help(ctx, adminID) {
    const userId = ctx.message.from.id;

    // if (userId.toString() === adminID) {
        const keyboard = Markup.inlineKeyboard([
            [Markup.button.callback('Felice 😀', 'felice'),
            Markup.button.callback('Triste 😭', 'triste')],
            [Markup.button.callback('Alterata 😒', 'alterata'),
            Markup.button.callback('Non alterata 😐', 'non_alterata')],
            [Markup.button.callback('Molto alterata 😡', 'molto_alterata')],
            [Markup.button.callback('Non mi devi parlare 🤬', 'incazzata_nera')],
        ]);

        ctx.reply('*            UMORE DI DOLLY🐑 *', { parse_mode: 'Markdown', ...keyboard });
    // } else {
    //     ctx.reply('Spiacenti, non sei autorizzato ad utilizzare questo bot.');
    // }
}

module.exports = {
    help
};      
