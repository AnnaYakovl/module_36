const status = document.querySelector('#status');
const btn = document.querySelector('.j-btn-test');
let xhr = new XMLHttpRequest();

// Функция, выводящая текст об ошибке
const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  var link = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;
  sendRequest(link);
}

btn.addEventListener('click', () => {
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

function sendRequest(link) {
  // Инициализируем запрос
  xhr.open('GET', link);
  xhr.send(); 
}

// Добавляем обрабочик ответа сервера
xhr.onload = function() {
  if (xhr.status != 200) { // HTTP ошибка?
    // Если статус не 200 (указывает, что запрос выполнен успешно),
    // то обрабатываем отдельно
    console.log('Статус ответа: ', xhr.status);
  } else {
    // Ответ мы получаем в формате JSON, поэтому его надо распарсить
    // console.log('Ответ сервера JSON', xhr.response);

    // Парсим и выводим ответ сервера
    var data = JSON.parse(xhr.response);
    
    status.textContent = `Временная зона: ${data.timezone}, Местные дата и время: ${data.date_time_txt}`;
  }
};