
document.addEventListener('DOMContentLoaded', () => {
    const eventTitleElement = document.getElementById('eventTitle');
    const eventDateElement = document.getElementById('eventDate');
    const scheduleElement = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');

    let talksData = [];

    // Fetch data and initialize the page
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            talksData = data.talks;
            eventTitleElement.textContent = data.eventTitle;
            eventDateElement.textContent = data.eventDate;
            displayTalks(talksData);
        });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTalks = talksData.filter(talk => {
            return talk.categories.some(category => category.toLowerCase().includes(searchTerm));
        });
        displayTalks(filteredTalks);
    });


    function displayTalks(talks) {
        scheduleElement.innerHTML = '';
        let currentTime = new Date('2026-05-01T10:00:00'); // Event start time

        talks.forEach((talk, index) => {
            const talkElement = document.createElement('div');
            talkElement.classList.add('talk');

            const startTime = new Date(currentTime);
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour talk

            talkElement.innerHTML = `
                <p class="time">${formatTime(startTime)} - ${formatTime(endTime)}</p>
                <h2>${talk.title}</h2>
                <p class="speakers">by ${talk.speakers.join(', ')}</p>
                <p>${talk.description}</p>
                <div class="categories">
                    ${talk.categories.map(category => `<span>${category}</span>`).join('')}
                </div>
            `;
            scheduleElement.appendChild(talkElement);

            // Add transition time
            currentTime = new Date(endTime.getTime() + 10 * 60 * 1000); // 10 minutes transition

            // Add lunch break after the 3rd talk
            if (index === 2) {
                const lunchElement = document.createElement('div');
                lunchElement.classList.add('talk');
                const lunchStartTime = new Date(currentTime);
                const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60 * 1000); // 1 hour lunch
                lunchElement.innerHTML = `<p class="time">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</p><h2>Lunch Break</h2>`;
                scheduleElement.appendChild(lunchElement);
                currentTime = lunchEndTime;
            }
        });
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
