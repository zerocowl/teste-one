   (function() {
       $(document).ready(function() {
           $('.slides').css("heigth", "460px");
           //Carrega o carrinho e os itens dele
           //   loadCart();
           //   updateCart();
           //var desc = truncate($(".u-descricao").text(),3);
           //   $(".u-descricao").text(desc);
           $('.slider').slider({
               full_width: true
           });
           $('.button-collapse').sideNav(); //menu mobile
           $(".dropdown-button").dropdown();
           $('select').material_select();
           $('#textarea1-msg').trigger('autoresize');


           //Quantidade de itens no carrinho
           //$(".qt-itens").text(qt);
       });


       $(".cart-panel").css('display', 'none'); //controle do carrinho na home
       $(".materialboxed").materialbox();

       //Carrinho
       $(".cart-action").click(function() {
           $(".cart-panel").toggle();
       });
   }());