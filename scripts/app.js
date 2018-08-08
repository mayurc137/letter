var log = true;
log && console.log("Welcome to Letter");
log && console.log(window.location.hash);

var DATA_PREFIX = "data:text/html;base64,";
var DATA_PREFIX_8 = "data:text/html;charset=utf-8;base64,";
var DATA_PREFIX_BXZE = "data:text/html;charset=utf-8;bxze64,";

var BASE64_MARKER = ';base64,';
var LZMA64_MARKER = ';bxze64,';

var state;
var title;
var href = window.location.href; 
var data;
var zip;
var hash = window.location.hash;
var content;
var contentUpdated = false;
var interval;
var parentLink = `https://mayurc137.github.io/letter`
var link;



if(hash){
    data = href.slice(href.indexOf('#') + 1).split('?');    
    if(data[0] == 'create'){
        state = 'new'
    }else{
        state = 'view';
    }
    
}else{
    data = ['',''];
    state = 'new';
    //updateLink('Untitled','XQAAAAIqAAAAAAAAAAAkGUmYbxARyF/m1YpoE5LmewkUWEGHN2/DCn6Pb9Bq6N3zZjOPRDwKDY/oQBj//eEQAA==');
}


var getUrlVars = () => {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
    return hashes;
}
var titleDOM = document.getElementById("title");
var contentDOM = document.getElementById("content");


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
    
    var menuEl = document.querySelector('#demo-menu');
    var menu = new mdc.menu.MDCMenu(menuEl);
    var menuButtonEl = document.querySelector('#menu-button');
    menuButtonEl.addEventListener('click', function () {
        menu.open = !menu.open;
    });


    var anchor = document.querySelector('.mdc-menu-anchor');
    // Initialize to top left.
    anchor.style.setProperty('top', '0');
    anchor.style.setProperty('right', '0');

    
    
    $('.progress').hide();
    log && console.log(state);
    log && console.log(data);
    
    $(document).on('change keydown keypress input', 'div[data-placeholder]', function () {
        
        if (this.textContent) {
            this.dataset.divPlaceholderContent = 'true';
        }
        else {
            delete (this.dataset.divPlaceholderContent);
        }
    });


    contentDOM.addEventListener("keyup", handleInput);
    titleDOM.addEventListener("keyup", handleInput);
    


    switch(state){
        case 'new':
            updateLink(null,null);
        break;
        case 'view':
            initDocument(data,(content)=>{
                log && console.log("Init Complete");
                log && console.log(content);
            });
        break;
    }
    
    /*stringToZip(content,(result) =>{
        log && console.log(result);
        zipToString(result,(result)=>{
            log && console.log(result);
        })
    });*/

    $("#generate-link").click(()=>{
        log && console.log("Generating the link");
        var hash = window.location.hash;
        if (content && content.length && link != `${parentLink}/${hash}`){
            link = `${parentLink}/${hash}`;
            log && console.log(link);
            $(".progress").show();
            shortenLink(link,(shortLink)=>{
                log && console.log(shortLink);
            });
        }else{
            invokeSnackbar('Ooop!! No content?')
        }
        
    })

    interval = setInterval(()=>{
        if(contentUpdated){
            log && console.log('Content Updated This instance');
            contentUpdated = false;
            log && console.log(content);
            if(!title && !content){
                log && console.log("Came Here tooo");
                updateLink(null, null);
            }else if(content) {
                stringToZip(content, (result) => {
                    zip = result;
                    log && console.log(zip);
                    updateLink(title, zip);
                });
            }
        }else{
            log && console.log("Unaltered");
        }
    },1000);


};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    domReady();
} else {
    document.addEventListener("DOMContentLoaded", domReady);
}

var compressContent = (content) =>{
    log && console.log("Compressing now");
}

var initDocument = (data,callback) =>{
    log && console.log("Inititalising Document");
    title = data[0];
    zipToString(data[1], (result) => {
        callback(result);
    })
}

function updateLink(title, zip, push) {
    log && console.log("Updating Link");
    log && console.log(title);
    log && console.log(zip);
    if (title) title = encodeURIComponent(title.trim().replace(/\s/g, "_"));
    var url;
    if (zip && zip.length) {
        url = "/#" + (title || "untitled") + "?" + zip;
    } else if(title && !(zip && zip.length)){
        url = "/#" + (title || "untitled") + "?";
    }else if(!title && !(zip && zip.length)){
        url = "/#create";
    }
    log && console.log(url);
    var hash = location.hash;
    if (!hash || !hash.length) {
        log && console.log(hash);
        log && console.log("If State");
        window.history.pushState({"content":content}, null, url);
    } else {
        log && console.log(hash);
        log && console.log("Else State");
        window.history.replaceState({"content":content}, null, url);
    }
    var length = location.href.length;
    log && console.log(`Total size of the document: ${length} bytes`);
    /*QS("#length").innerText = length + " bytes";
    QS("#length").href = url;
    for (var key in maxLengths) {
        var maxLength = maxLengths[key];
        if (length > maxLength) {
            QS(key).classList.add("invalid");
        } else {
            QS(key).classList.remove("invalid");
        }
    }*/
}



function handleInput(e,log = false) {
    log && console.log("Handling Input for Either and Both Title and Content");
    content = contentDOM.innerText;
    title = titleDOM.innerText;
    log && console.log(content);
    log && console.log(title);
    contentUpdated = true;
    /*
    */
}


var invokeSnackbar = (text) => {
    const MDCSnackbar = mdc.snackbar.MDCSnackbar;
    const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    const dataObj = {
        message: text,
        actionText: 'Ok',
        actionHandler: function () {
            log && console.log('my cool function');
        }
    };
    snackbar.show(dataObj);
}

var shortenLink = (link) =>{
    log && console.log(link);
    var encoded = encodeURIComponent(link);
    console.log(encoded);
    $.ajax({
        type: "GET",
        url: `http://tinyurl.com/api-create.php?url=${encoded}`,
        success: function (reponse){
            log && console.log(response);
        },
        error: function (request, status, error) {
            log && console.log(request.responseText);
        }
    });


   
}
