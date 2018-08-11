var log = false;
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
var theme = new Array();
var author = '';
var primary_colors = [{ "color": "green", "pallete": ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336", "#E53935", "#D32F2F", "#C62828", "#B71C1C"] }, { "color": "pink", "pallete": ["#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A", "#E91E63", "#D81B60", "#C2185B", "#AD1457", "#880E4F"] }, { "color": "purple", "pallete": ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0", "#8E24AA", "#7B1FA2", "#6A1B9A", "#4A148C"] }, { "color": "deep_purple", "pallete": ["#EDE7F6", "#D1C4E9", "#B39DDB", "#9575CD", "#7E57C2", "#673AB7", "#5E35B1", "#512DA8", "#4527A0", "#311B92"] }, { "color": "indigo", "pallete": ["#E8EAF6", "#C5CAE9", "#9FA8DA", "#7986CB", "#5C6BC0", "#3F51B5", "#3949AB", "#303F9F", "#283593", "#1A237E"] }, { "color": "blue", "pallete": ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2", "#1565C0", "#0D47A1"] }, { "color": "light_blue", "pallete": ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"] }, { "color": "cyan", "pallete": ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#00BCD4", "#00ACC1", "#0097A7", "#00838F", "#006064"] }, { "color": "teal", "pallete": ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A", "#009688", "#00897B", "#00796B", "#00695C", "#004D40"] }, { "color": "green", "pallete": ["#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50", "#43A047", "#388E3C", "#2E7D32", "#1B5E20"] }, { "color": "light_green", "pallete": ["#F1F8E9", "#DCEDC8", "#C5E1A5", "#AED581", "#9CCC65", "#8BC34A", "#7CB342", "#689F38", "#558B2F", "#33691E"] }, { "color": "lime", "pallete": ["#F9FBE7", "#F0F4C3", "#E6EE9C", "#DCE775", "#D4E157", "#CDDC39", "#C0CA33", "#AFB42B", "#827717"] }, { "color": "yellow", "pallete": ["#FFFDE7", "#FFF9C4", "#FFF59D", "#FFF176", "#FFEE58", "#FFEB3B", "#FDD835", "#FBC02D", "#F9A825", "#F57F17"] }, { "color": "amber", "pallete": ["#FFF8E1", "#FFECB3", "#FFE082", "#FFD54F", "#FFCA28", "#FFC107", "#FFB300", "#FFA000", "#FF8F00", "#FF6F00"] }, { "color": "orange", "pallete": ["#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726", "#FF9800", "#FB8C00", "#F57C00", "#EF6C00", "#E65100"] }, { "color": "deep_orange", "pallete": ["#FBE9E7", "#FFCCBC", "#FFAB91", "#FF8A65", "#FF7043", "#FF5722", "#F4511E", "#E64A19", "#D84315", "#BF360C"] }, { "color": "brown", "pallete": ["#EFEBE9", "#D7CCC8", "#BCAAA4", "#A1887F", "#8D6E63", "#795548", "#6D4C41", "#5D4037", "#4E342E", "#3E2723"] }, { "color": "gray", "pallete": ["#FAFAFA", "#F5F5F5", "#EEEEEE", "#E0E0E0", "#BDBDBD", "#9E9E9E", "#757575", "#616161", "#424242", "#212121"] }, { "color": "blue_gray", "pallete": ["#ECEFF1", "#CFD8DC", "#B0BEC5", "#90A4AE", "#78909C", "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238"] }];
var accent_colors = [{ "color": "green", "pallete": ["#FF8A80", "#FF5252", "#FF1744", "#D50000"] }, { "color": "pink", "pallete": ["#FF80AB", "#FF4081", "#F50057", "#C51162"] }, { "color": "purple", "pallete": ["#EA80FC", "#E040FB", "#D500F9", "#AA00FF"] }, { "color": "deep_purple", "pallete": ["#B388FF", "#7C4DFF", "#651FFF", "#6200EA"] }, { "color": "indigo", "pallete": ["#8C9EFF", "#536DFE", "#3D5AFE", "#304FFE"] }, { "color": "blue", "pallete": ["#82B1FF", "#448AFF", "#2979FF", "#2962FF"] }, { "color": "light_blue", "pallete": ["#80D8FF", "#40C4FF", "#00B0FF", "#0091EA"] }, { "color": "cyan", "pallete": ["#84FFFF", "#18FFFF", "#00E5FF", "#00B8D4"] }, { "color": "teal", "pallete": ["#A7FFEB", "#64FFDA", "#1DE9B6", "#00BFA5"] }, { "color": "green", "pallete": ["#B9F6CA", "#69F0AE", "#00E676", "#00C853"] }, { "color": "light_green", "pallete": ["#CCFF90", "#B2FF59", "#76FF03", "#64DD17"] }, { "color": "lime", "pallete": ["#F4FF81", "#EEFF41", "#C6FF00", "#AEEA00"] }, { "color": "yellow", "pallete": ["#FFFF8D", "#FFFF00", "#FFEA00", "#FFD600"] }, { "color": "amber", "pallete": ["#FFE57F", "#FFD740", "#FFC400", "#FFAB00"] }, { "color": "orange", "pallete": ["#FFD180", "#FFAB40", "#FF9100", "#FF6D00"] }, { "color": "deep_orange", "pallete": ["#FF9E80", "#FF6E40", "#FF3D00", "#DD2C00"] }];
var allowed_bytes_threshold = 2000;
var allowed_bytes;

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
var authorDOM = document.getElementById("author");

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
    
    $(document).on('change keydown keypress input focus focusout', 'div[data-placeholder]', function () {
        
        if (this.textContent) {
            this.dataset.divPlaceholderContent = 'true';
        }
        else {
            delete (this.dataset.divPlaceholderContent);
        }
    });


    contentDOM.addEventListener("keyup", handleInput);
    titleDOM.addEventListener("keyup", handleInput);
    authorDOM.addEventListener("keyup", handleInput);


    switch(state){
        case 'new':
            updateLink(null,null,null);
            var theme_colors = randomizeColors();
            //updating the theme
            theme_colors.forEach(color=>{
                theme.push(color.split('#')[1]);
            });
            log && console.log(theme);
            updateColors(theme_colors);
        break;
        case 'view':
            initDocument(data,(init_content)=>{
                log && console.log("Init Complete");
                log && console.log(init_content);
                content = init_content;
                if(data[0]== 'untitled'){
                    titleDOM.innerHTML = 'A letter for you!';
                }else{
                    titleDOM.innerHTML = data[0].split('_').join(' ');
                }
                
                contentDOM.innerHTML = content;

                //updating theme
                var theme_colors = new Array();
                if(theme.length){
                    theme.forEach(color=>{
                        theme_colors.push(`#${color}`);
                    });
                    updateColors(theme_colors);
                }else{
                    theme_colors = randomizeColors();
                    //updating the theme
                    theme_colors.forEach(color => {
                        theme.push(color.split('#')[1]);
                    });
                    log && console.log(theme);
                    updateColors(theme_colors);
                }

                $("#title").focusout();
                $("#content").focusout();

                titleDOM.contentEditable = false;
                contentDOM.contentEditable = false;
                authorDOM.contentEditable =false;

                $(".letter-count").hide();
                $(".action-label").html('NEW');
                $(".action-icon").html('add');

                $(".action-button").removeClass('generate-link');
                clearInterval(interval);

            });
        break;
    }
    
    /*stringToZip(content,(result) =>{
        log && console.log(result);
        zipToString(result,(result)=>{
            log && console.log(result);
        })
    });*/

    $(".action-button").click(function(){
        if ($(this).hasClass('generate-link')) {
            log && console.log("Generating the link");
            log && console.log(content);
            var hash = window.location.hash;
            if (content && content.length && link != `${parentLink}/${hash}`) {
                if (allowed_bytes >= 0) {
                    link = `${parentLink}/${hash}`;
                    log && console.log(link);
                    $(".progress").show();
                    shortenLink(link, (shortLink) => {
                        log && console.log(shortLink);
                        navigator.clipboard.writeText(shortLink);
                        invokeSnackbar('Link copied to clipboard');
                        $(".progress").hide();
                    });
                } else {
                    invokeSnackbar('Letter supports 2000 characters');
                }

            } else {
                invokeSnackbar('Ooop!! No content?')
            }
        } else {
            log && console.log("New Letter");
            location.href = 'https://mayurc137.github.io/letter/';
        }
    });


    interval = setInterval(()=>{
        if(contentUpdated){
            log && console.log('Content Updated This instance');
            contentUpdated = false;
            log && console.log(content);
            if(!title && !content){
                log && console.log("Came Here tooo");
                updateLink(null, null, null);
            }else if(content) {
                stringToZip(content, (result) => {
                    zip = result;
                    log && console.log(zip);
                    updateLink(title, zip, author);
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
    //stripping the color code and author
    var dataSplit = data[1].split("#");
    log && console.log(dataSplit);

    if(dataSplit[1]){
        theme = dataSplit[1].split(',');
    }else{
        theme = [];
    }
    
    if(dataSplit[2]){
        author = dataSplit[2];
    }else{
        //fallback to no author
    }
    
    title = data[0];
    log && console.log(title);
    log && console.log(theme);
    log && console.log(author);
    zipToString(dataSplit[0], (result) => {
        callback(result);
    })
}

function updateLink(title, zip, author) {
    log && console.log("Updating Link");
    //log && console.log(title);
    //log && console.log(zip);
    log && console.log(theme);
    log && console.log(author);
    if (title) title = encodeURIComponent(title.trim().replace(/\s/g, "_"));
    if (author) author = encodeURIComponent(author.trim().replace(/\s/g, "_"));
    var url;
    var hrefSplit = location.href.split('/');
    log && console.log(hrefSplit);
    if (zip && zip.length) {
        url = "/letter/#" + (title || "untitled") + "?" + zip + "#" + theme.join(',') + "#" + author;
    } else if(title && !(zip && zip.length)){
        url = "/letter/#" + (title || "untitled") + "?" + "#" + theme.join(',') + "#" + author;
    }

    //log && console.log(url);
    var hash = location.hash;
    log && console.log(hash);
    //window.history.pushState({ "content": content }, null, url);
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
    allowed_bytes = allowed_bytes_threshold - length;
    if(!title && !content && !author){
        $(".allowed-bytes").html(allowed_bytes_threshold);
    }else{
        $(".allowed-bytes").html(allowed_bytes);
    }
    
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
    author = authorDOM.innerText;
    log && console.log(content);
    log && console.log(title);
    contentUpdated = true;
    /*
    */
}

var invokeSnackbar = (text) => {
    log && console.log("Invoke Snackbar")
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

var shortenLink = (link,callback) =>{
    log && console.log(link);
    $.ajax({
        type: "POST",
        url: `https://c137apis.herokuapp.com/shorten`,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ longUrl: link }),
        success: function (data,text){
            log && console.log(data);
            callback(data.tinyUrl);
        },
        error: function (request, status, error) {
            log && console.log(request.responseText);
        }
    });


   
}

var updateColors = (colors) =>{
    log && console.log("Updating Colors");

    var primary = colors[0];
    var primary_dark = colors[1];
    var accent = colors[2];
    //primary
    log &&console.log(primary);
    document.documentElement.style.setProperty('--mdc-theme-primary', primary);
    //primary_dark
    log && console.log(primary_dark);
    document.documentElement.style.setProperty('--mdc-theme-on-primary', primary_dark);
    //accent
    log && console.log(accent);
    document.documentElement.style.setProperty('--mdc-theme-secondary', accent);

    $(".primary-background").css("background-color", primary);
    $(".primary-dark-background").css("background-color", primary_dark);
    $(".accent-background").css("background-color", accent);
    $(".dark-font").css("color",primary_dark);
}


var randomizeColors = () =>{
    var primary = primary_colors[Math.floor(Math.random() * primary_colors.length)];
    //now remove the same from accent colors if any
    log && console.log(accent_colors.length);
    for (var i = 0; i < accent_colors.length; i++){
        if (accent_colors[i].color && accent_colors[i].id === primary.color) {
            accent_colors.splice(i, 1);
            break;
        }else{
            
        }
    }
    log && console.log(accent_colors.length);
    log && console.log(accent_colors);
    var index = Math.floor(Math.random() * accent_colors.length);
    log && console.log(index);
    var accent = accent_colors[index];
    log && console.log(accent);

    var return_primary = primary.pallete[5];
    var return_primary_dark = primary.pallete[8];
    var return_accent = accent.pallete[3];

    return [return_primary,return_primary_dark,return_accent];

        
}