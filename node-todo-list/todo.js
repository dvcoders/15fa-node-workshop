// TODO make text of items editable, delete items, 
// toggle showing completed/not completed items
$(document).ready(function() {
    addItems();
    
    // to prevent a page redirect
    $('#item-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: $(this).attr("action"), // /items
            type: 'POST',
            data: $(this).serialize(), // form data
        }).done(addItem); // add item after data sent to server
    });
    
    // toggle completed / not completed onclick
    $('#todolist').on('click', 'li .completed-btn', function() {
        var data = {
            Id: $(this).parent().attr('id'),
            completed: !($(this).parent().hasClass('completed'))
        }
        $.ajax({
            url: '/item',
            type: 'PUT',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done($(this).parent().toggleClass('completed')); 
        // toggle class after data is sent to the server
    });
});  

function addItems() {
    $.get('/items', function(data) {
        data.forEach(addItem);
    });
}

function addItem(item) {
    var html = '<li';
    if (item.completed)
        html += ' class="completed"';
    html += ' id="' + item.Id + '">'
         + item.text
         + '<button class="edit-btn">✎</button>'
         + '<button class="completed-btn">✔</button>'
         + '<button class="delete-btn">✗</button>'
         + '</li>';
    $("#todolist").append(html);
}