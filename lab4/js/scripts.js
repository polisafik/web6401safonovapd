document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            let isValid = true;

            if (name === '') {
                alert('Пожалуйста, введите ваше имя.');
                nameInput.focus();
                isValid = false;
            }

            if (email === '') {
                alert('Пожалуйста, введите ваш email.');
                emailInput.focus();
                isValid = false;
            } else if (!isValidEmail(email)) {
                alert('Пожалуйста, введите корректный email.');
                emailInput.focus();
                isValid = false;
            }

            if (message === '') {
                alert('Пожалуйста, введите ваше сообщение.');
                messageInput.focus();
                isValid = false;
            }

            if (isValid) {
                alert('Форма отправлена!');
              
                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    console.log('Форма успешно отправлена');
                    form.reset();
                })
                //.catch(error => {
                    //console.error('Ошибка при отправке формы:', error);
                    //.catch.alert('Произошла ошибка при отправке формы.');
                //});
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    // Код для асинхронного запроса
    const animalsTable = document.getElementById('animalsTable');
    if (animalsTable) {
        fetch('data.json') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const tbody = animalsTable.querySelector('tbody');
                data.forEach(animal => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${animal.name}</td>
                        <td>${animal.age}</td>
                        <td>${animal.breed}</td>
                        <td>${animal.description}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
                alert('Произошла ошибка при загрузке данных о животных.');
            });
    }
});
