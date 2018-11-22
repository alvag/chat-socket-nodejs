let params = new URLSearchParams(window.location.search);

let name = params.get('name');
let room = params.get('room');

let divUsuarios = $('#divUsuarios');
let sendForm = $('#sendForm');
let message = $('#message');
let divChatbox = $('#divChatbox');
let btnSendMessage = $('#sendMessage');



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

const renderMessages = (message, me) => {
    let html = '';

    let date = new Date(message.sent);
    let hour = `${date.getHours()}:${date.getMinutes()}`;

    let adminClass = 'info';

    if (message.name === 'Administrador') {
        adminClass = 'danger';
    }

    if (me) {
        html += `
            <li class="reverse animated fadeIn">
                <div class="chat-content">
                    <h5>${message.name}</h5>
                    <div class="box bg-light-inverse">${message.message}</div>
                </div>
                <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
                <div class="chat-time">${hour}</div>
            </li>
            `;
    } else {
        html += `
            <li class="animated fadeIn">`;
        if (message.name !== 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += `<div class="chat-content">
                <h5>${message.name}</h5>
                <div class="box bg-light-${adminClass}">${message.message}</div>
            </div>
            <div class="chat-time">${hour}</div>
        </li>
            `;
    }

    divChatbox.append(html);
};

const sendMessage = () => {
    if (message.val().trim().length > 0) {

        let mensaje = message.val();

        mensaje = mensaje.replace(/\r?\n/g, '<br />');

        console.log(message.val());

        socket.emit('sendMessage', {
            name,
            message: mensaje
        }, (response) => {
            message.val('').focus();
            renderMessages(response, true);
            scrollBottom();
        });
    }
};

btnSendMessage.on('click', function () {
    sendMessage();
});

sendForm.on('submit', function (e) {
    e.preventDefault();
    sendMessage();
});

message.keydown(function (e) {
    if (e.ctrlKey && e.keyCode === 13) {
        sendMessage();
    }
});

divUsuarios.on('click', 'a', function () {
    let id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});
