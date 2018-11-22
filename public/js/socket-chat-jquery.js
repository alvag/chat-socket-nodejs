let params = new URLSearchParams(window.location.search);

let divUsuarios = $('#divUsuarios');

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

divUsuarios.on('click', 'a', function () {
    let id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});
