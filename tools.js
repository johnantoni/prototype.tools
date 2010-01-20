function IsNullBr(value) {
    if (value != "" && value != null) {
        return value + "<br />";
    }
    return "";
}

function isNull(value, replacement) {
    return (value == '' ? replacement : value);
}

//URL encoding
function urlencode(str) {
    str = escape(str);
    str = str.replace('+', '%2B');
    str = str.replace('%20', '+');
    str = str.replace('*', '%2A');
    str = str.replace('/', '%2F');
    str = str.replace('@', '%40');
    str = str.replace('&', '%26');
    str = str.replace('#', '%23');
    return str;
}

//URL decoding
function urldecode(str) {
    str = str.replace('+', ' ');
    str = unescape(str);
    return str;
}

//determine which browser being used
function whichNavigator() {
    var which = 0;

    var nav = navigator.vendor;
    if (nav) { nav = nav.substr(0, 5); }

    if (nav == "Apple") {
        nav = navigator.appVersion;

        var str_pos = nav.indexOf('Safari');
        nav = nav.substr(str_pos + 7, 6);

        if (nav > 500) { which = 1; } else if (nav < 500) { which = 3; }
    }
    else {
        nav = navigator.appName;
        if (nav == "Netscape") {
            which = 2;
        } else if (nav == "Opera") {
            which = 1;
        } else {
            nav = navigator.appVersion;
            nav = nav.substr(22, 3);
            if (nav == "6.0") { which = 0; } else if (nav == "7.0") { which = 4; } else { which = 0; }
        }
    }

    return which;
}

function validateEmail(string) {
    // /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/; //regular expression to use
    if (!(regfilter.test(string))) { return false; } else { return true; } //if ok, return true, if bad return false
}

function validatePostcode(string) {
    var str = string.replace(' ', '').trim(); //fix for 'sw1 1jp ' bug
    var regfilter = /^[a-zA-Z]{1,2}[0-9][0-9A-Za-z]{0,1} {0,1}[0-9][A-Za-z]{2}$/; //regular expression to use
    if (!(regfilter.test(str))) { return false; } else { return true; } //if ok, return true, if bad return false
}

function validateTelephoneUK(string) {
    //var regfilter=/^0\d{2,4}[ -]{1}[\d]{3}[\d -]{1}[\d -]{1}[\d]{1,4}$/; //regular expression to use
    //var regfilter=/^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}$/; //regular expression to use
    var regfilter = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/; //regular expression to use
    if (!(regfilter.test(string))) { return false; } else { return true; } //if ok, return true, if bad return false
}

function validateTelephone(string) {
    var regfilter = /[^\d ()]/;
    if (!(regfilter.test(string))) { return false; } else { return true; } //if ok, return true, if bad return false
}

function validateString(string) {
    var invalidChara = "\`\²\%\*\,\.\?\;\:\§\!\#\$\£\¤\(\)\~\/\=\+\{\}\[\]|^@&\"\"\<\>©®ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞß";
    var i = 0;
    var end = string.length;
    var chara = "";
    for (var i = 0; i < end; i++) {
        chara = string.substring(i, i + 1);
        if (invalidChara.indexOf(chara) != (-1)) {
            return false;
        }
    }
    return true;
}

function validateUKPhone(x) {
    if (!x.match(/^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/))
        return false;
    return true;
}

function validatePassword(x) {
    if (!x.length > 5)
        return false;
    return true;
}

function validateMoneyField(x) {
    if (x.match(/^\£?[0-9]+([, ][0-9]{3})*(\.[0-9]{2})?$/) || x > 0) {
        return true;
    }
    return false;
}

function validateLimitedMoneyField(x, len) {
    if (x.match(/^\£?[0-9]+([, ][0-9]{3})*(\.[0-9]{2})?$/) || x > 0) {
        return (x.length < len ? true : false);
    }
    return false;
}

function textLimit(field, maxlen) {
    if (field.value.length > maxlen) {
        field.value = field.value.substring(0, maxlen); //input has been truncated
    }
}

//prototype trim functions
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, "");
}

//prototype cookie handlers
var Cookie = {
    set: function(name, value, daysToExpire) {
        var expire = '';
        if (daysToExpire != undefined) {
            var d = new Date();
            d.setTime(d.getTime() + (86400000 * parseFloat(daysToExpire)));
            expire = '; expires=' + d.toGMTString();
        }
        return (document.cookie = escape(name) + '=' + escape(value || '') + expire + '; path=/');
    },
    get: function(name) {
        var cookie = document.cookie.match(new RegExp('(^|;)\\s*' + escape(name) + '=([^;\\s]*)'));
        return (cookie ? unescape(cookie[2]) : null);
    },
    erase: function(name) {
        var cookie = Cookie.get(name) || true;
        Cookie.set(name, '', -1);
        return cookie;
    },
    accept: function() {
        if (typeof navigator.cookieEnabled == 'boolean') {
            return navigator.cookieEnabled;
        }
        Cookie.set('_test', '1');
        return (Cookie.erase('_test') === '1');
    }
};


String.prototype.stripHTML = function() {
    var matchTag = /<(?:.|\s)*?>/g;
    return this.replace(matchTag, "");
};


//check if email is associated to account
String.prototype.hasAccount = function() {
    var f = false;
    var s = this.truncate();
    if (validateEmail(s)) {
        var aj = new Ajax.Request('../CheckUsername', {
            method: 'post',
            asynchronous: false,
            parameters: 'email=' + escape(s),
            onSuccess: function(transport) {
                var json = transport.responseText.evalJSON();
                if (json == true) {
                    f = true;
                }
            }
        })
    }
    return f;
};


function check_client_names(cliName) {
    var f = false;
    if (typeof cliName == 'string') {
        if (cliName.length > 0) {
            if (cliName.trim().length > 0) {
                f = true;
            }
        }
    }

    return f;
};