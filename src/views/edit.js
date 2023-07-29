import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFactById, editFact } from '../api/data.js';

const editTemplate = (onSubmit, f) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              value=${f.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              value=${f.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
          >${f.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
          >${f.moreInfo}</textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const fact = await getFactById(id);

    ctx.render(editTemplate(onEdit, fact));

    async function onEdit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const category = formData.get('category').trim();
        const imageUrl = formData.get('image-url').trim();
        const description = formData.get('description').trim();
        const moreInfo = formData.get('additional-info').trim();

        if (category == '' || imageUrl == '' || description == '' || moreInfo == '') {
            return alert('All fields are required!');
        }

        await editFact(id, { category, imageUrl, description, moreInfo });

        ctx.page.redirect('/details/' + id);
    }
}