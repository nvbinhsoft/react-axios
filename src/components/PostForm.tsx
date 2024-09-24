import { createPost, Post } from "../services/postService.tsx";
import React, { useState } from "react";

export default function PostForm({ post, setPost }: { post: Post[]; setPost: React.Dispatch<React.SetStateAction<Post[]>> }) {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [userId, setUserId] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await createPost({
                userId,
                id: post.length + 1,
                title,
                body
            });
            setPost([...post, response.data]);
            setTitle("");
            setBody("");
            setUserId(1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="User ID"
                value={userId}
                onChange={(event) => setUserId(Number(event.target.value))}
                disabled={loading}
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                disabled={loading}
            />
            <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>Create</button>
        </form>
    );
}