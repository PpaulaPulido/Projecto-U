function user_sesion() {

    const menuItems = [
        { text: 'Sobre Nosotros', href: './MVQ.html', class: 'link' },
        { text: 'Inicio', href: './index_user.html', class: 'link' },
        { text: 'Mis favoritos', href: './favoritos.html', class: 'link' },
        { text: '<img src="/static/img/perfil_user.png" alt="perfil">', href: '#', class: 'link1', hasSubMenu: true }
    ];

    // Elementos del submenu
    const subMenuItems = [
        { text: 'Ver perfil', href: '#' },
        { text: 'Notificaciones', href: '#' },
        { text: 'Configuración', href: '#' },
        { text: 'Cerrar sesión', href: '#' }
    ];


    const nav_user = document.createElement('nav');
    nav_user.className = 'barra_nav';

    const nav_list = document.createElement('ul');
    nav_list.className = 'nav_list';

    // Crear elemento li para el buscador
    const buscador_li = document.createElement('li');
    buscador_li.innerHTML = `
        <div class="header_buscador">
            <div class="buscador_input">
                <div id="ctn-bars-search">
                    <input type="text" id="inputSearch" placeholder="¿Qué deseas buscar?">
                </div>
                <div id="ctn-icon-search">
                    <i class="fas fa-search" id="icon-search"></i>
                </div>
            </div>
            <ul id="box-search"></ul>
            <div id="cover-ctn-search"></div>
        </div>`;
    nav_list.appendChild(buscador_li);

    // Crear elementos li y a para el menú principal
    menuItems.forEach(item => {
        const liElement = document.createElement('li');
        if (item.hasSubMenu) {
            const aElement = document.createElement('a');
            aElement.className = item.class;
            aElement.href = item.href;
            aElement.innerHTML = item.text;
            liElement.appendChild(aElement);
            const subMenu = document.createElement('ul');
            subMenu.className = 'perfil_list';
            subMenuItems.forEach(subItem => {
                const subLiElement = document.createElement('li');
                const subAElement = document.createElement('a');
                subAElement.href = subItem.href;
                subAElement.textContent = subItem.text;
                subLiElement.appendChild(subAElement);
                subMenu.appendChild(subLiElement);
            });
            liElement.appendChild(subMenu);

        } else {
            const aElement = document.createElement('a');
            aElement.className = item.class;
            aElement.href = item.href;
            aElement.textContent = item.text;
            liElement.appendChild(aElement);
        }
        nav_list.appendChild(liElement);
    });

    // Agregar nav_list a nav_user
    nav_user.appendChild(nav_list);

    const header_barra = document.createElement('div');
    header_barra.id = "header_barra";
    header_barra.appendChild(nav_user);

    const header = document.querySelector('#cabeza');
    header.appendChild(header_barra);



}
user_sesion();