document.addEventListener('DOMContentLoaded', () => {

    const submit = document.querySelector('#submit');

    submit.addEventListener('click', e => {
        console.log('form was submitted');
        e.preventDefault();

        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const user = {
            username,
            password
        };
        console.log('server request was made from form.js');
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                localStorage.setItem('token', JSON.parse(xhttp.responseText).token);
                console.log(JSON.parse(xhttp.responseText));
                document.querySelectorAll('.link')[0].click();
                document.querySelectorAll('.link')[5].innerText = 'Logout';
            }
            if (this.readyState == 4 && this.status == 401) {
                // display an error on the page
                // incorrect username or password
                console.log('Incorrect username or password');
            }
        };
        xhttp.open('POST', '/login', true);
        xhttp.setRequestHeader('Content-type', 'application/json');
        xhttp.send(JSON.stringify(user));
        document.querySelector('#username').input = '';
        document.querySelector('#password').input = '';
    });

    document.querySelector('#test').addEventListener('click', () => {
        console.log('test was clicked');
    });
});