var padraoCorEscolhida = [];
var padraoDoJogo = [];
var corBotao = ["vermelho", "azul", "verde","amarelo"];

var nivelDoJogo = 0;
var iniciado = "off";

$(document).keyup(function(){
    if (iniciado == "off"){
        novaSequencia();
        $("h1").html("Nível " + nivelDoJogo); 
    } 
})

$("button").click(function(){
    
    var corEscolhida = $(this).attr("id");
    padraoCorEscolhida.push(corEscolhida);

    tocarSom(corEscolhida);
    animacaoPressionado(corEscolhida);
    checandoSequencia(padraoCorEscolhida.length-1);
})


function novaSequencia(){
    nivelDoJogo ++
    padraoCorEscolhida = []
    var sorteio = Math.floor( Math.random() * 4);
    corSorteada = corBotao[sorteio];
    padraoDoJogo.push(corSorteada);

    $("#" + corSorteada).fadeIn(100).fadeOut(100).fadeIn(100);

    iniciado = "on";

    $("h1").html("Nível " + nivelDoJogo);

    tocarSom(corSorteada);
}

function tocarSom(nome){
    var audio = new Audio("../sounds/" + nome + ".mp3");
    audio.play();
}

function animacaoPressionado (corAtual){
    $("#" + corAtual).addClass("pressionado");
    setTimeout(function(){
        $("#" + corAtual).removeClass("pressionado");
    }, 100);
}

function checandoSequencia(nivelAtualDoJogo){
    
    if (padraoCorEscolhida[nivelAtualDoJogo] == padraoDoJogo[nivelAtualDoJogo]){
        if (padraoCorEscolhida.length == padraoDoJogo.length){
            setTimeout(function() {
                novaSequencia()
            }, 1000);
        }
    }else{
        //alert("Erro!");
        var audio = new Audio("../sounds/erro.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over! Pressione qualquer tecla para reiniciar.")
        $(document).keyup(function(){
        location.reload();
        })
    }
}
