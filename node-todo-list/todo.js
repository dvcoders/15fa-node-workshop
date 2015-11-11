// TODO clean up code, toggle completed/not completed, show buttons only on hover
/* globals $ */
$(document).ready(function () {
  getAllItems()
  // to prevent a page redirect
  $('#item-form').on('submit', function (e) {
    e.preventDefault()
    var data = {
      title: $('#newitem').val(),
      completed: false
    }
    console.log('[Client] Sending item to server: ' + JSON.stringify(data))
    $.ajax({
      url: 'http://localhost:3000/item', // /items
      type: 'POST',
      data: data
    }).done(addItem) // add item after data sent to server
    $('#newitem').val('')
  })
  // when the edit button is clicked, replace with input field
  $('#todolist').on('click', 'li .edit-btn', function () {
    var item = $(this).parent()
    var text = item.find('.item-text').text()
    item.empty()
    item.append('<input class="edit-input" value="' + text + '" />')
    item.append('<button class="save-btn">Save</button>')
  })
  $('#todolist').on('click', 'li .save-btn', function () {
    var item = $(this).parent()
    var text = item.find('.edit-input').val()
    var data = {
      id: item.attr('id'),
      title: text
    }
    console.log('[PUT] Updating item title: ' + JSON.stringify(data))
    $.ajax({
      url: 'http://localhost:3000/item',
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(setInsideHtml(item, text))
  })
  // toggle completed / not completed onclick
  $('#todolist').on('click', 'li .completed-btn', function () {
    var data = {
      id: $(this).parent().attr('id'),
      completed: !($(this).parent().hasClass('completed'))
    }
    console.log('[PUT] Marking item as complted: ' + JSON.stringify(data))
    $.ajax({
      url: 'http://localhost:3000/item',
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done($(this).parent().toggleClass('completed'))
  // toggle class after data is sent to the server
  })
  $('#todolist').on('click', 'li .delete-btn', function () {
    var data = {id: $(this).parent().attr('id')}
    console.log('[DELTE] Removing item from server: ' + JSON.stringify(data))
    $.ajax({
      url: 'http://localhost:3000/item',
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done($(this).parent().remove())
    // remove element after data is sent to the server
  })
})

function getAllItems () {
  $.get('http://localhost:3000/all', function (data) {
    data.items.forEach(addItem)
    console.log('[GET] Requesting all item data from server: ' + JSON.stringify(data))
  })
}

function addItem (item) {
  console.log('[Client] Adding new item to DOM')
  var html = '<li'
  if (item.completed === true) {
    html += ' class="completed"'
  }
  html += ' id="' + item.id + '">' +
    '<div class="item-text">' + item.title + '</div>' +
    '<button class="edit-btn">✎</button>' +
    '<button class="completed-btn">✔</button>' +
    '<button class="delete-btn">✗</button>' +
    '</li>'
  $('#todolist').append(html)
}

function setInsideHtml (item, text) {
  item.empty()
  var html = '<div class="item-text">' + text + '</div>' +
  '<button class="edit-btn">✎</button>' +
  '<button class="completed-btn">✔</button>' +
  '<button class="delete-btn">✗</button>'
  item.append(html)
}
