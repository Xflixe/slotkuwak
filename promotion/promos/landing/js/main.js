window.parent.setHeader(false);
window.parent.setFooter(false);

$(document).ready(function(){
    let h = $('body').height();
    window.parent.setHeight(h+'px');

    //$('.sticky').offset().top
    $( top.window).scroll(function() {
        if(top.window.scrollY > 400){
            $('.fixed-element').addClass('active').css('top',top.window.scrollY)
        }else{
            $('.fixed-element').removeClass('active')
        }
    });

})