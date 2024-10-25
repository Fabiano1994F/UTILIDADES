const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Adiciona evento de clique ao botão de adicionar lembrete
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = ''; // Limpa o campo de entrada
        saveTasks(); // Salva as tarefas após adicionar
    }
});

// Função para adicionar um lembrete à lista
function addTask(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // Cria um botão de deletar para cada lembrete
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';

    // Evento para remover tarefa com confirmação
    deleteButton.addEventListener('click', function() {
        if (confirm('Tem certeza de que deseja excluir este lembrete?')) {
            taskList.removeChild(li);
            saveTasks(); // Salva as tarefas após remoção
        }
    });

    // Evento para marcar tarefa como concluída
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Função para salvar as tarefas no Local Storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((item) => {
        tasks.push(item.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar as tarefas do Local Storage ao iniciar a página
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach((task) => {
            addTask(task);
        });
    }
}

// Carrega as tarefas ao carregar a página
window.addEventListener('load', loadTasks);

