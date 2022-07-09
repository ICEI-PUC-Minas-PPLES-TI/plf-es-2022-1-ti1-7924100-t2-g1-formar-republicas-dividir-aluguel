$(document).ready(function () {
    $('#republica').DataTable();
});

const readRepublica = ()=>{
    return JSON.parse(sessionStorage.getItem('db_republica'));
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
    });
}

window.onload = atualizarTabela();