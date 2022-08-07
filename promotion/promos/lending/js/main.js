window.parent.setHeader(false);
window.parent.setFooter(false);

$(document).ready(function(){
    let h = $('body').height();
    window.parent.setHeight(h+'px');
})