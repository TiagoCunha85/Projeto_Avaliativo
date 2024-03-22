
let Nome = document.querySelector('#nome');
let Especialidade = document.querySelector('#especialidade');
let CRM = document.querySelector('#crm');
let CPF = document.querySelector('#cpf');
let Endereco = document.querySelector('#endereco');
let Email = document.querySelector('#email');
let Telefone = document.querySelector('#telefone');
let Salario = document.querySelector('salario');
let Horario = document.querySelector('horario');
let Plantao = document.querySelector('plantao');
let btnSalvar = document.querySelector('#btnSalvar');
let tbody = document.querySelector('tbody');


let lista_cadastros;
let id;


function openTela(editar = false, indice = 0){
   openTela.classList.add('no_css');

    openTela.onclick = e =>{
        if(e.target.className.indexOf('tela-sessaoprincipal')!== -1){
            openTela.classList.remove('no_css');
        }
    }
    if(editar){
        Nome.value = lista_cadastros[indice].nome;
        Especialidade.value = lista_cadastros[indice].especialidade;
        CRM.value = lista_cadastros[indice].crm;
        CPF.value = lista_cadastros[indice].cpf;
        Endereco.value = lista_cadastros[indice].endereco;
        Email.value = lista_cadastros[indice].email;
        Telefone.value = lista_cadastros[indice].telefone;
        Salario.value = lista_cadastros[indice].salario;
        Horario.value = lista_cadastros[indice].horario; 
        Plantao.value = lista_cadastros[indice].plantao;
        id = indice;
    }else{
        Nome.value='';
        Especialidade.value='';
        CRM.value='';
        CPF.value='';
        Endereco.value= '';
        Email.value='';
        Telefone.value='';
        Salario.value='';
        Horario.value='';
        Plantao.value='';
        

    }
}
function editItem(indice){
    openTela(true, indice);
}

function deleteItem(indice){
    lista_cadastros.splice(indice, 1);
    setItensBD();
    loadItens();
}
function inserirItem(item, indice){
    let tr = document.createElement('tr');
    tr.innerHTML= `
    <td>${item.nome}</td>
    <td>${item.especialidade}</td>
    <td>${item.crm}</td>
    <td>${item.endereco}</td>
    <td>${item.email}</td>
    <td>${item.telefone}</td>
    <td>${item.salario}</td>
    <td>${item.horario}</td>
    <td>${item.plantao}</td>
    <td class = "acao">
    <button onclick="editItem(${indice}")> Editar </button></td>
    <td class = "acao">
    <button onclick="editItem(${indice}")> Apagar </button></td>
    `
    tbody.appendChild(tr);
    }
    btnSalvar.onclick = e =>{
        if (!Nome.value || !Especialidade.value || !CRM.value || !CPF.value || !Endereco.value || !Email.value || !Telefone.value || !Salario.value || !Horario.value || !Plantao.value){
        return;
        }
        e.preventDefault();
        if (id !== undefined){
            lista_cadastros[id].nome = Nome.value;
            lista_cadastros[id].especialidade = Especialidade.value;
            lista_cadastros[id].crm = CRM.value;
            lista_cadastros[id].cpf = CPF.value;
            lista_cadastros[id].endereco = Endereco.value;
            lista_cadastros[id].email = Email.value;
            lista_cadastros[id].telefone = Telefone.value;
            lista_cadastros[id].salario = Salario.value;
            lista_cadastros[id].horario = Horario.value;
            lista_cadastros[id].plantao = Plantao.value;
          

        }else{
            lista_cadastros.push({'nome': Nome.value,'especialidade': Especialidade.value, 'crm': CRM.value, 'cpf': CPF.value, 'endereco': Endereco.value, 'email': Email.value, 'telefone': Telefone.value, 'salario': Salario.value, 'horario': Horario.value, 'plantao': Plantao.value,})
        }
        setItensBD();
        openTela.classList.remove('no_css');
        loadItens();
    }
    function loadItens(){
        lista_cadastros = getItensBD();
        tbody.innerHTML='';
        lista_cadastros.forEach((item, indice)=> {
            inserirItem(item, indice);
        });
    }

const getItensBD = () =>JSON.parse(localStorage.getItem('dbmedicos'))??[]
const setItensBD = () =>localStorage.setItem
                    ('dbmedicos', JSON.stringify(lista_cadastros))
loadItens();