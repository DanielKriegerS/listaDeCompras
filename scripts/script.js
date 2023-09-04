// Aguarde até que o DOM esteja pronto
document.addEventListener("DOMContentLoaded", function () {
    // Referência ao botão "Novo item"
    const newItemButton = document.getElementById("newItem");
    // Referência ao valor total
    const valorTotalSpan = document.querySelector(".valorTotal");
    // Referência à seção de conteúdo
    const content = document.querySelector(".content");

    // Inicialize o valor total geral
    let valorTotalGeral = 0;

    // Função para calcular o valor total de um item
    function calcularValorItem(valor, quantidade) {
        return valor * quantidade;
    }

    // Função para atualizar o valor total exibido no span
    function atualizarValorTotal() {
        valorTotalSpan.textContent = `R$ ${valorTotalGeral.toFixed(2)}`;
    }

    // Evento de clique no botão "Novo item"
    newItemButton.addEventListener("click", function () {
        const newItemDiv = document.createElement("div");
newItemDiv.classList.add("item");

// Crie os elementos dentro da div do item
newItemDiv.innerHTML = `
    <span class="itemName">Item:</span> <input type="text" class="name"> <br>
    <span>Quant: </span><input type="number" min="0" max="100" class="quantItem"> <br>
    <span>Valor do item: </span><input type="number" class="money">
    <br> <input type="checkbox" class="toggleEdit"> <span class="completed"> SALVAR </span> <br>
    <input type="checkbox" class="checked"> <span> Adicionado ao carrinho </span>
`;

// Adicione a nova div do item à seção de conteúdo
content.appendChild(newItemDiv);

// Crie uma nova div para o botão de exclusão
const deleteButtonDiv = document.createElement("div");
deleteButtonDiv.classList.add("deleteButtonDiv");

deleteButtonDiv.innerHTML = `
        <span> X </span>
`

content.appendChild(deleteButtonDiv);

// Referência ao checkbox "EDITAR/SALVAR" dentro da div do item
const checkbox = newItemDiv.querySelector(".toggleEdit");

// Referência ao checkbox "Adicionado ao carrinho" dentro da div do item
const carrinhoCheckbox = newItemDiv.querySelector(".checked");

// Referência ao campo de valor do item
const valorItemInput = newItemDiv.querySelector(".money");

// Referência ao campo de quantidade de itens
const quantItemInput = newItemDiv.querySelector(".quantItem");

// Referência ao input de nome do item
const nameItem = newItemDiv.querySelector(".name");

// Evento de clique no checkbox "Salvar"
checkbox.addEventListener("change", function () {
    const inputs = newItemDiv.querySelectorAll("input[type='text'], input[type='number']");
    const isAnyInputEmpty = Array.from(inputs).some((input) => input.value.trim() === '');

    if (!isAnyInputEmpty) {
        if (checkbox.checked) {
            // Se o checkbox "EDITAR/SALVAR" estiver marcado e nenhum input estiver vazio, aplique os estilos da classe .add aos inputs
            inputs.forEach((input) => {
                input.classList.add("add");
                input.disabled = true;
            });
            // Altere o texto para "EDITAR"
            newItemDiv.querySelector(".completed").textContent = "EDITAR";

            // Calcule o valor total do item e atualize o valor total geral
            const valorItem = parseFloat(valorItemInput.value) || 0;
            const quantItem = parseFloat(quantItemInput.value) || 0;
            const valorItemTotal = calcularValorItem(valorItem, quantItem);
            valorTotalGeral += valorItemTotal;

            // Chame a função para atualizar o valor total exibido no span
            atualizarValorTotal();
        } else {
            // Se o checkbox "EDITAR/SALVAR" não estiver marcado, remova os estilos da classe .add dos inputs
            inputs.forEach((input) => {
                input.classList.remove("add");
                input.classList.remove("checked");
                input.disabled = false; // Habilita os inputs quando desmarcado
            });
            // Altere o texto de volta para "SALVAR"
            newItemDiv.querySelector(".completed").textContent = "SALVAR";

            // Calcule o valor total do item e atualize o valor total geral
            const valorItem = parseFloat(valorItemInput.value) || 0;
            const quantItem = parseFloat(quantItemInput.value) || 0;
            const valorItemTotal = calcularValorItem(valorItem, quantItem);
            valorTotalGeral -= valorItemTotal;

            // Chame a função para atualizar o valor total exibido no span
            atualizarValorTotal();

            // Desmarque o checkbox "Adicionar ao carrinho" e remova as classes .checked
            carrinhoCheckbox.checked = false;
            carrinhoCheckbox.style.cursor = "not-allowed";
            const elementsToChange = newItemDiv.querySelectorAll(".itemName, .quantItem, .money, .name");
            elementsToChange.forEach((element) => {
                element.classList.remove("checked");
                newItemDiv.classList.remove("checked");
            });
        }
    } else {
        // Se algum campo estiver vazio, exiba uma mensagem de alerta ou adote ações apropriadas
        alert("Por favor, preencha todos os campos antes de salvar.");
        checkbox.checked = false; // Desmarque o checkbox "Salvar"
    }
});

      // Evento de clique no checkbox "Adicionado ao carrinho"
carrinhoCheckbox.addEventListener("change", function () {
    // Verifique se o checkbox "Salvar" está marcado
    const salvarCheckbox = newItemDiv.querySelector(".toggleEdit");
    if (!salvarCheckbox.checked) {
        // Se o checkbox "Salvar" não estiver marcado, não permita marcar o checkbox "Adicionar ao carrinho"
        carrinhoCheckbox.checked = false;
        carrinhoCheckbox.style.cursor = "not-allowed"; // Altere o estilo do cursor
    } else {
        // Se o checkbox "Salvar" estiver marcado, aplique a classe .checked aos spans e inputs
        const elementsToChange = newItemDiv.querySelectorAll(".itemName, .quantItem, .money, .name");
        elementsToChange.forEach((element) => {
            if (carrinhoCheckbox.checked) {
                element.classList.add("checked");
                newItemDiv.classList.add("checked");
            } else {
                element.classList.remove("checked");
                newItemDiv.classList.remove("checked");
            }
        });
        carrinhoCheckbox.style.cursor = "pointer"; // Restaure o estilo padrão do cursor
    }
});

// Evento de clique no botão de exclusão
deleteButtonDiv.addEventListener("click", function () {
    // Exibir uma mensagem de confirmação
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este item?");

    // Verificar se o usuário confirmou a exclusão
    if (confirmDelete) {
        // Remova o item da seção de conteúdo
        content.removeChild(newItemDiv);
        content.removeChild(deleteButtonDiv);

        // Calcule o valor total do item e atualize o valor total geral
        const valorItem = parseFloat(valorItemInput.value) || 0;
        const quantItem = parseFloat(quantItemInput.value) || 0;
        const valorItemTotal = calcularValorItem(valorItem, quantItem);
        valorTotalGeral -= valorItemTotal;

        // Chame a função para atualizar o valor total exibido no span
        atualizarValorTotal();
    }
});

});
});