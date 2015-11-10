$(document).ready(function() {
    addItems();
    
    // to prevent a page redirect
    $('#item-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"),
            type: 'POST',
            data: $(this).serialize()
        });
        addItems();
    });
});

function addItems() {
    $('#todolist').empty();
    $.get('/items', function(data) {
        data.forEach(addItem);
    });
}

function addItem(item) {
    var html = '<li';
    if (item.completed)
        html += ' class="completed" ';
    html += ' id="' + item.Id + '">'
         + item.text + '</li>';
    $("#todolist").append(html);
}