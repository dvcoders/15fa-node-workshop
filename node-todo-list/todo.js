$(document).ready(function() {
    $.get("/items", function(data) {
        data.forEach(addItem);
    }); 
});

function addItem(item) {
    $("#todolist").append("<li>" + item + "</li>");
}