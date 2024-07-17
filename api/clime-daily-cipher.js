const climeDailyCipher = (cipher) => {
    try{
        fetch(process.env.SUPER_PLAYER_PAI_HOST+'/api/hamster_kompat/claim-daily-cipher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({cipher}), // body data type must match "Content-Type" header
        });
    }catch(error) {
        console.log(error);
    }
}


module.exports = {climeDailyCipher}