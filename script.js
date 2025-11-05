const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('light-mode', themeSwitch.checked);
  });
}

const profileBtn = document.querySelector('.profile-btn');
const dropdown = document.getElementById('profile-dropdown');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameField = document.querySelector('.header__username');
const greetingField = document.querySelector('.header__greeting');

if (profileBtn && dropdown) {
  profileBtn.addEventListener('click', () => {
    const isHidden = dropdown.hasAttribute('hidden');
    document.querySelectorAll('.dropdown').forEach(d => d.setAttribute('hidden', true));
    if (isHidden) dropdown.removeAttribute('hidden');
    else dropdown.setAttribute('hidden', true);
  });

  document.addEventListener('click', (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.setAttribute('hidden', true);
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    dropdown.setAttribute('hidden', true);

    if (document.querySelector('.login-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
      <div class="login-content">
        <h2>Вхід до акаунту</h2>
        <label>Ім’я: <input type="text" id="firstName" required></label>
        <label>Прізвище: <input type="text" id="lastName" required></label>
        <label>Email: <input type="email" id="email" required></label>
        <div class="login-actions">
          <button id="saveLogin">Увійти</button>
          <button id="cancelLogin">Скасувати</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#cancelLogin').addEventListener('click', () => modal.remove());

    modal.querySelector('#saveLogin').addEventListener('click', () => {
      const firstName = modal.querySelector('#firstName').value.trim();
      const lastName = modal.querySelector('#lastName').value.trim();
      const email = modal.querySelector('#email').value.trim();

      if (!firstName || !lastName || !email) {
        alert('Будь ласка, заповніть усі поля.');
        return;
      }

      const user = { firstName, lastName, email };
      localStorage.setItem('weatherUser', JSON.stringify(user));

      updateUserHeader();
      modal.remove();
      alert(`Ласкаво просимо, ${firstName}!`);
    });
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('weatherUser');
    updateUserHeader();
    alert('Ви вийшли з акаунту.');
  });
}

function updateUserHeader() {
  const userData = JSON.parse(localStorage.getItem('weatherUser'));

  if (userData && userData.firstName) {
    greetingField.textContent = 'Ласкаво просимо назад';
    usernameField.textContent = `Привіт, ${userData.firstName} ${userData.lastName}`;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
  } else {
    greetingField.textContent = 'Доброго ранку';
    usernameField.textContent = 'Привіт, Користувач';
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
}

updateUserHeader();



