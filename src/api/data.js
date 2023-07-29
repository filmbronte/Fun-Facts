import * as api from "./api.js";

export async function getAllFacts() {
    return api.get('/data/facts?sortBy=_createdOn%20desc');
}

export async function createFact(data) {
    return api.post('/data/facts', data);
}

export async function getFactById(id) {
    return api.get('/data/facts/' + id);
}

export async function editFact(id, data) {
    return api.put('/data/facts/' + id, data);
}

export async function deleteFact(id) {
    return api.del('/data/facts/' + id);
}

export async function sendLike(factId) {
    return api.post('/data/likes', {
        factId
    })
}

export async function getLikeById(factId) {
    return api.get(`/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`)
}

export async function getMyLikeById(factId, userId) {
    return api.get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}