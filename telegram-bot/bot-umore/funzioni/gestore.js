// const cron = require('node-cron');

// const userStatus = {};
// const canaleID = '-1002043493293';

// function gestioneEmozione(bot, ctx, adminID, emozione) {
//     const userId = ctx.callbackQuery.from.id;

//     const messagioInviato = `Umore di Dolly inviato a papà! (${emozione})`;

//     bot.telegram.sendMessage(canaleID, `Oggi Dolly è ${emozione}!`);

//     bot.telegram.sendMessage(userId, messagioInviato)
//         .then((sentMessage) => {
//             //console.log("Messaggio inviato con successo. ID messaggio:", sentMessage.message_id);

//             setTimeout(() => {
//                 //console.log("Timer scaduto. Tentativo di eliminare il messaggio...");

//                 bot.telegram.deleteMessage(userId, sentMessage.message_id)
//                     .then(() => {
//                         //console.log("Messaggio eliminato con successo.");
//                     })
//                     .catch((error) => {
//                         //console.error("Errore durante l'eliminazione del messaggio:", error);
//                     });
//             }, 15000);
//         })
//         .catch((error) => {
//             //console.error("Errore durante l'invio del messaggio di errore:", error);
//         });
// }

// module.exports = {
//     felice: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'felice'),
//     non_alterata: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'un po alterata 😐'),
//     alterata: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'alterata 😒'),
//     triste: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'triste 😭'),
//     molto_alterata: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'molto alterata 😡'),
//     incazzata_nera: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'molto incazzata 🤬'),
// };

const cron = require('node-cron');

const userStatus = {};
const canaleID = '-1002043493293';

function gestioneEmozione(bot, ctx, adminID, emozione) {
    const userId = ctx.callbackQuery.from.id;

    const messaggioInviato = `Umore di Dolly inviato a papà! (${emozione})`;

    // Controlla se c'è già un messaggio inviato a questo utente
    if (userStatus[userId] && userStatus[userId].messageId) {
        // Se esiste, aggiorna il messaggio invece di inviarne uno nuovo
        bot.telegram.editMessageText(userId, userStatus[userId].messageId, null, {
            text: messaggioInviato,
        })
        .catch((error) => {
            console.error("Errore durante l'aggiornamento del messaggio:", error);
        });
    } else {
        // Se non esiste, invia un nuovo messaggio e memorizza l'ID
        bot.telegram.sendMessage(userId, messaggioInviato)
            .then((sentMessage) => {
                userStatus[userId] = {
                    messageId: sentMessage.message_id,
                };

                setTimeout(() => {
                    // Elimina il messaggio dopo 15 secondi
                    bot.telegram.deleteMessage(userId, sentMessage.message_id)
                        .catch((error) => {
                            console.error("Errore durante l'eliminazione del messaggio:", error);
                        });
                    delete userStatus[userId];
                }, 15000);
            })
            .catch((error) => {
                console.error("Errore durante l'invio del messaggio di umore:", error);
            });
    }

    // Invia un messaggio nel canale
    bot.telegram.sendMessage(canaleID, `Oggi Dolly è ${emozione}!`);
}

module.exports = {
    felice: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'felice 😄'),
    non_alterata: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'un po alterata 😐'),
    alterata: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'alterata 😒'),
    triste: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'triste 😭'),
    molto_alterata: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'molto alterata 😡'),
    incazzata_nera: (bot, ctx, adminID) => gestioneEmozione(bot, ctx, adminID, 'molto incazzata 🤬'),
};





