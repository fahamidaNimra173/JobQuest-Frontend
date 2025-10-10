'use client'

import React, { useState, useEffect } from 'react';
import { Heart, Send, Smile } from 'lucide-react';

interface Post {
    id: number;
    author: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
    loves: number;
    userReaction: 'like' | 'love' | null;
}

export default function CommunityPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState('');
    const [dotLottieLoaded, setDotLottieLoaded] = useState(false);

    useEffect(() => {
        // Load dotlottie-wc script
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
        script.type = 'module';
        script.onload = () => setDotLottieLoaded(true);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        const post: Post = {
            id: Date.now(),
            author: 'Fahamida',
            avatar: '👤',
            content: newPost,
            timestamp: 'Just now',
            likes: 0,
            loves: 0,
            userReaction: null
        };

        setPosts([post, ...posts]);
        setNewPost('');
    };

    const handleReaction = (postId: number, reaction: 'like' | 'love') => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const isCurrentReaction = post.userReaction === reaction;

                return {
                    ...post,
                    likes: reaction === 'like'
                        ? (isCurrentReaction ? post.likes - 1 : post.userReaction === 'love' ? post.likes + 1 : post.likes + 1)
                        : post.userReaction === 'like' ? post.likes - 1 : post.likes,
                    loves: reaction === 'love'
                        ? (isCurrentReaction ? post.loves - 1 : post.userReaction === 'like' ? post.loves + 1 : post.loves + 1)
                        : post.userReaction === 'love' ? post.loves - 1 : post.loves,
                    userReaction: isCurrentReaction ? null : reaction
                };
            }
            return post;
        }));
    };

    return (
        <div style={{
            minHeight: '100vh',


            display: 'flex',
            gap: '24px',
            padding: '24px 6px',
            paddingTop: '100px'
        }}>
            {/* Left Section - Animation and Welcome (Fixed) */}
            <div style={{
                // width: '400px',
                flexShrink: 0,
                position: 'sticky',
                top: '24px',
                height: 'fit-content',
                display: 'none'
            }}
                className="animation-section">
                <div style={{
                    minHeight: '100vh',
                    background: 'white',
                    borderRadius: '20px',
                    padding: '32px',
                    boxShadow: '0 4px 24px rgba(118, 112, 214, 0.15)',
                    textAlign: 'center'
                }}
                    className='flex flex-col items-center justify-center'
                >

                    {/* Animation */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '24px'
                    }}>
                        {React.createElement('dotlottie-player', {
                            src: "https://lottie.host/b12558fa-87b9-4c5b-8f27-713322ee8396/Xps7CNWCxF.lottie",
                            style: { width: "500px" },
                            autoplay: true,
                            loop: true
                        })}
                    </div>

                    {/* Welcome Text */}
                    <div>
                        <h2 style={{
                            color: '#7670d6',
                            fontSize: '28px',
                            fontWeight: '700',
                            margin: '0 0 12px 0',
                            lineHeight: '1.3'
                        }}>
                            Hello Fahamida! 👋
                        </h2>
                        <p style={{
                            color: '#9da0dc',
                            fontSize: '16px',
                            lineHeight: '1.6',
                            margin: '0'
                        }}>
                            Welcome to the community! What would you like to share today?
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Posts (Scrollable) */}
            <div style={{
                flex: 1,
                maxWidth: '100%',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    background: '#7670d6',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    marginBottom: '24px',
                    boxShadow: '0 4px 24px rgba(118, 112, 214, 0.2)'
                }}>
                    <h1 style={{
                        color: '#f8f3ed',
                        fontSize: '32px',
                        fontWeight: '700',
                        margin: '0 0 8px 0'
                    }}>
                        Community Thoughts
                    </h1>
                    <p style={{
                        color: '#d3d2ea',
                        margin: 0,
                        fontSize: '16px'
                    }}>
                        Share your ideas and connect with others
                    </p>
                </div>

                {/* Post Input */}
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '24px',
                    boxShadow: '0 2px 12px rgba(118, 112, 214, 0.08)'
                }}>
                    <div onSubmit={handleSubmit} style={{ display: 'contents' }}>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="What's on your mind?"
                            style={{
                                width: '100%',
                                minHeight: '100px',
                                border: '2px solid #d3d2ea',
                                borderRadius: '12px',
                                padding: '16px',
                                fontSize: '15px',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#7670d6'}
                            onBlur={(e) => e.target.style.borderColor = '#d3d2ea'}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.ctrlKey && newPost.trim()) {
                                    handleSubmit(e);
                                }
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                            <button
                                onClick={handleSubmit}
                                disabled={!newPost.trim()}
                                style={{
                                    background: newPost.trim() ? '#7670d6' : '#d3d2ea',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '12px 24px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    cursor: newPost.trim() ? 'pointer' : 'not-allowed',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (newPost.trim()) {
                                        e.currentTarget.style.background = '#9da0dc';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (newPost.trim()) {
                                        e.currentTarget.style.background = '#7670d6';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }
                                }}
                            >
                                <Send size={18} />
                                Post
                            </button>
                        </div>
                    </div>
                </div>

                {/* Posts Feed */}
                {posts.length === 0 ? (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '64px 32px',
                        textAlign: 'center',
                        boxShadow: '0 2px 12px rgba(118, 112, 214, 0.08)'
                    }}>
                        <div style={{
                            fontSize: '64px',
                            marginBottom: '16px',
                            filter: 'grayscale(20%)'
                        }}>
                            💭
                        </div>
                        <h3 style={{
                            color: '#7670d6',
                            fontSize: '22px',
                            fontWeight: '600',
                            margin: '0 0 8px 0'
                        }}>
                            No posts yet
                        </h3>
                        <p style={{
                            color: '#9da0dc',
                            fontSize: '15px',
                            margin: 0
                        }}>
                            Be the first to share your thoughts with the community!
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {posts.map(post => (
                            <div
                                key={post.id}
                                style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    boxShadow: '0 2px 12px rgba(118, 112, 214, 0.08)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(118, 112, 214, 0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(118, 112, 214, 0.08)';
                                }}
                            >
                                {/* Post Header */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                    <div style={{
                                        fontSize: '32px',
                                        width: '48px',
                                        height: '48px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#f8f3ed',
                                        borderRadius: '50%'
                                    }}>
                                        {post.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#7670d6', fontSize: '15px' }}>
                                            {post.author}
                                        </div>
                                        <div style={{ fontSize: '13px', color: '#9da0dc' }}>
                                            {post.timestamp}
                                        </div>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <p style={{
                                    color: '#333',
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    margin: '0 0 16px 0',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {post.content}
                                </p>

                                {/* Reactions */}
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    paddingTop: '16px',
                                    borderTop: '1px solid #f8f3ed'
                                }}>
                                    <button
                                        onClick={() => handleReaction(post.id, 'like')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '10px',
                                            background: post.userReaction === 'like' ? '#7670d6' : '#f8f3ed',
                                            color: post.userReaction === 'like' ? 'white' : '#7670d6',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = post.userReaction === 'like' ? '#9da0dc' : '#d3d2ea';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = post.userReaction === 'like' ? '#7670d6' : '#f8f3ed';
                                        }}
                                    >
                                        <Smile size={18} />
                                        {post.likes > 0 && post.likes}
                                    </button>
                                    <button
                                        onClick={() => handleReaction(post.id, 'love')}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '8px 16px',
                                            border: 'none',
                                            borderRadius: '10px',
                                            background: post.userReaction === 'love' ? '#7670d6' : '#f8f3ed',
                                            color: post.userReaction === 'love' ? 'white' : '#7670d6',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = post.userReaction === 'love' ? '#9da0dc' : '#d3d2ea';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = post.userReaction === 'love' ? '#7670d6' : '#f8f3ed';
                                        }}
                                    >
                                        <Heart size={18} fill={post.userReaction === 'love' ? 'white' : 'none'} />
                                        {post.loves > 0 && post.loves}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        @media (min-width: 768px) {
          .animation-section {
            display: block !important;
          }
          body > div > div:first-child {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
        @media (min-width: 1280px) {
          body > div > div:first-child {
            padding-left: 120px !important;
            padding-right: 120px !important;
          }
        }
      `}</style>
        </div>
    );
}