async function loadProfile() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = '/';
        return;
    }

    const res = await fetch('http://localhost:3001/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });

    if(res.status === 200){
        const data = await res.json();
        displayProfile(data.profile);
        return;
    }

    if (res.status === 404) {
        document.getElementById('profileInfo').innerHTML =
            '<div class="profile-data empty">Profile is empty. Fill in the form below.</div>';
    }
}

function displayProfile(profile) {
    document.getElementById('profileInfo').innerHTML = 
    `
    <div class="profile-data">
        <p class="profile-label">Saved profile data</p>
        <p><strong>Full Name:</strong> ${profile.full_name || '-'}</p>
        <p><strong>Bio:</strong> ${profile.bio || '-'}</p>
    </div>
    `;

    document.getElementById('fullName').value = profile.full_name || '';
    document.getElementById('bio').value = profile.bio || '';
}

function renderSaveStatus(message, type = 'info') {
    const statusElement = document.getElementById('saveStatus');
    if (!statusElement) {
        return;
    }

    statusElement.textContent = message;
    statusElement.className = `status-message status-${type}`;
}

async function saveProfile() {
    const token = sessionStorage.getItem('token');
    const profileData = {
        full_name: document.getElementById('fullName').value,
        bio: document.getElementById('bio').value
    };

    renderSaveStatus('Saving profile...', 'info');

    const res = await fetch ('http://localhost:3001/api/profile',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        }
    );

    if(res.ok){
        renderSaveStatus('Profile saved successfully.', 'success');
        await loadProfile();
        return;
    }

    renderSaveStatus('Could not save profile.', 'error');
}

function logout(){
    sessionStorage.clear();
    window.location.href = '/';
}

window.onload = () => {
    const rawUser = sessionStorage.getItem('user');

    if (!rawUser) {
        window.location.href = '/';
        return;
    }

    const user = JSON.parse(rawUser);
    document.getElementById('userInfo').innerHTML = `<p>Welcome, ${user.login}</p>`;
    loadProfile();
};