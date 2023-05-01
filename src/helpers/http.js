export async function getRequest(url) {
  const res = await fetch(url, {
    method: 'GET',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res;
  return data.json();
}

export default {
  getRequest,
};
