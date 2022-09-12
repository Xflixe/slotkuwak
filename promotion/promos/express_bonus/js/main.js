$(document).ready(function(){
    let h = $('body').height();
    window.parent.setHeight(h+'px');

    setTimeout(function(){
        let h = $('body').height();
        window.parent.setHeight(h+'px');
    },1500)

    //$('.pr_head').attr('pr_head',window.parent.getLang())

})