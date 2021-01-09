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
    $('#taskList').on('change', '.checkbox', toggleComplete)
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
    console.log(tasksToRender)
    $('#taskList').empty()
    for (let task of tasksToRender) {
        console.log(task)
        const id = task.id

        let tr = $(`<tr class="taskItem" data-id=${task.id}></tr>`)
        tr.append(`<td><input type="checkbox" id=${task.id} class="checkbox" data-id=${task.id}></td>
        <td>${task.task}</td>
        <td><button class="deleteTaskBtn btn" data-id=${task.id}>X</button></td>`)
        
        $('#taskList').append(tr)
        $(`#${id}`).prop('checked', task.completed)

        if ($(`#${id}`).prop('checked')) {
            tr.addClass('table-secondary')
        }

    }
}

    function addTask() {
        console.log('add task clicked')

        let newTask = {
            task: $('#taskIn').val(),
            dueDate: $('#dueDateIn').val()
        }
        
        console.log(newTask)

        $('#taskIn').val('')
        $('#dueDateIn').val('')

        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: newTask
        }).then(function (response) {
            console.log(response)
            getTasks(response)
        }).catch(function (error) {
            console.log(error)
        })

    }

    function toggleComplete() {
        console.log('checkbox checked')
        console.log($(this).data('id'))
        const id = $(this).data('id')
        let newStatus = {}

        console.log($(this).is(':checked'))
        if($(this).is(':checked')) {
            newStatus = {
                completed: true
            }
        } else {
            newStatus = {
                completed: false
            }
        }

        console.log(newStatus)

        $.ajax({
            type: 'PUT',
            url: `/tasks/${id}`,
            data: newStatus
        }).then(function (response) {
            getTasks(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

