import { useEffect, useState } from "react";
import { getPosts, Post, deletePost } from '../services/postService';
import PostForm from "./PostForm.tsx";

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<number | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts();
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id: number) => {
        setLoading(id);
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div>
            <h1>Posts</h1>
            <PostForm post={posts} setPost={setPosts} />
            <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid black" }}>User ID</th>
                    <th style={{ border: "1px solid black" }}>ID</th>
                    <th style={{ border: "1px solid black" }}>Title</th>
                    <th style={{ border: "1px solid black" }}>Body</th>
                    <th style={{ border: "1px solid black" }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts.map((post) => (
                    <tr key={post.id}>
                        <td style={{ border: "1px solid black" }}>{post.userId}</td>
                        <td style={{ border: "1px solid black" }}>{post.id}</td>
                        <td style={{ border: "1px solid black" }}>{post.title}</td>
                        <td style={{ border: "1px solid black" }}>{post.body}</td>
                        <td style={{ border: "1px solid black" }}>
                            <button onClick={() => handleDelete(post.id)} disabled={loading === post.id}>
                                {loading === post.id ? 'Deleting...' : 'Delete'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}