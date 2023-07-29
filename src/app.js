import { render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from './util.js';
import page from '../node_modules/page/page.mjs'
import { logout } from './api/auth.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { dashboardPage } from './views/dashboard.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

const root = document.querySelector('main');

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

export function updateUserNav() {
    let userData = getUserData();
    if (userData) {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none')
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block')
    } else {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block')
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none')
    }
}

document.getElementById('logoutBtn').addEventListener('click', (e) => {
    logout();
    updateUserNav();
    page.redirect('/dashboard');
})

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

updateUserNav();

page.start();