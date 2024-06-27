// Dados das listas do usuário armazenados na sessão
let userLists = [];

function toggleItemDone(listId, itemName) {
    const list = userLists.find(list => list.id === listId);
    if (list) {
        const item = list.items.find(item => item.name === itemName);
        if (item) {
            item.done = !item.done;
            displaySingleList(listId); // Atualiza a lista no centro da página
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    hideAddListForm();
    sidebar.classList.toggle('show'); // Adiciona ou remove a classe 'show' da barra lateral
    console.log('Sidebar toggled'); // Verifica se a função está sendo chamada
}

// Função para exibir as listas do usuário
function displayUserLists() {
    const listsContainer = document.getElementById('lists-container');
    listsContainer.innerHTML = '';
    userLists.forEach(list => {
        const listElement = document.createElement('div');
        listElement.innerHTML = `
            <p>${list.name}</p>
            <h2>${list.name}</h2>
            <ul>
                ${list.items.map(item => `<li>${item}</li>`).join('')}
                ${list.items.map(item => `<li><input type="checkbox">${item}</li>`).join('')}
            </ul>
            <button onclick="editList(${list.id})">Editar</button>
            <button onclick="showEditListForm(${list.id})">Editar</button>
            <button onclick="deleteList(${list.id})">Excluir</button>
        `;
        listsContainer.appendChild(listElement);
    });
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
function displaySingleList(listId) {
    const list = userLists.find(list => list.id === listId);
    if (list) {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div class="list-details">
                <h2>${list.name}</h2>
                <ul>
                    ${list.items.map(item => `
                        <li class="${item.done ? 'done' : ''}">
                            <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleItemDone(${listId}, '${item.name}')">
                            ${item.name}
                        </li>
                    `).join('')}
                </ul>
                <button onclick="editList(${list.id})">Editar</button>
                <button onclick="deleteList(${list.id})">Excluir</button>
            </div>
        `;
        mainContent.classList.remove('hidden');
    } else {
        alert("Lista não encontrada!");
    }
}
//Função auxiliar
function saveList(listIndex, name, items) {
    const newList = { id: listIndex + 1, name: name, items: items };

    if (listIndex >= 0) {
        userLists[listIndex] = newList;
    } else {
        userLists.push(newList);
    }

}

//Função para adicionar listas
function addNewList() {
    const newListName = prompt("Digite o nome da nova lista:");
    if (newListName) {
        const newListItems = prompt("Digite os itens da nova lista (separados por vírgula):");
        if (newListItems) {
            const itemsArray = newListItems.split(',').map(item => ({ name: item.trim(), done: false }));
            saveList(userLists.length, newListName, itemsArray);
        }
    }

    displayUserListsSidebar(); // Atualiza o menu lateral
    displayUserLists(); // Atualiza as listas exibidas no centro
}

// Função para editar uma lista específica
function editList(listId) {
    const listIndex = userLists.findIndex(list => list.id === listId);

    if (listIndex !== -1) {
        const list = userLists[listIndex];
        const newListName = prompt("Digite o novo nome da lista:", list.name);
        if (newListName) {
            const newListItems = prompt("Digite os novos itens da lista (separados por vírgula):", list.items.map(item => item.name).join(','));
            if (newListItems) {
                userLists[listIndex] = {
                    ...list,
                    name: newListName,
                    items: newListItems.split(',').map(item => ({ name: item.trim(), done: false }))
                };

                displayUserListsSidebar(); // Atualiza o menu lateral
                displayUserLists(); // Atualiza as listas exibidas no centro
                displaySingleList(listId); // Atualiza a lista no centro da página
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

        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = ''; // Limpa o conteúdo da área principal

        displayUserListsSidebar(); // Atualiza o menu lateral
        displayUserLists(); // Atualiza as listas exibidas no centro
    }
}
function openList(listId) {
    displaySingleList(listId);
}
// Exibir as listas do usuário quando a página carrega
window.onload = function() {
    displayUserListsSidebar();
    displayUserLists();
};

function showAddListForm() {
    document.getElementById('add-list-form').style.display = 'block';
    document.getElementById('add-list-button').style.display = 'block';
    document.getElementById('cancel-button').style.display = 'block';
}

function hideAddListForm() {
    document.getElementById('add-list-form').style.display = 'none';
    document.getElementById('add-list-button').style.display = 'none';
    document.getElementById('cancel-button').style.display = 'none';
}