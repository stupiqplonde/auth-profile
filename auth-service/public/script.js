async function login() {
    const login_input = document.getElementById("input-login").value;
    const password_input = document.getElementById("input-pass").value;

    const res = await fetch("api/login", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({login, password}),
    });

    const data = await res.json();
    if(data.success){
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));

        window.location.href = '/dashboard';
    }
      
}

async function register() {
    const login_input = document.getElementById("input-login").value;
    const password_input = document.getElementById("input-pass").value;

    const res = await fetch("api/register", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({login: login, password: password}),
    });

    const data = await res.json();
    if(data.success){
        alert(data.message);
    }
    else{
        alert(data.error);
    }
}

window.onload = () => {
    if(sessionStorage.getItem('user')) window.location.href = "/dashboard";
}