const wsUri = "wss://echo.websocket.org/";

const output = document.getElementById("output");
const input = document.querySelector('.j-input');
const btnSend = document.querySelector('.j-btn-send');
const btnLocation = document.querySelector('.j-btn-location');

let websocket;
websocket = new WebSocket(wsUri);

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

  websocket.onclose = function(evt) {
    writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
      )};
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
      )};

btnSend.addEventListener('click', () => {
  const message = input.value;
  writeToScreen("SENT: " + message);
  websocket.send(message);
});

btnLocation.addEventListener('click', () => {
    
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
      } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
      }
});

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    var link = `https://www.openstreetmap.org/#map=3/${latitude}/${longitude}`;
    const message = link;
    writeToScreen("SENT: " + message);  
    websocket.send(link);
}

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}