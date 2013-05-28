var Core = {};

/// <summary>Load JSON by AJAX/</summary>
/// <param name="url" type="String">URL for load.</param>
/// <param name="successCallback" type="Function">Success function (optional).</param>
/// <param name="data" type="Object">POST data (optional).</param>
/// <param name="errorCallback" type="Function">Error function (optional).</param>
Core.ajax = function(url, successCallback, data, errorCallback) {
    jQuery.ajax({
            cache: false,
            dataType: 'json',
            data: data,
            type: 'POST',
            url: url,
            success: function(resp) {
                if (resp.success) {
                    if (!successCallback)
                        return;
                    successCallback();
                } else {
                    if (!errorCallback) {
                        Core.error(resp.response);
                    } else {
                        errorCallback();
                    }
                }
            },
            error: function(resp) {
                Core.error(resp);
            }
        }
    );
};

Core.loadFunctions = [];

/// <summary>Exec function on document load/</summary>
/// <param name="func" type="Function">Function for load.</param>
Core.load = function(func) {
    Core.loadFunctions.push(func);
};

/// <summary>Display error message/</summary>
/// <param name="message" type="String">Message for display.</param>
Core.error = function(message) {
    alert('ERROR: ' + message);
};