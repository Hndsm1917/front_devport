/**

 @description Sends a GET request to the specified URL and returns the response data as JSON.
 @async
 @param {string} url - The URL to send the GET request to.
 @returns {Promise<object>} - A Promise that resolves to the JSON response data.
 @throws {Error} - If the argument is not a valid string.
 */
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
