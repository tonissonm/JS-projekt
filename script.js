
const apiVõti = '7445bc456c067628afe7d3b0702b8653';
const apiURL = 'https://api.openweathermap.org/data/2.5/forecast';

const asukohaSisend = document.getElementById('asukohaSisend');
const nupp = document.getElementById('nupp');
const asukohaEl = document.getElementById('asukoht');
const ilmAndmedEl = document.getElementById('ilmAndmed');
const viiePaevaIlmEl = document.querySelector('.viiePäevaIlm');
const temperatuurEl = document.getElementById('temperatuur');
const kirjeldusEl = document.getElementById('kirjeldus');

nupp.addEventListener('click', () => {
    const asukoht = asukohaSisend.value;
    if (asukoht) {
        fetchIlm(asukoht);
    }
});

function fetchIlm(asukoht) {
    const url = `${apiURL}?q=${asukoht}&appid=${apiVõti}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data.list[0]);
            displayFiveDayForecast(data.list);
        })
        .catch(error => {
            console.error('Ei suutnud ilmaandmeid saada:', error);
        });
}

function displayCurrentWeather(currentWeather) {
    asukohaEl.textContent = currentWeather.name;
    temperatuurEl.textContent = `${Math.round(currentWeather.main.temp)}°C`;
    kirjeldusEl.textContent = currentWeather.weather[0].description;
}

function displayFiveDayForecast(forecastList) {
    viiePaevaIlmEl.innerHTML = '';

    const uniqueDays = [];
    let nextThreeDaysCount = 0;

    forecastList.forEach(forecast => {
        const dateTime = new Date(forecast.dt * 1000);
        const day = dateTime.toLocaleDateString('en-US', { weekday: 'short' });

        if (!uniqueDays.includes(day)) {
            uniqueDays.push(day);

            if (nextThreeDaysCount >= 1) {
                const temperature = Math.round(forecast.main.temp);

                const dayElement = document.createElement('div');
                dayElement.classList.add('day');
                dayElement.innerHTML = `<p>${day} ${temperature}°C</p>`;

                viiePaevaIlmEl.appendChild(dayElement);
            }

            nextThreeDaysCount++;
        }
    });
}