const db = require('../fierbase.config');

const setHamsterKombatStatus = async (status) => {
    try {
        const logDoc = await db.collection('configs').doc('hamster_kombat');
        await logDoc.update({
            status: status
          });
    } catch (error) {
        setHamsterKombatLog('setHamsterKombatRespons_error', error);
    }
}

module.exports = { setHamsterKombatStatus };