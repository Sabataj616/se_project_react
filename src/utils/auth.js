const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr25.twilightparadox.com"
    : "http://localhost:3001";
import { handleServerResponse } from "./api";

export const register = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.log("Server error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorData}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
