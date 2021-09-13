import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

const token = JSON.parse(localStorage.getItem("user_auth"))?.token;
if (token) {
  API.interceptors.request.use((req) => {
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
}

API.defaults.withCredentials = true;

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`posts/${id}/like-post`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const signOut = () => API.delete("/user/signout");
