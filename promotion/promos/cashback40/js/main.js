window.parent.setHeader(false);
window.parent.setFooter(false);

$(document).ready(function(){
    let h = $('body').height();
    window.parent.setHeight(h+'px');

    $('.promo-collapse-head').bind('click', function (e) {
        e.stopPropagation();
        if ($(this).closest('.promo-collapse').hasClass('active')) {
            console.log(1)
            $(this).siblings('div.promo-collapse-body').slideUp('fast');
        } else{
            console.log(1)
            $(this).siblings('div.promo-collapse-body').slideDown('fast');
        }
        $(this).closest('.promo-collapse').toggleClass('active');
    })
})