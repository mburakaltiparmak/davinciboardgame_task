import { Post } from '@/types/post.types';
import { UserType } from '@/types/user.types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// GET request 
export const fetchData = async (endpoint: string): Promise<UserType[] | Post[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// POST request
export const postData = async (endpoint: string, payload: UserType | Post) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Post error:', error);
    throw error;
  }
};

// DELETE request
export const deleteData = async (endpoint: string, id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

// PUT request
export const updateData = async (endpoint: string, id: number, payload: UserType | Post) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
};