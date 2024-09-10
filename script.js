const input = document.querySelector('#input');
const number = document.querySelector('#input_number');
const button = document.querySelector('#button');
const listComplet = document.querySelector('.list-tasks');

// HORARIO
const agora = new Date();

let dia = agora.getDate();
let mes = agora.getMonth() + 1;
const ano = agora.getFullYear();
let horas = agora.getHours();
let minutos = agora.getMinutes();

// Adicionar zero à frente do dia e do mês, se necessário
dia = dia < 10 ? `0${dia}` : dia;
mes = mes < 10 ? `0${mes}` : mes;

// Adicionar zero à frente das horas e minutos, se necessário
horas = horas < 10 ? `0${horas}` : horas;

// Determinar AM ou PM
const periodo = horas >= 12 ? 'pm' : 'am';

// Converter para formato de 12 horas
horas = horas % 12;
horas = horas ? horas : 12; // Se for 0, define como 12

// Formatar a data e hora como uma string
const dataFormatada = `${dia}/${mes}/${ano}`;
const horaFormatada = `${horas}:00 ${periodo}`;

// Exibir data e hora no documento
document.querySelector('#date').innerHTML = `${dataFormatada}`;
document.querySelector('#hour').innerHTML = `${horaFormatada}`;




let listItems = [];

// PEGAR O VALOR DO INPUT E ADICIONAR NA VARIAVEL
function inputValue() {
    if (input.value === '') {
        mansage('Digite uma tarefa e tente novamente', '#dc2626');
        return;
    }

    if (number.value === '') {
        mansage('Ops, adicione um horário', '#dc2626');
        return;
    }

    if (number.value > 24) {
        mansage('Adicione um horario válido', '#dc2626');
        return;
    }

    listItems.push({
        tarefa: input.value,
        number: number.value,
        status: false
    });

    // para limpar o input
    input.value = '';
    number.value = '';

    // apos ele adicionar na array ele vai chamar minha outra função
    viewTask();
}
button.addEventListener('click', inputValue);


// MOSTRAR TAREFAS
function viewTask() {
    let newLi = '';

    // forEach percorre minha array
    listItems.forEach((item, index) => {
        newLi = newLi + `
        <li class="task ${item.status && "done"}">
            <i class="bi bi-check-lg" onclick="concludeTask(${index})"></i>

            <p>${item.tarefa}</p>
            
            <p>${item.number}h</p>
            
            <i class="bi bi-trash" onclick="dellItem(${index})"></i>

        </li>`
    })

    listComplet.innerHTML = newLi;

    // GUARDAR OS DADOS DIRETAMENTO NO NAVEGADOR COM LOCAL STPRGE
    localStorage.setItem('list', JSON.stringify(listItems));
}

// CONCLUIR TAREFA
function concludeTask(index) {
    listItems[index].status = !listItems[index].status;

    viewTask();
}

// DELETAR ITEM
function dellItem(index) {
    listItems.splice(index, 1);

    viewTask();
}

// RECARREGAR TAREFAS
function uppdate() {
    const taskLocalStorage = localStorage.getItem('list');

    if (taskLocalStorage) {
        listItems = JSON.parse(taskLocalStorage);
    }

    viewTask();
}
uppdate();


// MENSAGEM DE ERRO
function mansage(text, background) {
    Toastify({
        text: text,
        duration: 3000,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();
}



// Verifica se já existe um nome armazenado no localStorage
let name = localStorage.getItem('userName');

if (!name) {
    // Se não houver nome armazenado, exibe o prompt e armazena o nome
    name = prompt('Qual seu nome?');
    localStorage.setItem('userName', name);
}

// Exibe o nome no elemento com ID 'idName'
document.querySelector('#idName').innerHTML = name;
