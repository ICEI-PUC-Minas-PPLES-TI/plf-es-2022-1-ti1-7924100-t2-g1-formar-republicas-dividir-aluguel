(()=>{

    let dropdown = document.querySelector(".dropdown-menu");
    let simples = dropdown.querySelector(".item-simples");
    let completo = dropdown.querySelector(".item-completo");

    window.onload= ()=>{

    let republicas = CarregarRepublicas();

    MontarRepublicaSimples(republicas);

    };

    simples.addEventListener("click",()=>{
        let republicas = CarregarRepublicas();

        MontarRepublicaSimples(republicas);
    });

    completo.addEventListener("click",()=>{
        let republicas = CarregarRepublicas();

        MontarRepublicaCompleta(republicas);
    });

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

    function MontarRepublicaSimples(republica){
        let caixaRepublicas = document.querySelector("#caixa__republicas");
        let html = " ";
        caixaRepublicas.innerHTML = " ";
    
        republica.republica.forEach(element => {
            let nome = element.nome;
            let descricao = element.descricao;
            let txt = `<div class="col-sm-12 col-md-6 col-lg-4 cartao">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${nome}</h5>
                                    <p class="card-text">${descricao}</p>
                                </div>
                            </div>
                        </div>`
            html  = " " + html + " \n" + txt
            caixaRepublicas.innerHTML = html;
        });
    }

    function MontarRepublicaCompleta(republica){
        let caixaRepublicas = document.querySelector("#caixa__republicas");
        let html = " ";
        caixaRepublicas.innerHTML = " ";
    
        republica.republica.forEach(element => {
            let id = element.id;
            let nome = element.nome;
            let numero = element.numero;
            let descricao = element.descricao;
            let local = element.local;
            let valor = element.valor;
            let status = element.status;

            let txt = `<div class="col-sm-12 col-md-6 col-lg-4 cartao">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${id}</h5>
                                    <p class="card-text">Nome: ${nome}<br> Integrantes: ${numero}<br> Localização: ${local}<br> Valor: ${valor}<br> Status: ${status}<br> Descrição: ${descricao}</p>
                                </div>
                            </div>
                        </div>`
            html  = " " + html + " \n" + txt
            caixaRepublicas.innerHTML = html;
        });
    }
})()
