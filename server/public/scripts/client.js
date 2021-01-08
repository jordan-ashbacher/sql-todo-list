console.log('client sourced')

$(document).ready(pageReady)

function pageReady() {
    console.log('jq sourced')
    $('#submitTaskBtn').on('click', addTask)
}

function addTask() {
    console.log('add task clicked')
    console.log($('#dueDateIn').val())
}