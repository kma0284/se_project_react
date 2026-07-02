const BASE_URL = "http://localhost:3001";

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

// GET all items
export function getItems() {
  return fetch(`${BASE_URL}/items`).then(handleResponse);
}

// POST new item
export function addItem(item) {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
}

// DELETE item
// export function deleteItem(id) {
//   return fetch(`${BASE_URL}/items/${id}`, {
//     method: "DELETE",
//   }).then(handleResponse);
// }

export function deleteItem(id) {
  console.log("DELETE URL:", `${BASE_URL}/items/${id}`);

  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
}
