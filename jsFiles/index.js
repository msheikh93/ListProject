var arr = [];
var fullList = [];
$(document).ready(function () {

    $.get('/getList', (list) => {
        list.forEach((item) => {
            $(".allLists").append(`<li class = "eachListNode">${item.listItem}</li>`);
            fullList.push(item);
        });
    });


    $("#submitButton").click(() => {

        if ($("#submitButton").val() === "Delete") {
            arr.forEach((x) => {
                var data = {
                    _id: fullList[x]._id,
                }

                $.post("/deleteList", data);
            });

        } else if ($('.newListNode').val() !== "" && $("#submitButton").val() === "Submit") {
            var listItem = $('.newListNode').val().toLowerCase();
            listItem = listItem[0].toUpperCase() + listItem.slice(1);
            var data = {
                listItem: listItem,
            };
            $.post("/createList", data);
        } else if ($('.newListNode').val() !== "" && $("#submitButton").val() === "Update") {
            var listItem = $('.newListNode').val().toLowerCase();
            listItem = listItem[0].toUpperCase() + listItem.slice(1);
            var data = {
                _id : fullList[arr[0]]._id,
                listItem: listItem,
            };
            $.post("/updateList", data);
        }
        arr = [];
        idList = [];
        location.reload();
    });

    $("#editButton").click(() => {
        $("#submitButton").val("Update");
        $(".newListNode").val(fullList[arr[0]].listItem);
        $('#editButton').css({
            'display': 'none',
        });
    });

});

$(window).on('load', function () {
    var counter = 0;
    $(".eachListNode").click(function () {
        if ($(this).css('backgroundColor') === "rgb(228, 214, 213)") {
            $(this).css({
                'background-color': 'rgb(228, 214, 214)',
            });
            arr.push($(this).index());
            counter = counter + 1;
        } else if ($(this).css('backgroundColor') === "rgb(228, 214, 214)") {
            $(this).css({
                'background-color': 'white',
            });
            var idx = arr.indexOf($(this).index());
            arr.splice(idx, 1);
            counter = counter - 1;
        } else {
            $(this).css({
                'background-color': 'rgb(228, 214, 214)',
            });
            arr.push($(this).index());
            counter = counter + 1;
        }
        if ($("#submitButton").val() === "Submit") {
            $("#submitButton").val("Delete");
        } else if (($("#submitButton").val() === "Delete") && counter === 0) {
            $("#submitButton").val("Submit");
        }

        if(counter === 1) {
            $('#editButton').css({
                'display': 'inline',
            });
        } else {
            $('#editButton').css({
                'display': 'none',
            });
        }
    });

});