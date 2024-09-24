import { createPost, updatePost, Post } from "../services/postService.tsx";
import React, { useState, useEffect } from "react";

export default function PostForm({ post, setPost, editingPost, setEditingPost }: { post: Post[]; setPost: React.Dispatch<React.SetStateAction<Post[]>>; editingPost: Post | null; setEditingPost: React.Dispatch<React.SetStateAction<Post | null>> }) {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [userId, setUserId] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setBody(editingPost.body);
            setUserId(editingPost.userId);
        }
    }, [editingPost]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (editingPost) {
                const response = await updatePost({
                    userId,
                    id: editingPost.id,
                    title,
                    body
                });
                setPost(post.map(p => p.id === editingPost.id ? response.data : p));
                setEditingPost(null);
            } else {
                const response = await createPost({
                    userId,
                    id: post.length + 1,
                    title,
                    body
                });
                setPost([...post, response.data]);
            }
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
            <button type="submit" disabled={loading}>{editingPost ? "Update" : "Create"}</button>
        </form>
    );
}