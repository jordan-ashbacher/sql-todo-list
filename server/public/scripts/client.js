console.log('client sourced')

$(document).ready(pageReady)

function pageReady() {
    console.log('jq sourced')
    setClickListeners()
    getTasks()
}

function setClickListeners() {
    $('#submitTaskBtn').on('click', addTask)
    $('#taskList').on('click', '.deleteTaskBtn', deleteTask)
}

function deleteTask() {
    console.log('delete clicked')
    const id = ($(this).data('id'))

    $.ajax({
        type: 'DELETE',
        url: `/tasks/${id}`,
    }).then(function (response) {
        getTasks()
    }).catch(function (error) {
        console.log(error)
    })
}

function getTasks() {
    console.log('in getTasks')
    $('.taskContainer').empty()

    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log(response)
        renderTasks(response)
    }).catch(function (error) {
        alert('error getting tasks')
    })
}

function renderTasks(tasksToRender) {
    $('#taskList').empty()
    for (let task of tasksToRender) {
        const id = task.id
        $('#taskList').append(`<input type="checkbox" id=${task.id}>`)
        $(`#${id}`).prop('checked', task.completed)
        $('#taskList').append(`<span class="taskItem">${task.task}</span>`)
        $('#taskList').append(`<button class="deleteTaskBtn" data-id=${task.id}>X</button>`)
        $('#taskList').append(`<br/>`)
    }
}

    function addTask() {
        console.log('add task clicked')

        let newTask = {
            task: $('#taskIn').val(),
            dueDate: $('#dueDateIn').val()
        }

        $('#taskIn').val('')
        $('#dueDateIn').val('')

        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: newTask
        }).then(function (response) {
            console.log(response)
            renderTasks(response)
        }).catch(function (error) {
            console.log(error)
        })

    }

