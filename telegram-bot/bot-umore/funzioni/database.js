const fs = require('fs');

function database(ctx, adminID) {
    const userId = ctx.message.from.id;
    const userNome = ctx.message.from.username;
    const date = new Date();
    const ora = date.getHours();
    const minuto = date.getMinutes();
    const giorno = date.getDay(); // 0 = domenica, 1 = lunedì ecc

    if (userId.toString() === adminID) {
        const userInfo = {
            IDUtente: userId,
            NomeUtente: userNome,
            Ora: ora,
            Minuto: minuto,
            Giorno: giorno
        };

        let data = [];
        try {
            const jsonData = fs.readFileSync('./logs/logs.json');
            data = JSON.parse(jsonData);
        } catch (error) {
            console.error('Errore nella lettura del file JSON:', error);
        }
        data.push(userInfo);
        fs.writeFileSync('./logs/logs.json', JSON.stringify(data, null, 2), 'utf-8');
    }
}

module.exports = {
    database
};
