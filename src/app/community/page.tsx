"use client";

import React, { useState } from "react";
import { Heart, Send, Smile, Laugh } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";

interface Post {
  _id: string;
  name: string;
  email: string;
  postTitle: string;
  post: string;
  totalLikes: number;
  totalHaha: number;
  totalLove: number;
  createdAt: string;
  userReaction?: "like" | "love" | "haha" | null;
}

interface CreatePostData {
  name: string;
  email: string;
  postTitle: string;
  post: string;
  // totalLikes:number ,
  // totalHaha:number,
  // totalLove:number,
}

interface ReactionData {
  postId: string;
  reactionType: "like" | "love" | "haha";
}

// Time ago helper function
const getTimeAgo = (timestamp?: string): string => {
  if(!timestamp) return "just now"
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInMs = now.getTime() - postTime.getTime();

  const diffInSeconds = Math.floor(diffInMs / 1000);

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  const diffInHours = Math.floor(diffInMinutes / 60);

  const diffInDays = Math.floor(diffInHours / 24);

  const diffInWeeks = Math.floor(diffInDays / 7);

  const diffInMonths = Math.floor(diffInDays / 30);

  const diffInYears = Math.floor(diffInDays / 365);


  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  if (diffInHours < 24)
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  if (diffInDays < 7)
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  if (diffInWeeks < 4)
    return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
  if (diffInMonths < 12)
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
  return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
};

// Avatar generator based on name
const getAvatar = (name?: string): string => {
  const avatars = ["👤", "👨", "👩", "🧑", "👨‍💼", "👩‍💼", "🧑‍💼", "👨‍💻", "👩‍💻", "🧑‍💻"];
  if (!name) return avatars[0]
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    avatars.length;
  return avatars[index];
};

// Create axios instance
const axiosInstanceTwo = axios.create({
  baseURL: "https://job-portal-backend-xshy.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default function CommunityPage() {
  const { user } = useAuth();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const queryClient = useQueryClient();

  // Fetch posts
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/community");
      return response.data;
    },
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: CreatePostData) => {
      const response = await axiosInstance.post("/community", postData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setNewPostTitle("");
      setNewPost("");
    },
  });

  // React to post mutation
  const reactToPostMutation = useMutation({
    mutationFn: async (reactionData: ReactionData) => {
      const response = await axiosInstance.patch(
        `/community/${reactionData.postId}/react`,
        {
          reactionType: reactionData.reactionType,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !newPostTitle.trim()) return;

    createPostMutation.mutate({
      name: user?.name,
      email: user?.email,
      postTitle: newPostTitle,
      post: newPost
      // totalLikes: 0,
      // totalHaha: 0,
      // totalLove: 0,

    });
  };

  const handleReaction = (
    postId: string,
    reaction: "like" | "love" | "haha"
  ) => {
    reactToPostMutation.mutate({
      postId,
      reactionType: reaction,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        gap: "24px",
        padding: "24px 6px",
        paddingTop: "100px",
      }}
    >
      {/* Left Section - Animation and Welcome (Fixed) */}
      <div
        style={{
          flexShrink: 0,
          position: "sticky",
          top: "24px",
          height: "fit-content",
          display: "none",
        }}
        className="animation-section"
      >
        <div
          style={{
            minHeight: "100vh",
            background: "white",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 4px 24px rgba(118, 112, 214, 0.15)",
            textAlign: "center",
          }}
          className="flex flex-col items-center justify-center"
        >
          {/* Animation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            {React.createElement("dotlottie-player", {
              src: "https://lottie.host/b12558fa-87b9-4c5b-8f27-713322ee8396/Xps7CNWCxF.lottie",
              style: { width: "500px" },
              autoplay: true,
              loop: true,
            })}
          </div>

          {/* Welcome Text */}
          <div>
            <h2
              style={{
                color: "#7670d6",
                fontSize: "28px",
                fontWeight: "700",
                margin: "0 0 12px 0",
                lineHeight: "1.3",
              }}
            >
              {user ? `Hello ${`${user?.firstName} ${user?.lastName}`}` : "Hello"}! 👋
            </h2>
            <p
              style={{
                color: "#9da0dc",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0",
              }}
            >
              Welcome to the community! What would you like to share today?
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Posts (Scrollable) */}
      <div
        style={{
          flex: 1,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#7670d6",
            borderRadius: "16px",
            padding: "32px 24px",
            marginBottom: "24px",
            boxShadow: "0 4px 24px rgba(118, 112, 214, 0.2)",
          }}
        >
          <h1
            style={{
              color: "#f8f3ed",
              fontSize: "32px",
              fontWeight: "700",
              margin: "0 0 8px 0",
            }}
          >
            Community Thoughts
          </h1>
          <p
            style={{
              color: "#d3d2ea",
              margin: 0,
              fontSize: "16px",
            }}
          >
            Share your ideas and connect with others
          </p>
        </div>

        {/* Post Input */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 2px 12px rgba(118, 112, 214, 0.08)",
          }}
        >
          {!user && (
            <p style={{ color: "red", marginBottom: "12px", fontSize: "14px" }}>
              You must be logged in to post.
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <input
              type="text"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              placeholder="Post Title"
              disabled={createPostMutation.isPending}
              style={{
                color: 'black',
                width: "100%",
                border: "2px solid #d3d2ea",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "15px",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
                fontWeight: "600",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#7670d6")}
              onBlur={(e) => (e.target.style.borderColor = "#d3d2ea")}
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              // disabled={!user||createPostMutation.isPending}
              disabled={createPostMutation.isPending}
              style={{
                color: 'black',
                width: "100%",
                minHeight: "100px",
                border: "2px solid #d3d2ea",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "15px",
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              className="resize-none"
              onFocus={(e) => (e.target.style.borderColor = "#7670d6")}
              onBlur={(e) => (e.target.style.borderColor = "#d3d2ea")}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  e.ctrlKey &&
                  newPost.trim() &&
                  newPostTitle.trim()
                ) {
                  handleSubmit(e);
                }
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                disabled={
                  !user || !newPost.trim() ||
                  !newPostTitle.trim() ||
                  createPostMutation.isPending
                }
                //  disabled={
                //   !newPost.trim() ||
                //   !newPostTitle.trim() ||
                //   createPostMutation.isPending
                // }
                style={{
                  background:
                    newPost.trim() &&
                      newPostTitle.trim() &&
                      !createPostMutation.isPending
                      ? "#7670d6"
                      : "#d3d2ea",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor:
                    newPost.trim() &&
                      newPostTitle.trim() &&
                      !createPostMutation.isPending
                      ? "pointer"
                      : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (
                    newPost.trim() &&
                    newPostTitle.trim() &&
                    !createPostMutation.isPending
                  ) {
                    e.currentTarget.style.background = "#9da0dc";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (
                    newPost.trim() &&
                    newPostTitle.trim() &&
                    !createPostMutation.isPending
                  ) {
                    e.currentTarget.style.background = "#7670d6";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <Send size={18} />
                {createPostMutation.isPending ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        {isLoading ? (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "64px 32px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(118, 112, 214, 0.08)",
            }}
          >
            <p style={{ color: "#9da0dc", fontSize: "15px" }}>
              Loading posts...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "64px 32px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(118, 112, 214, 0.08)",
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
                filter: "grayscale(20%)",
              }}
            >
              💭
            </div>
            <h3
              style={{
                color: "#7670d6",
                fontSize: "22px",
                fontWeight: "600",
                margin: "0 0 8px 0",
              }}
            >
              No posts yet
            </h3>
            <p
              style={{
                color: "#9da0dc",
                fontSize: "15px",
                margin: 0,
              }}
            >
              Be the first to share your thoughts with the community!
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {posts.map((post) => (
              <div
                key={post._id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  boxShadow: "0 2px 12px rgba(118, 112, 214, 0.08)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(118, 112, 214, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(118, 112, 214, 0.08)";
                }}
              >
                {/* Post Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f8f3ed",
                      borderRadius: "50%",
                    }}
                  >
                    {getAvatar(post.name)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: "600",
                        color: "#7670d6",
                        fontSize: "15px",
                      }}
                    >
                      {post.name}
                    </div>
                    <div style={{ fontSize: "13px", color: "#9da0dc" }}>
                      {getTimeAgo(post.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Post Title */}
                <h3
                  style={{
                    color: "#333",
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 0 12px 0",
                    lineHeight: "1.4",
                  }}
                >
                  {post.postTitle}
                </h3>

                {/* Post Content */}
                <p
                  style={{
                    color: "#555",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    margin: "0 0 16px 0",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {post.post}
                </p>

                {/* Reactions */}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    paddingTop: "16px",
                    borderTop: "1px solid #f8f3ed",
                  }}
                >
                  <button
                    onClick={() => handleReaction(post._id, "like")}
                    disabled={reactToPostMutation.isPending}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "10px",
                      background:
                        post.userReaction === "like" ? "#7670d6" : "#f8f3ed",
                      color: post.userReaction === "like" ? "white" : "#7670d6",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        post.userReaction === "like" ? "#9da0dc" : "#d3d2ea";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        post.userReaction === "like" ? "#7670d6" : "#f8f3ed";
                    }}
                  >
                    <Smile size={18} />
                    {post.totalLikes > 0 && post.totalLikes}
                  </button>
                  <button
                    onClick={() => handleReaction(post._id, "love")}
                    disabled={reactToPostMutation.isPending}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "10px",
                      background:
                        post.userReaction === "love" ? "#7670d6" : "#f8f3ed",
                      color: post.userReaction === "love" ? "white" : "#7670d6",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        post.userReaction === "love" ? "#9da0dc" : "#d3d2ea";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        post.userReaction === "love" ? "#7670d6" : "#f8f3ed";
                    }}
                  >
                    <Heart
                      size={18}
                      fill={post.userReaction === "love" ? "white" : "none"}
                    />
                    {post.totalLove > 0 && post.totalLove}
                  </button>
                  <button
                    onClick={() => handleReaction(post._id, "haha")}
                    disabled={reactToPostMutation.isPending}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "10px",
                      background:
                        post.userReaction === "haha" ? "#7670d6" : "#f8f3ed",
                      color: post.userReaction === "haha" ? "white" : "#7670d6",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        post.userReaction === "haha" ? "#9da0dc" : "#d3d2ea";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        post.userReaction === "haha" ? "#7670d6" : "#f8f3ed";
                    }}
                  >
                    <Laugh size={18} />
                    {post.totalHaha > 0 && post.totalHaha}
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