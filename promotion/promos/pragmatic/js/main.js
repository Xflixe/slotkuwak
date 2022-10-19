//window.parent.setHeader(false);
//window.parent.setFooter(false);

$(document).ready(function(){
    let h = $('body').height();
    window.parent.setHeight(h+'px');

    $('.promo-collapse-head').bind('click', function (e) {
        e.stopPropagation();
        if ($(this).closest('.promo-collapse').hasClass('active')) {
            $(this).siblings('div.promo-collapse-body').slideUp('fast');
        } else{
            $(this).siblings('div.promo-collapse-body').slideDown('fast');
        }
        $(this).closest('.promo-collapse').toggleClass('active');

        if(window.top.setHeader){
            setTimeout(function(){
                window.parent.setHeight($('body').height()+'px');
            },500)
        }
    })

    $('.mw').attr('data-lang',window.top.getLang())

    $('.promo-slot-slider').slick({
        speed: 300,
        dots: false,
        centerMode: true,
        infinite: true,
        variableWidth: true,
        nextArrow: '<div class="arr-btn slick-next"></div>',
        prevArrow: '<div class="arr-btn slick-prev"></div>',
        slidesToShow: 5,
        slidesToScroll: 1,
        focusOnSelect: true,
        initialSlide: 1
    }); // << call slick  slider

})