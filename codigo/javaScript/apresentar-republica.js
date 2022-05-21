//let btnBuscar = document.querySelector("#btn-buscar");
btnBuscar.addEventListener("click",(event)=>{

    event.preventDefault();

    let republicas = CarregarRepublicas();

    MontarRepublica(republicas);

    btnBuscar.disabled = true;

});

function MontarRepublica(republica){
    let tabela = document.querySelector("#tabela-republica");
    tabela.innerHTML = " ";
   
    republica.republica.forEach(element => {
        let novaLinha = document.createElement("tr");

        novaLinha.appendChild(CriarCampo(element.nome));
        novaLinha.appendChild(CriarCampo(element.numero));
        novaLinha.appendChild(CriarCampo(element.local));
        novaLinha.appendChild(CriarCampo(element.valor));
        novaLinha.appendChild(CriarCampo(element.status));

        tabela.appendChild(novaLinha);
    });
}

function CriarCampo(conteudo){
    let novoCampo = document.createElement("td");
    novoCampo.textContent = conteudo; 
    return novoCampo;
}