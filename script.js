// Exibe o valor no visor 
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Limpa o visor
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Deleta o último caractere no visor
function deleteLast() {
    let currentDisplay = document.getElementById('display').value;
    document.getElementById('display').value = currentDisplay.slice(0, -1);
}

// Calcula o resultado
function calculate() {
    let expression = document.getElementById('display').value;

    try{
        let result = eval(expression); // Avalia a expressão
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

//LEMBRETES

// Seleciona os elementos do DOM
const reminderInput = document.getElementById('reminderInput');
const addReminderButton = document.getElementById('addReminderButton');
const reminderList = document.getElementById('reminderList');

// Adiciona evento de clique ao botão de adicionar lembrete
addReminderButton.addEventListener('click', function() {
    const reminderText = reminderInput.value.trim();
    
    if (reminderText !== '') {
        addReminder(reminderText);
        reminderInput.value = ''; // Limpa o campo de entrada
    }
});

// Função para adicionar um lembrete à lista
function addReminder(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // Cria um botão de deletar para cada lembrete
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', function() {
        reminderList.removeChild(li);
    });

    li.appendChild(deleteButton);
    reminderList.appendChild(li);
}

// Função para salvar as tarefas no Local Storage
function saveReminders() {
    const reminders = [];
    reminderList.querySelectorAll('li').forEach((item) => {
        reminders.push(item.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(reminders));
}

// Função para carregar as tarefas do Local Storage ao iniciar a página
function loadReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders'));
    if (reminders) {
        reminders.forEach((reminder) => {
            addTask(reminder);
        });
    }
}

// Carrega as tarefas ao carregar a página
window.addEventListener('load', loadReminders);


