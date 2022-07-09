var localUsers = [];

var currentUser = {};

/* ==================================================================== */

/* CRUD Functions */

function loginUser(email, password) {
    if (userExists(email)) {
        for (let i = 0; i <= localUsers.length; i++) {
            let user_credentials = localUsers[i];

            if ((email == user_credentials.email) && (password === user_credentials.password)) {
                currentUser.email = user_credentials.email;
                currentUser.password = user_credentials.password;
                currentUser.name = user_credentials.name;
                currentUser.age = user_credentials.age;
                currentUser.phone = user_credentials.phone;
                currentUser.course = user_credentials.course;

                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));

                alert("Usuário logado!");

                location.href = "home.html";

                return;
            }
        }
    } else {
        alert("As credenciais digitadas ainda não foram cadastradas.");
    }
}

function registerUser(name, age, course, phone, email, password) {
    if (!userExists(email)) {

    let new_user = {"name": name, "age": age, "course": course, "phone": phone, "email": email, "password": password};

    localUsers.push(new_user);
    localStorage.setItem('users', JSON.stringify(localUsers));

    alert("Usuario Cadastrado! Retrocedendo para página de Login...");

    location.href = "login.html";
        
    } else {
        alert("Um usuário com esse email já foi cadastrado");
    }
}

function logoutUser() {
    currentUser = {};
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert("Usuario Deslogado!");
    location.href = "login.html";
}

/* ==================================================================== */

/* Extra Functions */

function userExists(email) {
    for (let i = 0; i < localUsers.length; i++) {
        if (email == localUsers[i].email) {
            return true;
        }
    }
    return false;
} 

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function colocarParenteses(e) {
    if (e.which !== 16) {
        var numChars = e.target.value.length;
    if (((e.which) ? e.which : e.keyCode) !== 8) {
        if (numChars === 0) {
            let thisVal = e.target.value;
            thisVal += '(';
            e.target.value = thisVal;
        }
        if (numChars === 4) {
            let thisVal = e.target.value;
            thisVal += ') ';
            e.target.value = thisVal;
        } 
        if (numChars === 11) {
            let thisVal = e.target.value;
            thisVal += '-';
            e.target.value = thisVal;
            }
        } 
    }
}

function loadDatabase() {
    
    var usersDB = localStorage.getItem('users');

    if (!usersDB) {
        
        alert('Não foram encontrados dados primitivos. Inserindo dados temporarios');

        localUsers = [{"name": "Administrador", "email": "admin@gmail.com", "password": "admin", "age": "", "course": "", "phone": ""}];

        localStorage.setItem('users', JSON.stringify(localUsers));

    } else  { 

        localUsers = JSON.parse(usersDB);
    }
}

/* ==================================================================== */

/* Submit Functions */

function submitLogin(event) {
    event.preventDefault();

    loginUser(document.getElementById("login-email").value, document.getElementById("login-password").value);
}

function submitRegister(event) {
    event.preventDefault();

    if (document.getElementById('register-password').value === document.getElementById('register-password-repeat').value) {

    registerUser(
    document.getElementById('register-name').value,
    document.getElementById('register-age').value,
    document.getElementById('register-course').value,
    document.getElementById('register-phone').value,
    document.getElementById('register-email').value,
    document.getElementById('register-password').value
    );

    } else {
        alert("Os campos de senha não coincidem!");
    }
}

/* ==================================================================== */

loadDatabase();

