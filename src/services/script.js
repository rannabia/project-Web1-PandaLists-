// Simulação de dados das listas do usuário
let userLists = [
    { id: 1, name: "Lista de Compras", items: ["Pão", "Leite", "Ovos", "Arroz"] },
    { id: 2, name: "Tarefas do Dia", items: ["Estudar", "Fazer exercícios", "Reunião às 14h"] }
];
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show'); // Adiciona ou remove a classe 'show' da barra lateral
    console.log('Sidebar toggled'); // Verifica se a função está sendo chamada
}

// Função para exibir as listas do usuário no side navigation
function displayUserListsSidebar() {
    const listsSidebar = document.getElementById('lists-sidebar');
    listsSidebar.innerHTML = '';

    userLists.forEach(list => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="#" onclick="openList(${list.id})">${list.name}</a>`;
        listsSidebar.appendChild(listItem);
    });
}

// Função para carregar e exibir as listas do usuário no container principal
function displayUserLists() {
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = '';

    userLists.forEach(list => {
        const listElement = document.createElement('div');
        listElement.innerHTML = `
            <h2>${list.name}</h2>
            <ul>
                ${list.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <button onclick="editList(${list.id})">Editar</button>
            <button onclick="deleteList(${list.id})">Excluir</button>
        `;
        listsContainer.appendChild(listElement);
    });
}

// Função para adicionar nova lista
function addNewList(event) {
    event.preventDefault();
    const newListName = document.getElementById('new-list-name').value;
    const newListItems = document.getElementById('new-list-items').value.split('\n').filter(item => item.trim() !== '');
    const newList = { id: userLists.length + 1, name: newListName, items: newListItems };
    userLists.push(newList);
    displayUserListsSidebar();
    displayUserLists();
}

// Função para abrir uma lista específica no centro da página
function openList(listId) {
    // Encontre a lista correspondente pelo ID
    const list = userLists.find(list => list.id === listId);

    if (list) {
        // Exiba a lista no centro da página
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="list-details">
                <h2>${list.name}</h2>
                <ul>
                    ${list.items.map(item => `<li><input type="checkbox">${item}</li>`).join('')}
                </ul>
                <button onclick="editList(${list.id})">Editar</button>
                <button onclick="deleteList(${list.id})">Excluir</button>
            </div>
        `;
    } else {
        alert("Lista não encontrada!");
    }
}


// Função para editar uma lista específica
function editList(listId) {
    // Encontre a lista correspondente pelo ID
    const listIndex = userLists.findIndex(list => list.id === listId);

    if (listIndex !== -1) {
        const list = userLists[listIndex];
        const newListName = prompt("Digite o novo nome da lista:", list.name);
        if (newListName) {
            const newListItems = prompt("Digite os novos itens da lista (separados por vírgula):", list.items.join(','));
            if (newListItems) {
                userLists[listIndex] = { ...list, name: newListName, items: newListItems.split(',').map(item => item.trim()) };
                displayUserListsSidebar(); // Atualiza o menu lateral
                displayUserLists(); // Atualiza as listas exibidas no centro
            }
        }
    } else {
        alert("Lista não encontrada!");
    }
}

// Função para excluir uma lista específica
function deleteList(listId) {
    const confirmDelete = confirm("Tem certeza de que deseja excluir esta lista?");
    if (confirmDelete) {
        userLists = userLists.filter(list => list.id !== listId);
        displayUserListsSidebar(); // Atualiza o menu lateral
        displayUserLists(); // Atualiza as listas exibidas no centro
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = ''; // Limpa o conteúdo da área principal
    }
}
// Exibir as listas do usuário quando a página carrega
window.onload = function() {
    displayUserListsSidebar();
    displayUserLists();
};
