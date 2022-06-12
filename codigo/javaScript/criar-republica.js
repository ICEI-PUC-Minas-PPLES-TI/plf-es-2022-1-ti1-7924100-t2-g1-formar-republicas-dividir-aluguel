( ()=>{
    let btnCriar = document.querySelector("#btn-cadastrar");

    window.onload = () =>{
        ApresentarCadastro();
    }

    btnCriar.addEventListener("click", (event)=>{
    //Não atualizar a página
    event.preventDefault();
 
    //Selecionar formulário
    let formulario = document.querySelector(".formulario-criar-republica");
    
    if(ValidarFormulario()){
    let novaRepublica = ExtrairInformacoes(formulario); 

    CriarRepublica(novaRepublica);

    ApresentarCadastro();

    formulario.reset();
   }

   else{
       return;
   }
});

    function ExtrairInformacoes(formulario){
        let republica = {
            id: GerarIdAutomatico(),
            nome: formulario.nome.value,
            numero: formulario.numero.value,
            descricao: formulario.descricao.value,
            local: formulario.localizacao.value,
            valor: formulario.valor.value,
            status: formulario.status.value
        };

        return republica
    }

    function CarregarRepublicas(){
        let dadosRepublicas = sessionStorage.getItem('db');
        let objRepublica = {};

        if(dadosRepublicas != null){
            objRepublica = JSON.parse(dadosRepublicas);
        }

        else{
            objRepublica = { republica:[]}
        };

        return objRepublica;
    }

    function CriarRepublica(republica){
        let objRepublica = CarregarRepublicas();
        objRepublica.republica.push(republica);
        
        let novaRepublica = objRepublica;
        SalvarRepublica(novaRepublica);
    }

    function SalvarRepublica(republica){
        sessionStorage.setItem('db', JSON.stringify(republica));
        alert("República criada com sucesso.")
    }

    function ValidarFormulario(){
        let nome = document.forms["form"]["nome"].value;
        let numero = document.forms["form"]["numero"].value;
        let descricao = document.forms["form"]["descricao"].value;
        let localizacao = document.forms["form"]["localizacao"].value;
        let valor = document.forms["form"]["valor"].value;

        if (nome == "" || numero == "" || descricao == "" || localizacao == "" || valor == ""){
            alert("Preencha todo o formúlario");
            return false;
        }

        return true;
    }

    function GerarIdAutomatico(){
        let objRepublica = CarregarRepublicas();
        let id = objRepublica.republica.length;
        return id+1;
    }

    function ApresentarCadastro(){
        let republicas = CarregarRepublicas();
        MontarRepublica(republicas)
    }

    function MontarRepublica(republica){
        let tabela = document.querySelector("#tabela-republica");
        tabela.innerHTML = " ";
    
        republica.republica.forEach(element => {
            let novaLinha = document.createElement("tr");

            novaLinha.appendChild(CriarCampo(element.id));
            novaLinha.appendChild(CriarCampo(element.nome));

            tabela.appendChild(novaLinha);
        });
    }

    function CriarCampo(conteudo){
        let novoCampo = document.createElement("td");
        novoCampo.textContent = conteudo; 
        return novoCampo;
    }
})()