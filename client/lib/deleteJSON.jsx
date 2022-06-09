export async function deleteJSON(url) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}
