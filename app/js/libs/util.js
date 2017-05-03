       function fnInvoke(_url, _type, _dataType, _data, _async, _callback) {
           $.ajax({
               url: _url,
               type: _type,
               dataType: _dataType,
               contentType: "application/json; charset=utf-8",
               data: _data,
               async: _async,
               traditional: true,
               success: function(data) {
                   if (_callback)
                       _callback(data);
               }
           });
       }

       function fnShowConfirmDialog(mensagem, isInputDialog, placeholder) {
           if (isInputDialog) {
               AbrirModal('modalConfirm');
               $("#texto-modal").attr("placeholder", placeholder);
           } else

               $("#modalConfirm h5").hide();

           $('#modalConfirm h5').html(mensagem);
           AbrirModal('modalConfirm');

           $("#btnNao").on("click", function() {
               $('#modalConfirm').modal('close');
           });
       }

       function fnShowMessageAdmin(mensagem) {

           $('#modalConfirm h5').html(mensagem);
           AbrirModal('modalConfirm');

           $("#btnOK").on("click", function() {
               $('#modalConfirm').modal('close');
           });
       }

       function fnShowMessage(mensagem, isConfirmDialog) {
           debugger;
           if (isConfirmDialog) {
               $('#modalConfirm h5').html(mensagem);
               AbrirModal('modalConfirm');
           } else {
               $('#modalAlert h5').html(mensagem);
               $(function() {
                   AbrirModal('modalAlert');
               });
           }

       }

       Array.prototype.contains = function(item) {
           debugger;
           for (var i = 0; i < this.length; i++) {
               if (typeof(this[i]) == "object") {
                   if (JSON.stringify(this[i]) == JSON.stringify(item))
                       return true;
               } else
               if (this[i] == item)
                   return true;
           }

           return false;
       }

       function ConverterData(data) {
           var regex = /-?\d+/;
           var m = regex.exec(data)[0];
           return new Date(parseInt(m)).toLocaleString();
       }

       //Recebe id do modal a ser aberto
       function AbrirModal(modal) {
           $("#" + modal).modal('open');
       }

       //Recebe id do modal e retorna true ou falso pro clique
       function confirmModal(but, modal) {
           var res = false;
           $('#' + modal).openModal();
           $('#' + modal + 'Yes').click(function() {
               $('#' + modal).closeModal();
               res = true;
           });
           return res;
       }



       //Recebe o CEP e retorna o endereço
       function busca_cep(cep, camp_endereco, camp_bairro, camp_cidade, camp_uf) {
           function limpa_formulario_cep() {
               // Limpa valores do formulário de cep.
               $("#" + camp_endereco).val("");
               $("#" + camp_bairro).val("");
               $("#" + camp_cidade).val("");
               $("#" + camp_uf).val("");
           }
           //Quando o campo cep perde o foco.
           //$("#" + cep).blur(function () {
           cep = cep.replace(/\D/g, '');

           if (cep != "") {
               //Expressão regular para validar o CEP.
               var validacep = /^[0-9]{8}$/;
               //Valida o formato do CEP.
               if (validacep.test(cep)) {

                   //Preenche os campos com "..." enquanto consulta webservice.               
                   $("#" + camp_endereco).val("...");
                   $("#" + camp_bairro).val("...");
                   $("#" + camp_cidade).val("...");
                   $("#" + camp_uf).val("...");

                   //Consulta o webservice viacep.com.br/
                   $.getJSON("http://viacep.com.br/ws/" + cep + "/json/", function(dados) {

                       if (!("erro" in dados)) {
                           $("#" + camp_endereco).val(dados.logradouro);
                           $("#" + camp_bairro).val(dados.bairro);
                           $("#" + camp_cidade).val(dados.localidade);
                           $("#" + camp_uf).val(dados.uf);

                       } else {
                           //CEP pesquisado não foi encontrado.                        

                           alert("CEP não encontrado.");
                           limpa_formulario_cep();
                       }
                   });
               } else {
                   //cep é inválido.              
                   alert("Formato de CEP inválido.");
                   limpa_formulário_cep();
               }
           } else {
               //cep sem valor, limpa formulário.
               limpa_formulário_cep();
           }
           //});
       }


       //Truncate
       function truncate(text, length) {
           var txt = text.substring(0, length);
           return txt;
       }

       //Mascara telefone
       function mascTelefone(campo) {
           $("#" + campo).mask('(00) 0000-00009');
           $("#" + campo).blur(function(event) {
               if ($(this).val().length == 15) { // Celular com 9 dígitos + 2 dígitos DDD e 4 da máscara
                   $(this).mask('(00) 00000-0009');
               } else {
                   $(this).mask('(00) 0000-00009');
               }
           });
       }

       function mascQuant(num) {
           var er = /[^1-9.]/;
           er.lastIndex = 0;
           var campo = num;
           if (er.test(campo.value) || campo.value == "") {
               campo.value = "1";
           }
       }