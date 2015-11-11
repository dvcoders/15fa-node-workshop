// TODO make text of items editable, delete items, 
// toggle showing completed/not completed items
$(document).ready(function() {
  addItems();
  
  // to prevent a page redirect
  $('#item-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr('action'), // /items
      type: 'POST',
      data: $(this).serialize(), // form data
    }).done(addItem); // add item after data sent to server
  });
  
  // when the edit button is clicked, replace with input field
  $('#todolist').on('click', 'li .edit-btn', function() {
    var item = $(this).parent();
    var text = item.find('.item-text').text();
    item.empty();
    item.append('<input id="edit-input" value="' + text +'" />');
    item.append('<button class="save-btn">Save</button>');
  });
  
  // toggle completed / not completed onclick
  $('#todolist').on('click', 'li .completed-btn', function() {
    var data = {
      Id: $(this).parent().attr('id'),
      completed: !($(this).parent().hasClass('completed'))
    };
    $.ajax({
      url: '/item',
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done($(this).parent().toggleClass('completed')); 
  // toggle class after data is sent to the server
  });
  
  $('#todolist').on('click', 'li .delete-btn', function() {
    var data = {Id: $(this).parent().attr('id')};
    $.ajax({
      url: '/item',
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done($(this).parent().remove());
    // remove element after data is sent to the server
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
  	+ '<div class="item-text">' + item.text + '</div>'
  	+ '<button class="edit-btn">✎</button>'
  	+ '<button class="completed-btn">✔</button>'
  	+ '<button class="delete-btn">✗</button>'
  	+ '</li>';
  $("#todolist").append(html);
}