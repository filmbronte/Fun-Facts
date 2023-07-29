import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllFacts } from '../api/data.js';
import { factPreview } from './common.js';

const dashboardTemplate = (facts) => html`
<h2>Fun Facts</h2>
        <section id="dashboard">
            ${facts.length == 0 ?
        html`<h2>No Fun Facts yet.</h2>`
        :
        html`${facts.map(factPreview)}`}
        </section>
`

export async function dashboardPage(ctx) {
    const data = await getAllFacts();
    ctx.render(dashboardTemplate(data));
}