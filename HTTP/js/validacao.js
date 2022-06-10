/*
* Validações para o método de acesso HTTP
* @author Samuel Chiodini
*/


/**
 * Variaveis do componente HTML select, suas Options e o button de 'Acessar'
 */
var oSelect           = document.getElementById('select');
var aOptionLinkAcesso = oSelect.options[oSelect.selectedIndex].value;
var oButton           = document.getElementsByClassName('btn-enviar');

/**
 *  Variaveis dos componentes HTML input's checkbox de 'Opções de Acesso'
 */
var oOk           = document.getElementById('ok');
var oSemConexao   =  document.getElementById('sem-conexao');
var oServidorOff  =  document.getElementById('servidor-off');
var aOpcoesAcesso = [oOk, oSemConexao, oServidorOff];

/**
 * Variaveis dos Links das opções de 'Links de Acesso'
 */
var sLinkFacebook  = 'www.facebook.com';
var sLinkInstagram = 'www.instagram.com';
var sLinkYouTube   = 'www.youtube.com';

/**
 * Variáveis dos botões da tela do Cliente
 */
var oButtonOk = document.getElementById('button-ok');
var oButtonX  = document.getElementById('button-x');

oButtonOk.hidden = true;
oButtonX.hidden  = true;

desativaBotao(true, 'botao-ir');


/**
 * Metodo que valida os dados selecionados.
 */
function verificaDadosInformados(){
   
        if(aOptionLinkAcesso){
            if(verificaQuantidadeOpcaoAcessoSelecionada()){
                verificaTipoAcesso();
            };
        }
        else{
            window.alert('Escolha um Link de Acesso!');
        }
}

/**
 * Metodo para verifica se foi selecionado somente UMA 'Opção de Acesso'.
 */
function verificaQuantidadeOpcaoAcessoSelecionada() {
    var iChecked = 0;

    if(aOpcoesAcesso){
        for(var i = 0; i < aOpcoesAcesso.length; i++){
            if(aOpcoesAcesso[i].checked == true){
                iChecked = iChecked+1;
            }
        }
        if(iChecked > 1){
            window.alert('Escolha somente uma opção');
            exit();
        }else if (iChecked < 1){
            window.alert('Selecione uma opção de acesso');
            exit();
        }

        return true;
    }else{

        return false;
    }
  }

  /**
   * Metodo para verificar qual vai ser o tipo de request
   */
function verificaTipoAcesso(){
    switch(true){
        case oOk.checked === true:
            conexaoOK();
            break;
        case oSemConexao.checked === true:
            semConexao();
            break;
        case oServidorOff.checked === true:
            servidorOff();
            break;
    }
}

function verificaTipoLinkAcesso() {
    aOptionLinkAcesso = oSelect.options[oSelect.selectedIndex].value;
    switch(true){
        case aOptionLinkAcesso == '1':
            return sLinkFacebook;
        case aOptionLinkAcesso == '2':
            return sLinkYouTube;
        case aOptionLinkAcesso == '3':
            return sLinkInstagram;
    }
  }

function conexaoOK(){
    desativaBotao(false, 'botao-ir');
    var setRequestCliente = document.getElementById('text-cliente');
    var getRequestCliente = `GET index.html HTTP/1.1 host:${verificaTipoLinkAcesso()} accept: text/html,application/xhtml+xml,application/xml;q=0.9,*;q=0.8 accept_encoding: gzip, deflate, br accept_language: pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3 user_agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Firefox/46.0`;

    setRequestCliente.innerText = getRequestCliente;
}

function semConexao(){
    desativaBotao(false, 'botao-ir');
    var setRequestCliente = document.getElementById('text-cliente');
    var getRequestCliente = `GET index.html HTTP/1.1 host:${verificaTipoLinkAcesso()} accept: text/html,application/xhtml+xml,application/xml;q=0.9,*;q=0.8 accept_encoding: gzip, deflate, br accept_language: pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3 user_agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Firefox/46.0`;

    setRequestCliente.innerText = getRequestCliente;
}

function servidorOff() {
    desativaBotao(false, 'botao-ir');
    var setRequestCliente = document.getElementById('text-cliente');
    var getRequestCliente = `GET index.html HTTP/1.1 host:${verificaTipoLinkAcesso()} accept: text/html,application/xhtml+xml,application/xml;q=0.9,*;q=0.8 accept_encoding: gzip, deflate, br accept_language: pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3 user_agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Firefox/46.0`;

    setRequestCliente.innerText = getRequestCliente;
}

/**
 * Valida e seta os dados para o servidor, conforme requisição selecionada
 * 
 * @param {*} getResponseServidor 
 */
function enviaServidor(getResponseServidor){
    verificaQuantidadeOpcaoAcessoSelecionada();
    desativaBotao(true, 'botao-acessar');
    getDataAtual();
    aOptionLinkAcesso = oSelect.options[oSelect.selectedIndex].value;
   
    switch(true){
        case oOk.checked === true:
            setOk();
            break;
        case oSemConexao.checked === true:
            setSemConexao();
            break;
        case oServidorOff.checked === true:
            setServidorOff();
            break;
    }
}

function setOk() {
    var setResponseServidor = document.getElementById('text-servidor');
    var getResponseServidor = 'HTTP/1.1 200 OK date: ' + 'Mon Mar ' + getDataAtual().getDay() + ' ' + getDataAtual().getHours() + ':' + getDataAtual().getMinutes() + ':' + getDataAtual().getSeconds() + ' BRT ' + getDataAtual().getFullYear() + ' content-type: text/html; charset=UTF-8 transfer-encoding: chunked connection: close server:  Microsoft-IIS/4.0 content-encoding: gzip';
    desativaBotao(true, 'botao-ir');
    setResponseServidor.innerText = getResponseServidor;
    adicionaBotaoResponse(true);
}
function setSemConexao() {
    var setResponseServidor = document.getElementById('text-servidor');
    var getResponseServidor = 'HTTP/1.1 408 REQUEST TIMED OUT date: ' + 'Mon Mar ' + getDataAtual().getDay() + ' ' + getDataAtual().getHours() + ':' + getDataAtual().getMinutes() + ':' + getDataAtual().getSeconds() + ' BRT ' + getDataAtual().getFullYear() + ' content-type: text/html; charset=UTF-8 transfer-encoding: chunked connection: close server:  Microsoft-IIS/4.0 content-encoding: gzip';
    desativaBotao(true, 'botao-ir');
    setResponseServidor.innerText = getResponseServidor;
    adicionaBotaoResponse(false);
}
function setServidorOff() {
    var setResponseServidor = document.getElementById('text-servidor');
    var getResponseServidor = 'HTTP/1.1 502 BAD GATEWAY date: ' + 'Mon Mar ' + getDataAtual().getDay() + ' ' + getDataAtual().getHours() + ':' + getDataAtual().getMinutes() + ':' + getDataAtual().getSeconds() + ' BRT ' + getDataAtual().getFullYear() + ' content-type: text/html; charset=UTF-8 transfer-encoding: chunked connection: close server:  Microsoft-IIS/4.0 content-encoding: gzip';
    desativaBotao(true, 'botao-ir');
    setResponseServidor.innerText = getResponseServidor;
    adicionaBotaoResponse(false);
}

/**
 * Método para mostrar o Button conforme a requisição
 * 
 * @param {*} bResponse 
 */
function adicionaBotaoResponse(bResponse = true) {
    if(bResponse){
       oButtonOk.hidden = false;
    }else{
        oButtonX.hidden = false;
    }
}

/**
 * Método para desativar Button
 * 
 * @param {*} bAtivo 
 * @param {*} nameButton 
 */
function desativaBotao(bAtivo = false, nameButton) {
    var getBotaoAcessar = document.getElementById(nameButton);
    getBotaoAcessar.disabled = bAtivo;
  }

/**
 * Método para criar o objeto para manipular a data atual
 * 
 * @returns Object
 */
function getDataAtual() {
    var now = new Date();
    return now;
}

/**
 * Método para recarregar a página, só para limpar os dados
 */
function recarregaPagina() {
    location.reload();
  }