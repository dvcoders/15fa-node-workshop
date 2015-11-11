// TODO make text of items editable, delete items,
// toggle showing completed/not completed items
/* globals $ */
$(document).ready(function () {
  addItems()

  // to prevent a page redirect
  $('#item-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      data: $(this).serialize()
    }).done(addItem) // add item after data sent to server
  })

  // toggle completed / not completed onclick
  $('#todolist').on('click', 'li', function () {
    var data = {
      id: $(this).attr('id'),
      completed: !($(this).hasClass('completed'))
    }
    $.ajax({
      url: '/item',
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done($(this).toggleClass('completed'))
    // toggle class after data is sent to the server
  })
})

function addItems () {
  $('#todolist').empty()
  $.get('/items', function (data) {
    data.forEach(addItem)
  })
}

function addItem (item) {
  var html = '<li'
  if (item.completed) {
    html += ' class="completed" '
  }
  html += ' id="' + item.Id + '">' + item.text + '</li>'
  $('#todolist').append(html)
}
