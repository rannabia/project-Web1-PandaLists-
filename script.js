// Simulação de dados das listas do usuário (pode ser substituída por uma chamada a um banco de dados)
let userLists = [
    { 
        id: 1, 
        name: "Lista de Compras", 
        items: ["Pão", "Leite", "Ovos"] 
    },
    { 
        id: 2, 
        name: "Tarefas do Dia", 
        items: ["Estudar", "Fazer exercícios", "Reunião às 14h"] 
    }
];
// Função para exibir as listas do usuário
function displayUserLists() {
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = '';

    userLists.forEach(list => {
        const listElement = document.createElement('div');
        listElement.innerHTML = `
            <p>${list.name}</p>
            <ul>
                ${list.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <button onclick="editList(${list.id})">Editar</button>
            <button onclick="deleteList(${list.id})">Excluir</button>
        `;
        listsContainer.appendChild(listElement);
    });
}

// Função para criar uma nova lista
function createNewList() {
    const newListName = prompt("Digite o nome da nova lista:");
    if (newListName) {
        const newList = { id: userLists.length + 1, name: newListName };
        userLists.push(newList);
        displayUserLists();
    }
}

// Função para editar uma lista
function editList(listId) {
    const newName = prompt("Digite o novo nome da lista:");
    if (newName) {
        const listIndex = userLists.findIndex(list => list.id === listId);
        if (listIndex !== -1) {
            userLists[listIndex].name = newName;
            displayUserLists();
        }
    }
}

// Função para excluir uma lista
function deleteList(listId) {
    const confirmDelete = confirm("Tem certeza de que deseja excluir esta lista?");
    if (confirmDelete) {
        userLists = userLists.filter(list => list.id !== listId);
        displayUserLists();
    }
}
// Função para adicionar itens na lista
function addItemToList(listId) {
    const newItemName = prompt("Digite o nome do novo item:");
    if (newItemName) {
        const listIndex = userLists.findIndex(list => list.id === listId);
        if (listIndex !== -1) {
            userLists[listIndex].items.push(newItemName);
            displayUserLists();
        }
    }
}

// Exibir as listas do usuário quando a página carrega
window.onload = displayUserLists;
listElement.innerHTML = `
    <p>${list.name}</p>
    <ul>
        ${list.items.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <button onclick="addItemToList(${list.id})">Adicionar Item</button>
    <button onclick="editList(${list.id})">Editar</button>
    <button onclick="deleteList(${list.id})">Excluir</button>
`;