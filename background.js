chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Ajax URL is " + searchURL)
    if (request.purpose == "Search") {
        console.log("The purpose is Search")
        var searchURL = request.givenURL + request.keyword1 + " " + request.keyword2
        $.ajax({
            url: searchURL,
            async: true,
            crossDomain: true,
            crossOrigin: true,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhrObj.setRequestHeader("Accept", "application/json")
                xhrObj.setRequestHeader("cache-control", "no-cache")
            },
            type: request.method
        })
        .done(function(data, status, xhr) {
            sendResponse({
                result: data,
                key1: request.keyword1,
                key2: request.keyword2
            })
        })
        .fail(function() {
            console.log("Background page broke")
        })
    }

    if (request.purpose == "Data") {
        console.log("The purpose is Search")
        var searchURL = request.givenURL.replace("HERE", request.keyword2)
        console.log("The searchURL is " + searchURL)

        $.ajax({
            url: searchURL,
            async: true,
            crossDomain: true,
            crossOrigin: true,
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhrObj.setRequestHeader("Accept", "application/json")
                xhrObj.setRequestHeader("cache-control", "no-cache")
            },
            type: request.method
        })
        .done(function(data, status, xhr) {
            sendResponse({
                result: data,
                artistName: request.keyword2
            })
        })
    }
    return true;
})
