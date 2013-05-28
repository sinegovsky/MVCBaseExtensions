var Core = {};

/// <summary>Load JSON by AJAX</summary>
/// <param name="url" type="String">URL for load.</param>
/// <param name="successCallback" type="Function">Success function (optional).</param>
/// <param name="data" type="Object">POST data (optional).</param>
/// <param name="errorCallback" type="Function">Error function (optional).</param>
Core.ajax = function(url, successCallback, data, errorCallback) {
    jQuery.ajax({
            cache: false,
            dataType: 'json',
            data: { data: data },
            type: 'POST',
            url: url,
            success: function(resp) {
                if (resp.success) {
                    if (!successCallback)
                        return;
                    successCallback(resp.response);
                } else {
                    if (!errorCallback) {
                        Core.error(resp.response);
                    } else {
                        errorCallback(resp.response);
                    }
                }
            },
            error: function () {
                Core.error("Error on sending AJAX query");
            }
        }
    );
};

Core.loadFunctions = [];

/// <summary>Exec function on document load</summary>
/// <param name="func" type="Function">Function for load.</param>
Core.load = function(func) {
    Core.loadFunctions.push(func);
};

/// <summary>Display error message</summary>
/// <param name="message" type="String">Message for display.</param>
Core.error = function(message) {
    Core.showMsg(message, 'error');
};

/// <summary>Display notice message</summary>
/// <param name="message" type="String">Message for display.</param>
Core.notice = function (message) {
    Core.showMsg(message, 'notice');
};

/// <summary>Save log</summary>
/// <param name="message" type="String">Message for log.</param>
Core.log = function(message) {
    if (console) {
        console.log("LOG:", message);
    }
}

Core.msg_pos = [];
/// <summary>Show message</summary>
/// <param name="msg" type="String">Message for shown.</param>
/// <param name="type" type="String">type of message (error/notice).</param>
/// <param name="time" type="int">Shown duration.</param>
Core.showMsg = function (msg, type, time) {    
    var pos;
    for (pos = 0; pos < Core.msg_pos.length; pos++) {
        if (!Core.msg_pos[pos]) {
            break;
        }
    }
    Core.msg_pos[pos] = 1;

    var block = document.createElement("div");

    block.innerHTML = msg;
    block.style.position = "fixed";
    block.style.top = (5 + pos * 35) + "px";
    block.style.left = "20px";
    block.style.opacity = "0";
    block.style.cursor = "pointer";
    block.style.border = type == 'error' ? "1px solid #F54949" : "1px solid #9AC94D";
    block.style.background = type == 'error' ? "#FFEEEE" : "#F1FFE3";
    block.style.padding = "5px 10px";
    
    block.onclick = function () {
        clearTimeout(timeout);
        timeout = setTimeout(hide, 20);
        delete block.onclick;
    };

    document.body.appendChild(block);
    var timeout = setTimeout(show, 20);

    var opacity = 0.0;
    function show() {
        block.style.opacity = (opacity += 0.05) + "";

        if (opacity < 0.9) {
            timeout = setTimeout(show, 20);
            return;
        }
        timeout = setTimeout(hide, time ? time : 5000);
    }

    function hide() {
        block.style.opacity = (opacity -= 0.05) + "";

        if (opacity > 0) {
            timeout = setTimeout(hide, 20);
            return;
        }

        document.body.removeChild(block);
        Core.msg_pos[pos] = 0;
    }
};

$(document).ready(function() {
    for (var i = 0; i < Core.loadFunctions.length; i++) {
        try {
            Core.loadFunctions[i]();
        } catch(err) {
            Core.log(err);
        }        
    }
});