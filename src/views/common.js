import { html } from '../../node_modules/lit-html/lit-html.js';

export const factPreview = (f) => html`
<div class="fact">
            <img src=${f.imageUrl} alt="example1" />
            <h3 class="category">${f.category}</h3>
            <p class="description">${f.description}</p>
            <a class="details-btn" href="/details/${f._id}">More Info</a>
          </div>
`