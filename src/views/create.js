import { html } from '../../node_modules/lit-html/lit-html.js';
import { createFact } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`

export function createPage(ctx) {
    ctx.render(createTemplate(onCreate));

    async function onCreate(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const category = formData.get('category').trim();
        const imageUrl = formData.get('image-url').trim();
        const description = formData.get('description').trim();
        const moreInfo = formData.get('additional-info').trim();

        if (category == '' || imageUrl == '' || description == '' || moreInfo == '') {
            return alert('All fields are required!');
        }

        await createFact({ category, imageUrl, description, moreInfo });

        ctx.page.redirect('/dashboard');
    }
}