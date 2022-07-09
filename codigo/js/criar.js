const readRepublica = ()=>{
    return JSON.parse(sessionStorage.getItem('db_republica'));
}

const createRepublica = (republica)=>{
    let dbRepublica = readRepublica();

    if(dbRepublica == null){
        dbRepublica = [];
    }

    dbRepublica.push(republica);   

    sessionStorage.setItem('db_republica', JSON.stringify(dbRepublica));
};

const updateRepublica = (republica, id)=>{
    const dbRepublica = readRepublica();
    dbRepublica[id] = republica;

    sessionStorage.setItem('db_republica', JSON.stringify(dbRepublica));
}

const deleteRepublica = (id)=>{
    const dbRepublica = readRepublica();
    dbRepublica.splice(id,1);

    sessionStorage.setItem('db_republica', JSON.stringify(dbRepublica));
}

const validarCampo = ()=>{
    return document.querySelector('.formulario-criar-republica').reportValidity();
}

const gerarIdAutomatico = ()=>{
    let dbRepublica = readRepublica();

    if(dbRepublica == null){
        return 0;
    }

    return dbRepublica.length;
}

const saveRepublica = ()=>{
    if(validarCampo()){
        const formulario = document.querySelector(".formulario-criar-republica");

        const republica = {
            id: gerarIdAutomatico(),
            nome: formulario.nome.value,
            numero: formulario.numero.value, 
            descricao: formulario.descricao.value,
            local: formulario.localizacao.value,
            valor: formulario.valor.value,
            status: formulario.status.value,
        };

        createRepublica(republica);
        atualizarTabela();
        alert('República cadastrada');
    }
}

const atualizarTabela = ()=>{
    const dbRepublica = readRepublica();

    if(dbRepublica == null){
        return;
    }

    let tabelaRepublicas = document.getElementById('tabela-republica');

    tabelaRepublicas.innerHTML = ' ';

    dbRepublica.forEach(republica => {
        const novaLinha = document.createElement('tr');

        novaLinha.innerHTML = `
            <td>${republica.id}</td>
            <td>${republica.nome}</td>
            <td>${republica.numero}</td>
            <td>${republica.local}</td>
            <td>${republica.valor}</td>
            <td>${republica.status}</td>
        ` ;

        tabelaRepublicas.appendChild(novaLinha);
        novaLinha.classList.add(republica.id);
    });
}

const preencherFormulario = (event)=>{
    if(event.target.cellIndex == 0){
        let formulario = document.querySelector(".formulario-criar-republica");
        let id = event.target.textContent;
        let dbRepublica = readRepublica();
 
        formulario.id.value = dbRepublica[id].id;
        formulario.nome.value = dbRepublica[id].nome;
        formulario.numero.value = dbRepublica[id].numero;
        formulario.descricao.value = dbRepublica[id].descricao;
        formulario.localizacao.value = dbRepublica[id].local;
        formulario.valor.value = dbRepublica[id].valor;
        formulario.status.value = dbRepublica[id].status;

    }
}

const editRepublica = ()=>{
    if(validarCampo()){
        const formulario = document.querySelector(".formulario-criar-republica");

        const republica = {
            id: formulario.id.value,
            nome: formulario.nome.value,
            numero: formulario.numero.value, 
            descricao: formulario.descricao.value,
            local: formulario.localizacao.value,
            valor: formulario.valor.value,
            status: formulario.status.value,
        };

        updateRepublica(republica, formulario.id.value);
        atualizarTabela();
        alert('República atualizada');
    }
}

const excluirRepublica = ()=>{
    const formulario = document.querySelector(".formulario-criar-republica");
    deleteRepublica(formulario.id.value);
    alert('República excluida com sucesso');
}

atualizarTabela();

// [Eventos]
let cadastrar = document.getElementById('btn-cadastrar');
let editar = document.getElementById('btn-editar');
let excluir = document.getElementById('btn-excluir');
let tabela = document.getElementById('tabela-republica');

cadastrar.addEventListener('click', saveRepublica);
tabela.addEventListener('click', preencherFormulario);
editar.addEventListener('click', editRepublica);
excluir.addEventListener('click', excluirRepublica);