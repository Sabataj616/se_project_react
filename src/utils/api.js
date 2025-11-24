const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };
import { getToken } from "./token";
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

export const postItems = ({ name, imageUrl, weather, token }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const deleteItems = (itemID, token) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addCardLike = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(handleServerResponse);
};

export const removeCardLike = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(handleServerResponse);
};

export const updateProfile = (userData) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      name: userData.name,
      avatar: userData.avatar,
    }),
  }).then(handleServerResponse);
};
