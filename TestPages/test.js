
$("#registerdevice").on("click", function () {
    $.ajax(
        {
            url: "http://localhost:8000/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                name: "MCU1",
                ip: "192.168.1.1",
                channels: "3"
            })
        }
    ).done(function (data) {
        console.log(data);
    }).fail(function () {
        console.log("request failed");
    })
});
$("#senddata").on("click", function () {
    $.ajax(
        {
            url: "http://localhost:8000/report",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                name: "MCU1",
                data: [1, 6, 10]
            })
        }
    ).done(function (data) {
        console.log(data);
    }).fail(function () {
        console.log("request failed");
    })
});
$("#getdata").on("click", function () {
    $.ajax(
        {
            url: "http://localhost:8000/getlatest",
            method: "GET",
            contentType: "application/json"
        }
    ).done(function (data) {
        console.log(data);
    }).fail(function () {
        console.log("request failed");
    })
});
$("#getall").on("click", function () {
    $.ajax(
        {
            url: "http://localhost:8000/getall",
            method: "GET",
            contentType: "application/json"
        }
    ).done(function (data) {
        console.log(data);
    }).fail(function () {
        console.log("request failed");
    })
})