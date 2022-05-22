( ()=>{
    let btnCriar = document.querySelector("#btn-cadastrar");
    let btnBuscar = document.querySelector("#btn-buscar");

    btnCriar.addEventListener("click", (event)=>{
    //Não atualizar a página
    event.preventDefault();
  
    //Selecionar formulário
    let formulario = document.querySelector(".formulario-criar-republica");
    
   if(ValidarFormulario()){
    let novaRepublica = ExtrairInformacoes(formulario); 

    CriarRepublica(novaRepublica);

    formulario.reset();
    btnBuscar.disabled = false;
   }

   else{
       return;
   }
});

    function ExtrairInformacoes(formulario){
        let republica = {
            nome: formulario.nome.value,
            numero: formulario.numero.value,
            local: formulario.localizacao.value,
            valor: formulario.valor.value,
            status: formulario.status.value
        };

        return republica
    }

    function CarregarRepublicas(){
        let dadosRepublicas = localStorage.getItem('db');
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
        localStorage.setItem('db', JSON.stringify(republica));
        alert("República criada com sucesso.")
    }

    function ValidarFormulario(){
        let nome = document.forms["form"]["nome"].value;
        let numero = document.forms["form"]["numero"].value;
        let localizacao = document.forms["form"]["localizacao"].value;
        let valor = document.forms["form"]["valor"].value;

        if (nome == "" || numero == "" || localizacao == "" || valor == ""){
            alert("Preencha todo o formúlario");
            return false;
        }

        return true;
    }
})()