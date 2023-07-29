import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/auth.js';

const registerTemplate = (onSubmit) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let repass = formData.get('re-password').trim();

        if (email == '' || password == '') {
            return alert('All fields are required!')
        };

        if (password != repass) {
            return alert('Passwords do not match!')
        };

        await register(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}