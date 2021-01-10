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
    $('#taskList').on('click', '.completeTaskBtn', toggleComplete)
}

function deleteTask() {
    console.log('delete clicked')
    const id = ($(this).data('id'))

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            swal("Your task has been deleted", {
                icon: "success",
            });
            $.ajax({
                type: 'DELETE',
                url: `/tasks/${id}`,
            }).then(function (response) {
                getTasks()
            }).catch(function (error) {
                console.log(error)
            })
        }
    });

    //     $.ajax({
    //         type: 'DELETE',
    //         url: `/tasks/${id}`,
    //     }).then(function (response) {
    //         getTasks()
    //     }).catch(function (error) {
    //         console.log(error)
    //     })
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

        let tr = $(`<tr class="taskItem" id=${id}  data-id=${task.id} data-status=${task.completed}></tr>`)
        tr.append(`
        <td class="task">${task.task}</td>
        <td><button class="completeTaskBtn btn btn-outline-light" data-id=${task.id} data-status=${task.completed}>	&#10003;</button></td>
        <td><button class="deleteTaskBtn btn btn-outline-light" data-id=${task.id}>X</button></td>`)

        $('#taskList').append(tr)
        console.log($(`#${id}`).data('status'))

        if ($(`#${id}`).data('status') === true) {
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
    console.log('complete button clicked')
    
    const status = $(this).data('status')
    const id = $(this).data('id')
    let newStatus = {
        completed: !status
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

