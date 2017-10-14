$(document).ready(function () {
    $(".load-menu").load("menu.html", function () {
        $("button.menu, .fecha-menu").click(function () {
            if ($('button.menu').hasClass('menu-aberto')) {
                $('.nav-floating').stop().fadeOut(300);
                $('.itens-menu').stop().removeClass('rotated').animate({
                    top: '100%'
                }, 300);
                $('button.menu').removeClass("menu-aberto");
            } else {
                $('.nav-floating').fadeIn(300);
                $('.itens-menu').stop().addClass('rotated').animate({
                    top: '0'
                }, 300);
                $('button.menu').addClass("menu-aberto");
            }
        });
        $(".nav-floating").css('visibility', 'visible').css('display', 'none');
    });
    
});

document.addEventListener('deviceready', function () {
    StatusBar.backgroundColorByHexString('#000');
});