import { useState, useEffect } from 'react';
// import { getForumPosts, createForumPost, commentOnPost } from '../services/api';

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [comments, setComments] = useState({});

  // Mock data for prototype
  const mockPosts = [
    {
      id: 1,
      title: "Looking for basketball partners",
      author: "John D.",
      content: "Anyone interested in playing basketball this weekend?",
      likes: 12,
      comments: [
        { id: 1, author: "Mike T.", content: "I'm down! What time?" },
        { id: 2, author: "Sarah K.", content: "I can join too!" }
      ]
    },
    {
      id: 2,
      title: "Chess club meeting",
      author: "Alex P.",
      content: "Our weekly chess club meeting is tomorrow at 5pm in the park.",
      likes: 8,
      comments: [
        { id: 1, author: "Emma W.", content: "I'll be there!" }
      ]
    }
  ];

  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch from API:
    // const response = await getForumPosts();
    // setPosts(response.data);
    setPosts(mockPosts);
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    // In a real app:
    // await createForumPost({ content: newPost });
    const newPostObj = {
      id: posts.length + 1,
      title: `New Post ${posts.length + 1}`,
      author: "Current User",
      content: newPost,
      likes: 0,
      comments: []
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const handleCommentSubmit = (postId, comment) => {
    if (!comment.trim()) return;
    
    // In a real app:
    // await commentOnPost(postId, { content: comment });
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              author: "Current User",
              content: comment
            }
          ]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setActiveComment(null);
    setComments(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="bg-[#1A2A5D] text-white min-h-screen p-4 pb-16">
      <header className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">Elevate Forum</h1>
      </header>

      <div className="mt-8">
        <form onSubmit={handlePostSubmit} className="mb-8">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Create a new post..."
            className="w-full p-3 rounded-lg text-black"
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Post
          </button>
        </form>

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-blue-900 p-4 rounded-lg">
              <h3 className="font-bold text-xl">{post.title}</h3>
              <p className="text-blue-200">By {post.author}</p>
              <p className="mt-2">{post.content}</p>
              
              <div className="flex items-center mt-3 space-x-4">
                <button className="flex items-center space-x-1">
                  <span>👍</span>
                  <span>{post.likes}</span>
                </button>
                <button 
                  className="flex items-center space-x-1"
                  onClick={() => setActiveComment(activeComment === post.id ? null : post.id)}
                >
                  <span>💬</span>
                  <span>{post.comments.length}</span>
                </button>
              </div>

              {activeComment === post.id && (
                <div className="mt-4">
                  <div className="space-y-3 mb-3">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="bg-blue-800 p-2 rounded">
                        <p className="font-semibold">{comment.author}</p>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={comments[post.id] || ''}
                      onChange={(e) => setComments({ ...comments, [post.id]: e.target.value })}
                      placeholder="Add a comment..."
                      className="flex-1 p-2 rounded-l text-black"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id, comments[post.id] || '')}
                      className="bg-blue-600 px-3 rounded-r"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 w-full bg-blue-900 p-3 flex justify-around">
        <a href="/">🏠</a>
        <a href="/forum">👥</a>
        <a href="/calendar">🗓️</a>
        <a href="/video">🎥</a>
        <a href="/settings">⚙️</a>
      </nav>
    </div>
  );
}