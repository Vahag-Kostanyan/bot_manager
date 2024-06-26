const climeDailyCipher = (cipher) => {
    try{
        fetch('https://super-player-api.onrender.com/api/hamster_kompat/claim-daily-cipher', {
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