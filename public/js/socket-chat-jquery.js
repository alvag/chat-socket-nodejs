let params = new URLSearchParams(window.location.search);

let name = params.get('name');
let room = params.get('room');

let divUsuarios = $('#divUsuarios');
let sendForm = $('#sendForm');
let message = $('#message');
let divChatbox = $('#divChatbox');

const renderUsers = (users) => {
    let html = '';
    html += `
    <li>
        <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get('room')}</span></a>
    </li>
    `;

    users.forEach(user => {
        html += `
        <li>
            <a data-id="${user.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${user.name} <small class="text-success">online</small></span></a>
        </li>
        `;
    });

    divUsuarios.html(html);
};

const renderMessages = (message) => {
    let html = '';

    html += `
    <li class="animated fadeIn">
        <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>
        <div class="chat-content">
            <h5>${message.name}</h5>
            <div class="box bg-light-info">${message.message}</div>
        </div>
        <div class="chat-time">10:56 am</div>
    </li>
    `;

    divChatbox.append(html);
};

divUsuarios.on('click', 'a', function () {
    let id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

sendForm.on('submit', function (e) {
    e.preventDefault();

    console.log(message.val());

    if (message.val().trim().length > 0) {
        socket.emit('sendMessage', {
            name,
            message: message.val()
        }, (response) => {
            message.val('').focus();
            renderMessages(response);
        });
    }
});
