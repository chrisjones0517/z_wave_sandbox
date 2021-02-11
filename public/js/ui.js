document.addEventListener('DOMContentLoaded', () => {
    console.log('page was loaded');

    authenticate();

    // trigger slide-out side menu
    const trigger = document.querySelector('#mobile-menu-trigger');
    trigger.addEventListener('click', () => {
        const nav = document.querySelector('nav');

        if (nav.classList[0] === 'nav-down') {
            nav.classList.add('nav-up');
            nav.classList.remove('nav-down');
        } else {
            nav.classList.add('nav-down');
            nav.classList.remove('nav-up');
        }
    });

    // variable portion of document
    const main = document.querySelector('.main');

    // view templates
    const dashboard = `
    <h1>Home Controller</h1>

    <!-- System Alerts Section -->
    <h2>System Alerts</h2>

    <div id="alerts">
        <!-- Pertinent information about system changes will be collected on the server and output dynamically here -->
    </div>

    <!-- Home Status Display/Control Section -->

    <h2>Home Status</h2>

    <div id="status">
        <!-- All connected devices with available controls and data will be output here dynamically after logging in -->
    </div>
    `;

    const schedules = `
        <h1>Schedules will go here</h1>
    `;

    const settings = `
        <h1>Settings will go here</h1>
    `;

    const users = `
        <h1>User will go here</h1>
    `;

    const documentation = `
        <h1>Documentation will go here</h1>
    `;

    const login = `
        <h1>Login</h1>
        <form id="login-form">
            <label for="username">User name</label><br>
            <input type="text" id="username"><br>
            <label for="password">Password</label><br>
            <input type="password" id="password"><br>
        </form>
        <button id="submit" class="primary">Submit</button>
    `;

    const linkList = document.querySelector('#link-list');

    main.innerHTML = login;

    linkList.addEventListener('click', e => {

        // change active class in menu
        const links = document.querySelectorAll('.link');

        links.forEach(el => {
            el.classList.remove('active');
        });

        e.target.classList.add('active');

        switch (e.target.innerText) {
            case 'Dashboard':
                main.innerHTML = dashboard;
                break;
            case 'Schedules':
                main.innerHTML = schedules;
                break;
            case 'Settings':
                main.innerHTML = settings;
                break;
            case 'User':
                main.innerHTML = users;
                break;
            case 'Documentation':
                main.innerHTML = documentation;
                break;
            case 'Login':
                main.innerHTML = login;
                break;
            case 'Logout':
                main.innerHTML = login;
                localStorage.removeItem('token');
                document.querySelectorAll('.link')[5].innerText = 'Login';
            default:
                break;
        }
    });
});

function authenticate() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
            document.querySelectorAll('.link')[0].click();
            document.querySelectorAll('.link')[5].innerText = 'Logout';
        }
        if (this.readyState == 4 && this.status == 401) {
            console.log('Token is not valid');
        }
    };
    xhttp.open('GET', '/data', true);
    xhttp.setRequestHeader('token', localStorage.getItem('token'));
    console.log(localStorage.getItem('token'));
    xhttp.send();
}

