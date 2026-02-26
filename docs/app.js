const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
const userInfoDiv = document.getElementById('user-info');
const user = tg.initDataUnsafe?.user;
if (user) {
    userInfoDiv.innerHTML = `
        <p>👋 Привет, <strong>${user.first_name}</strong>!</p>
        <p>ID: ${user.id}</p>
        <p>Username: @${user.username || 'не указан'}</p>
    `;
} else {
    userInfoDiv.innerHTML = `<p>Откройте через Telegram для отображения данных</p>`;
}
let count = 0;
const countSpan = document.getElementById('count');
const btnClick = document.getElementById('btn-click');
btnClick.addEventListener('click', () => {
    count++;
    countSpan.textContent = count;
    tg.HapticFeedback.impactOccurred('light');
});
const btnSend = document.getElementById('btn-send');
btnSend.addEventListener('click', () => {
    const data = JSON.stringify({
        action: 'counter_result',
        count: count,
        timestamp: Date.now()
    });
    tg.sendData(data);
});
tg.BackButton.show();
tg.BackButton.onClick(() => {
    tg.close();
});
