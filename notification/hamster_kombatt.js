const sendHamsterKombatNotification = async () => {
    const url = `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: 5438286770,
            text: 'Hamster Kombat Balance updated successfully',
        }),
    });

    const data = await response.json();
    if (data.ok) {
        console.log('Message sent successfully');
    } else {
        console.error('Error sending message:', data);
    }
};

module.exports = {sendHamsterKombatNotification}