// GET request 
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    throw error;
  }
};

// POST request
export const postData = async (endpoint, payload) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Veri gönderme hatası:', error);
    throw error;
  }
};
// DELETE request
export const deleteData = async (endpoint, id) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error('Veri silme hatası:', error);
    throw error;
  }
};
// PUT request
export const updateData = async (endpoint, id, payload) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Veri güncelleme hatası:', error);
    throw error;
  }
};