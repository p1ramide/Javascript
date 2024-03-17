const { database } = require('./database');
const { help } = require('../comandi/help');

function login(ctx, adminID){
    const userId = ctx.message.from.id;
    const userNome = ctx.message.from.username;

    // if (userId.toString() === adminID) {
        help(ctx, adminID);
        database(ctx, adminID);
//     } else {
//         ctx.reply('Spiacenti, non sei autorizzato ad utilizzare questo bot.');
//     }    
}

module.exports = {
    login
};
