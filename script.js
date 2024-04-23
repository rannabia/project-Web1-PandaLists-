// Simulação de dados das listas do usuário
let userLists = [
    { id: 1, name: "Lista de Compras", items: ["Pão", "Leite", "Ovos", "Requeijão", "Fermento", "Farinha"] },
    { id: 2, name: "Tarefas do Dia", items: ["Estudar", "Fazer exercícios", "Reunião às 14h", "Prova", "Teste", "Simulado", "Redação"] }
];

// Função para exibir as listas do usuário
function displayUserLists() {
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = '';

    userLists.forEach(list => {
        const listElement = document.createElement('div');
        listElement.innerHTML = `
            <h2>${list.name}</h2>
            <ul>
                ${list.items.map(item => `<li><input type="checkbox">${item}</li>`).join('')}
            </ul>
            <button onclick="showEditListForm(${list.id})">Editar</button>
            <button onclick="deleteList(${list.id})">Excluir</button>
        `;
        listsContainer.appendChild(listElement);
    });
}

// Função para exibir o formulário de adicionar nova lista
function showNewListForm() {
    const newListForm = document.getElementById('new-list-form');
    newListForm.style.display = 'block';
}

// Função para adicionar nova lista
function addNewList(event) {
    event.preventDefault();
    const newListName = document.getElementById('new-list-name').value;
    const newListItems = document.getElementById('new-list-items').value.split('\n').filter(item => item.trim() !== '');
    const newList = { id: userLists.length + 1, name: newListName, items: newListItems };
    userLists.push(newList);
    displayUserLists();
    document.getElementById('new-list-form').style.display = 'none';
}

// Função para exibir o formulário de editar lista
function showEditListForm(listId) {
    const listIndex = userLists.findIndex(list => list.id === listId);
    if (listIndex !== -1) {
        const list = userLists[listIndex];
        const newListName = prompt("Digite o novo nome da lista:", list.name);
        if (newListName) {
            const newListItems = prompt("Digite os novos itens da lista (separados por vírgula):", list.items.join(','));
            if (newListItems) {
                userLists[listIndex] = { ...list, name: newListName, items: newListItems.split(',').map(item => item.trim()) };
                displayUserLists();
            }
        }
    }
}

// Função para excluir lista
function deleteList(listId) {
    const confirmDelete = confirm("Tem certeza de que deseja excluir esta lista?");
    if (confirmDelete) {
        userLists = userLists.filter(list => list.id !== listId);
        displayUserLists();
    }
}

// Exibir as listas do usuário quando a página carrega
window.onload = displayUserLists;