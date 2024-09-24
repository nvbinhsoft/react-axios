import axios from "axios";
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
    });

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
 const getPosts = (): Promise<{data: Post[]}> => {
    return api.get("/posts");
};

const deletePost = (id: number) : Promise<void> => api.delete(`/posts/${id}`);

const createPost = (post: Post) : Promise<{data: Post}> => api.post("/posts", post);

export { deletePost, getPosts, createPost };
