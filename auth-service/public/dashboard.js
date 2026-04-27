async function loadProfile() {
    
}

async function displayProfile() {
    
}

async function saveProfile() {
    
}


function logout(){
    
}

window.onload = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('userInfo').innerHTML = <p>Welcome, ${user.login}</p>
}