//Copyright FBS
inputdata = new Array();
selecteddate = "";
numrows = 6;
datex = new Date();
day = datex.getDate();
month = datex.getMonth();
year = datex.getFullYear();
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

function datatype(key) {
    this.key = key;
    this.avalues = new Array(24);
}

function calendar(dir) {
    if (dir == null) {
        var this_month = new Date(year, month, 1);
        var first_week_day = this_month.getDay();
        startdate = new Date(this_month - (first_week_day * 86400000));
    } else if (dir == "u") {
        startdate.setMilliseconds(startdate.getMilliseconds() - (7 * 86400000));
    } else if (dir == "d") {
        startdate.setMilliseconds(startdate.getMilliseconds() + (7 * 86400000));
    }
    var begdate = new Date(startdate);
    var calendar_html = '<table width="100%" height="100%" align="center" cellpadding=0 cellspacing=0 class="xout">';
    calendar_html += '<tr><th class="xinth" height=1 width="13%">Sunday</th><th class="xinth" height=1 width="14%">Monday</th><th class="xinth" height=1 width="15%">Tuesday</th><th class="xinth" height=1 width="16%">Wednesday</th><th class="xinth" height=1 width="15%">Thursday</th><th class="xinth" height=1 width="14%">Friday</th><th class="xinth" height=1 width="13%">Saturday</th></tr>';
    for (var row = 1; row <= numrows; row++) {
        calendar_html += '<tr>';
        for (var col = 1; col <= 7; col++) {
            var xclass = (begdate.getMonth() - month) % 2 != 0 ? "xin" : "xinalt";
            var keydate = (begdate.getMonth() + 1) + '-' + begdate.getDate() + '-' + begdate.getFullYear();
            var tent = "";
            var fcnt = 0;
            for (var a = 0; a < inputdata.length; a++) {
                if (inputdata[a].key == keydate) {
                    xclass = "xinaltsel";
                    fcnt = 0;
                    for (var b = 1; b <= 24; b++) {
                        if (inputdata[a].avalues[b - 1] != null && inputdata[a].avalues[b - 1] != "" && fcnt < 3) {
                            var z = (b <= 12 ? b : (b - 12)) + ":00 " + (b < 12 ? "am" : (b != 24 ? "pm" : "am"));
                            tent += "<br>" + z;
                            fcnt++;
                        }
                    }
                }
            }
            if (tent != "") {
                tent = "<br>" + tent + (fcnt == 3 ? "<br>..." : "");
            }
            var highlight = false;
            if (day == begdate.getDate() && month == begdate.getMonth() && year == begdate.getFullYear()) highlight = true;
            calendar_html += '<td height="' + Math.floor(100 / numrows) + '%" onMouseUp=\'divw("<b>' + months[begdate.getMonth()] + ' ' + begdate.getDate() + ',' + begdate.getFullYear() + '</b>","dtselected");selecteddate="' + keydate + '";loadinputs();\' class="' + xclass + '" valign="top" style="cursor: pointer;">' + (highlight ? "<b>" : "") + (begdate.getDate() == 1 ? (months[begdate.getMonth()] + " ") : "") + begdate.getDate() + (highlight ? "</b>" : "") + tent + '</td>';
            begdate.setMilliseconds(begdate.getMilliseconds() + 86400000);
        }
        calendar_html += '</tr>';
    }
    calendar_html += '</table>';
    return (calendar_html);
}

function loadinputs() {
    var temp;
    var foundkey = false;
    for (var a = 0; a < inputdata.length; a++) {
        if (inputdata[a].key == selecteddate) {
            foundkey = true;
            for (var b = 0; b <= 23; b++) {
                temp = eval("document.xform.entry" + (b + 1));
                temp.value = (inputdata[a].avalues[b] == null ? "" : inputdata[a].avalues[b]);
            }
        }
    }
    if (!foundkey) {
        for (var c = 1; c <= 24; c++) {
            temp = eval("document.xform.entry" + c);
            temp.value = "";
        }
    }
}

function savedata(xtext, xinput) {
    var foundkey = false;
    if (inputdata.length != 0) {
        for (var a = 0; a < inputdata.length; a++) {
            if (inputdata[a].key == selecteddate) {
                inputdata[a].avalues[eval(xinput.substr(5)) - 1] = xtext;
                foundkey = true;
            }
        }
    }
    if (!foundkey) {
        var dt = new datatype(selecteddate);
        dt.avalues[eval(xinput.substr(5)) - 1] = xtext;
        inputdata.push(dt);
    }
    var da = true;
    for (var f = 0; f < inputdata.length; f++) {
        da = true;
        for (var b = 0; b <= 23; b++) {
            if (inputdata[f].avalues[b] != "" && inputdata[f].avalues[b] != null) {
                da = false;
            }
        }
        if (da) {
            inputdata.splice(f, 1);
        }
    }
    divw(calendar('rf'), 'lc');
}

function dputs() {
    var inputs_html = "";
    for (var x = 7; x <= 19; x++) {
        var z = (x <= 12 ? x : (x - 12)) + ":00 " + (x < 12 ? "am" : (x != 24 ? "pm" : "am"));
        inputs_html += '<tr><td align="right" valign="top" nowrap><b>' + z + '</b> </td><td><textarea name="entry' + x + '" rows="4" cols="29" onChange="savedata(this.value,this.name);"></textarea></td></tr>';
    }
    return "<table cellpadding=1 cellspacing=0 border=0>" + inputs_html + "</table>";
}

function divw(text, id) {
    var x;
    if (document.getElementById) {
        x = document.getElementById(id);
        x.innerHTML = '';
        x.innerHTML = text;
    } else if (document.all) {
        x = document.all[id];
        x.innerHTML = text;
    } else if (document.layers) {
        x = document.layers[id];
        x.document.open();
        x.document.write(text);
        x.document.close();
    }
}

function w(m) {
    if ("undefined" != m.toString()) {
        document.writeln(m.toString());
    } else {
        document.writeln("<br>");
    }
}

function init() {
    selecteddate = (month + 1) + '-' + day + '-' + year;
    divw("<b>" + months[month] + " " + day + "," + year + "</b>", "dtselected");
    for (var c = 1; c <= 24; c++) {
        temp = eval("document.xform.entry" + c);
        temp.value = "";
    }
    document.rowform.rowsize.value = 6;
}