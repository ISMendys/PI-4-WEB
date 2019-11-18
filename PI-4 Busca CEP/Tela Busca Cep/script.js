

function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
    
function pesquisacep() {
    
    var valor = window.document.getElementById('cep')
    valor = valor.value
    
   

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
        
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            
           
            //Preenche os campos com "carregando..." enquanto consulta webservice.
            document.getElementById('rua').value="carregando...";
            document.getElementById('bairro').value="carregando...";
            document.getElementById('cidade').value="carregando...";
            document.getElementById('uf').value="carregando...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            window.alert('[Error] CEP invalido')
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
        window.alert('[Error] CEP invalido')
    }
}


function initMap() {
    var options = {
        zoom: 8,
        center: {lat: -12.8209212, lng: -38.4747486}

    }
    
  map = new google.maps.Map(document.getElementById('map'),options);

  var marker = new google.maps.Marker({
    position:{lat:-12.8209212,lng:-38.4747486},
    map:map,
    icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    
  });

};

function getLL(){
    var valor = window.document.getElementById('cep')
    valor = valor.value

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    alert('cep - ',cep);
    var lat = '';
    var lng = '';
    var address = {cep};
    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
    } else {
        alert("Não foi possivel obter localização: " + status);
    }
    });
    alert('Latitude: ' + lat + ' Logitude: ' + lng);

};