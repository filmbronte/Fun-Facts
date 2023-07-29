import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteFact, getFactById, getLikeById, getMyLikeById, sendLike } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (f, isOwner, onDelete, likes, showLike, onLike) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${f.imageUrl} alt="example1" />
            <p id="details-category">${f.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${f.description}</p>
                   <p id ="more-info">${f.moreInfo}</p>
              </div>

              <h3>Likes:<span id="likes">${likes}</span></h3>

    <!--Edit and Delete are only for creator-->
    ${isOwner ?
        html`
        <div id="action-buttons">
            <a href="/edit/${f._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
      </div>
    `
        :
        html`
    ${showLike ? html`
    <div id="action-buttons">
    <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
      </div>
    ` : null}
    `}

  </div>
</section>
`

export async function detailsPage(ctx) {
    let id = ctx.params.id;
    let userData = getUserData();

    let [fact, likes, hasLike] = await Promise.all([
        getFactById(id),
        getLikeById(id),
        userData ? getMyLikeById(id, userData._id) : 0
    ])

    let isOwner = userData && userData._id == fact._ownerId;
    let showLike = isOwner == false && hasLike == false && userData != null;

    ctx.render(detailsTemplate(fact, isOwner, onDelete, likes, showLike, onLike));

    async function onDelete() {
        const choice = confirm('Are you sure?');
        if (choice) {
            await deleteFact(id);
            ctx.page.redirect('/dashboard');
        } else {
            return;
        }
    }

    async function onLike() {
        await sendLike(id);
        ctx.page.redirect('/details/' + id);
    }
}