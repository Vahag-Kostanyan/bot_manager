const climeDailyCipher = (cipher) => {
    try{
        fetch('http://localhost:5000/api/hamster_kompat/claim-daily-cipher', {
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