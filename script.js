const apiUrl = 'https://jsonplaceholder.typicode.com/users';

const cargar = async () => {
    try {
        const { data: users } = await axios.get(apiUrl);  
        const firstTenUsers = users.slice(0, 10);  
        console.log(`Usuarios cargados: ${firstTenUsers.length}`);
        console.log(`Primera fila:`, firstTenUsers[0]);

        Tabla(firstTenUsers);

        $('#filtrar').on('input', (e) => filterUsers(e, firstTenUsers));
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
};

const Tabla = (users) => {
    const tbody = $('#user-table tbody');
    tbody.empty();  
    users.forEach(({ id, name, email, company }) => {
        const row = `
            <tr class="user-row" data-id="${id}">
                <td>${name}</td>
                <td>${email}</td>
                <td>${company.name}</td>
            </tr>
        `;
        tbody.append(row);
    });

 
    $('.user-row').on('click', function () {
        const userId = $(this).data('id');
        showUserDetail(userId, users);
    });
};


const filtrarusuarios = (event, users) => {
    const filterText = event.target.value.toLowerCase();
    const filteredUsers = users.filter(({ name }) => name.toLowerCase().includes(filterText));

    console.log(`Término usado en el filtro: "${filterText}"`);
    console.log(`Coincidencias: ${filteredUsers.length}`);

    renderTable(filteredUsers); 
};

const showUserDetail = (userId, users) => {
    const user = users.find(({ id }) => id === userId);

    if (user) {
        const { phone, address: { street, city } } = user;  
        $('#user-phone').text(phone);
        $('#user-address').text(`${street}, ${city}`);
        $('#user-detail').show();
        console.log(`Detalle del usuario seleccionado: ${user.name}`);
    }
};


$(document).ready(cargar);
