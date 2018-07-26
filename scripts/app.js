
var log = true;
log && console.log("Welcome to Letter");
var content = "Hello World!! How do you do??";

var DATA_PREFIX = "data:text/html;base64,";
var DATA_PREFIX_8 = "data:text/html;charset=utf-8;base64,";
var DATA_PREFIX_BXZE = "data:text/html;charset=utf-8;bxze64,";

var BASE64_MARKER = ';base64,';
var LZMA64_MARKER = ';bxze64,';

var getUrlVars = () => {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
    return hashes;
}


var domReady = function () {
    log && console.log("Dom loaded successfully");
    mdc.autoInit();

    [].forEach.call(document.querySelectorAll('.mdc-button'), function (surface) {
        mdc.ripple.MDCRipple.attachTo(surface);
    });

    [].forEach.call(document.querySelectorAll('.mdc-icon-toggle'), function (iconToggle) {
        mdc.iconToggle.MDCIconToggle.attachTo(iconToggle);
    });
    document.addEventListener('MDCIconToggle:change', function (evt) {
        evt.target.setAttribute('title', evt.target.getAttribute('aria-label'));
    });
    [].forEach.call(document.querySelectorAll('.mdc-ripple-surface'), function (surface) {
        mdc.ripple.MDCRipple.attachTo(surface);
    });
    [].forEach.call(document.querySelectorAll('.mdc-card__primary-action'), function (el) {
        mdc.ripple.MDCRipple.attachTo(el);
    });
    
    $('.progress').hide();
    
    stringToZip(content,(result) =>{
        log && console.log(result);
        zipToString(result,(result)=>{
            log && console.log(result);
        })
    });


};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    domReady();
} else {
    document.addEventListener("DOMContentLoaded", domReady);
}

var compressContent = (content) =>{
    log && console.log("Compressing now");
}