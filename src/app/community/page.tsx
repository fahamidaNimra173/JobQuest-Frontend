

"use client";

import React, { useState } from "react";
import { Heart, Send, Smile, Laugh, MessageCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

interface Comment {
  _id: string;
  commenterId: string;
  role: string;
  commenterName: string;
  commenterEmail: string;
  commentText: string;
  commentDate: string;
  totalLikes: string[];
  totalHaha: string[];
  totalLove: string[];
}

interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  postTitle: string;
  post: string;
  totalLikes: string[] | number;
  totalHaha: string[] | number;
  totalLove: string[] | number;
  createdAt: string;
  comments: Comment[];
}

interface CreatePostData {
  postTitle: string;
  post: string;
}

// Time ago helper function
const getTimeAgo = (timestamp?: string): string => {
  if (!timestamp) return "just now";
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
const getAvatar = (firstName?: string, lastName?: string): string => {
  const avatars = ["👤", "👨", "👩", "🧑", "👨‍💼", "👩‍💼", "🧑‍💼", "👨‍💻", "👩‍💻", "🧑‍💻"];
  const name = `${firstName || ""} ${lastName || ""}`.trim();
  if (!name) return avatars[0];
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    avatars.length;
  return avatars[index];
};

export default function CommunityPage() {
  const { user } = useAuth();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  // Fetch posts
  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axiosInstance.get("/community");
      return response.data;
    },
  });

  // Get user's reaction on a post
  const getUserPostReaction = (post: Post): "like" | "love" | "haha" | null => {
    if (!user) return null;
    const likesArray = Array.isArray(post.totalLikes) ? post.totalLikes : [];
    const loveArray = Array.isArray(post.totalLove) ? post.totalLove : [];
    const hahaArray = Array.isArray(post.totalHaha) ? post.totalHaha : [];

    if (likesArray.includes(user._id)) return "like";
    if (loveArray.includes(user._id)) return "love";
    if (hahaArray.includes(user._id)) return "haha";

    return null;
  };

  // Get user's reaction on a comment
  const getUserCommentReaction = (comment: Comment): "like" | "love" | "haha" | null => {
    if (!user) return null;
    if (comment.totalLikes?.includes(user._id)) return "like";
    if (comment.totalLove?.includes(user._id)) return "love";
    if (comment.totalHaha?.includes(user._id)) return "haha";
    return null;
  };

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
      toast.success("Post created successfully!");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create post");
      }
    },
  });

  // React to post mutation
  const reactToPostMutation = useMutation({
    mutationFn: async ({ postId, reactionType }: { postId: string; reactionType: "like" | "love" | "haha" }) => {
      const response = await axiosInstance.patch(
        `/community/${postId}/react`,
        { type: reactionType }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to react");
      }
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async ({ postId, commentText }: { postId: string; commentText: string }) => {
      const response = await axiosInstance.post(`/community/${postId}/comment`, {
        commentText,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setCommentTexts((prev) => ({ ...prev, [variables.postId]: "" }));
      toast.success("Comment added!");
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to add comment");
      }
    },
  });

  // React to comment mutation
  const reactToCommentMutation = useMutation({
    mutationFn: async ({ postId, commentId, reactionType }: { postId: string; commentId: string; reactionType: "like" | "love" | "haha" }) => {
      const response = await axiosInstance.patch(
        `/community/${postId}/comment/${commentId}/react`,
        { type: reactionType }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to react to comment");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !newPostTitle.trim()) return;

    createPostMutation.mutate({
      postTitle: newPostTitle,
      post: newPost,
    });
  };

  const handlePostReaction = (postId: string, reaction: "like" | "love" | "haha") => {
    if (!user) {
      toast.error("Please login to react");
      return;
    }
    reactToPostMutation.mutate({ postId, reactionType: reaction });
  };

  const handleCommentReaction = (
    postId: string,
    commentId: string,
    reaction: "like" | "love" | "haha"
  ) => {
    if (!user) {
      toast.error("Please login to react");
      return;
    }
    reactToCommentMutation.mutate({ postId, commentId, reactionType: reaction });
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };



  const handleAddComment = (postId: string) => {
    const commentText = commentTexts[postId]?.trim();
    if (!commentText) return;
    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    addCommentMutation.mutate({ postId, commentText });
  };

  return (
    <div className="min-h-screen flex gap-6 px-1.5 pt-24">
      {/* Left Section - Animation and Welcome (Fixed) */}
      <div
        className="flex-shrink-0 sticky top-6 h-fit hidden animation-section"

      >
        <div
          className="min-h-screen bg-white rounded-[20px] p-8 shadow-[0_4px_24px_rgba(118,112,214,0.15)] text-center flex flex-col items-center justify-center"

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
              {user
                ? `Hello ${user?.firstName} ${user?.lastName}`
                : "Hello"}
              ! 👋
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

      >
        {/* Header */}
        <div className="text-[#f8f3ed] text-[32px] font-bold mb-2">
          <h1 className="flex-1 max-w-full mx-auto">
            Community Thoughts
          </h1>
          <p
            className="text-[#d3d2ea] m-0 text-[16px]">
            Share your ideas and connect with others
          </p>
        </div>

        {/* Post Input */}
        <div
          className="bg-white rounded-[16px] p-6 mb-6 shadow-[0_2px_12px_rgba(118,112,214,0.08)]"

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
              className="text-black w-full border-2 border-[#d3d2ea] rounded-[12px] p-4 text-[15px] font-inherit font-semibold outline-none transition-colors duration-200 box-border"

              onFocus={(e) => (e.target.style.borderColor = "#7670d6")}
              onBlur={(e) => (e.target.style.borderColor = "#d3d2ea")}
            />
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              disabled={createPostMutation.isPending}
              style={{ resize: "vertical" }}
              className="text-black resize-none w-full min-h-[100px] border-2 border-[#d3d2ea] rounded-[12px] p-4 text-[15px] font-inherit  outline-none transition-colors duration-200 box-border"


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
                  !user ||
                  !newPost.trim() ||
                  !newPostTitle.trim() ||
                  createPostMutation.isPending
                }

                className={`flex items-center gap-2 px-6 py-3 rounded-[10px] text-[15px] font-semibold transition-all duration-200 border-none text-white ${newPost.trim() && newPostTitle.trim() && !createPostMutation.isPending
                  ? "bg-[#7670d6] cursor-pointer"
                  : "bg-[#d3d2ea] cursor-not-allowed"
                  }`}
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
          <div className="bg-white rounded-[16px] py-16 px-8 text-center shadow-[0_2px_12px_rgba(118,112,214,0.08)]">
            <p style={{ color: "#9da0dc", fontSize: "15px" }}>
              Loading posts...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-[16px] py-16 px-8 text-center shadow-[0_2px_12px_rgba(118,112,214,0.08)]">
            <div className="text-[64px] mb-4 filter grayscale-[20%]">
              💭
            </div>
            <h3 className="text-[#7670d6] text-[22px] font-semibold mb-2">
              No posts yet
            </h3>
            <p className="text-[#9da0dc] text-[15px] m-0">
              Be the first to share your thoughts with the community!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => {
              const userReaction = getUserPostReaction(post);
              const isCommentsExpanded = expandedComments.has(post._id);

              return (
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
                    className="flex items-center gap-3 mb-4"

                  >
                    <div className="text-[32px] w-12 h-12 flex items-center justify-center bg-[#f8f3ed] rounded-full">

                      {getAvatar(post.firstName, post.lastName)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className=" font-semibold text-[#7670d6] text-[15px]"

                      >
                        {`${post.firstName} ${post.lastName}`}
                      </div>
                      <div style={{ fontSize: "13px", color: "#9da0dc" }}>
                        {getTimeAgo(post.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-[#333] text-[18px] font-bold mb-3 leading-[1.4]">


                    {post.postTitle}
                  </h3>

                  {/* Post Content */}
                  <p className="text-[#555] text-[15px] leading-[1.6] mb-4 whitespace-pre-wrap">


                    {post.post}
                  </p>

                  {/* Post Reactions */}
                  <div className="flex gap-2 pt-4 border-t border-[#f8f3ed] flex-wrap items-center">

                    <button
                      onClick={() => handlePostReaction(post._id, "like")}
                      disabled={reactToPostMutation.isPending}
                      className={`flex items-center gap-[6px] px-4 py-2 rounded-[10px] border-none cursor-pointer text-[14px] font-semibold transition-all duration-200 ${userReaction === "like" ? "bg-[#7670d6] text-white" : "bg-[#f8f3ed] text-[#7670d6]"
                        }`}

                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          userReaction === "like" ? "#9da0dc" : "#d3d2ea";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          userReaction === "like" ? "#7670d6" : "#f8f3ed";
                      }}
                    >
                      <Smile size={18} />

                      {post.totalLikes?.length > 0 && post.totalLikes.length}
                    </button>
                    <button
                      onClick={() => handlePostReaction(post._id, "love")}
                      disabled={reactToPostMutation.isPending}
                      className={`flex items-center gap-[6px] px-4 py-2 rounded-[10px] border-none cursor-pointer text-[14px] font-semibold transition-all duration-200 ${userReaction === "love" ? "bg-[#7670d6] text-white" : "bg-[#f8f3ed] text-[#7670d6]"
                        }`}

                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          userReaction === "love" ? "#9da0dc" : "#d3d2ea";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          userReaction === "love" ? "#7670d6" : "#f8f3ed";
                      }}
                    >
                      <Heart
                        size={18}
                        fill={userReaction === "love" ? "white" : "none"}
                      />
                      {post.totalLove?.length > 0 && post.totalLove.length}
                    </button>
                    <button
                      onClick={() => handlePostReaction(post._id, "haha")}
                      disabled={reactToPostMutation.isPending}
                      className={`flex items-center gap-[6px] px-4 py-2 rounded-[10px] border-none cursor-pointer text-[14px] font-semibold transition-all duration-200 ${userReaction === "haha" ? "bg-[#7670d6] text-white" : "bg-[#f8f3ed] text-[#7670d6]"
                        }`}

                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          userReaction === "haha" ? "#9da0dc" : "#d3d2ea";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          userReaction === "haha" ? "#7670d6" : "#f8f3ed";
                      }}
                    >
                      <Laugh size={18} />
                      {post.totalHaha?.length > 0 && post.totalHaha.length}
                    </button>

                    {/* Comment Toggle Button */}
                    <button
                      onClick={() => toggleComments(post._id)}
                      className={`flex items-center gap-[6px] px-4 py-2 rounded-[10px] border-none cursor-pointer text-[14px] font-semibold transition-all duration-200 ml-auto ${isCommentsExpanded ? "bg-[#7670d6] text-white" : "bg-[#f8f3ed] text-[#7670d6]"
                        }`}
                    >
                      <MessageCircle size={18} />
                      {post.comments?.length || 0}
                    </button>
                  </div>

                  {/* Comments Section */}
                  {
                    isCommentsExpanded && (
                      <div
                        className="mt-5 pt-5 border-t border-[#f8f3ed]"

                      >
                        {/* Add Comment Form */}
                        <div style={{ marginBottom: "20px" }}>
                          <div style={{ display: "flex", gap: "12px" }}>
                            <textarea
                              value={commentTexts[post._id] || ""}
                              onChange={(e) =>
                                setCommentTexts((prev) => ({
                                  ...prev,
                                  [post._id]: e.target.value,
                                }))
                              }
                              placeholder="Write a comment..."
                              disabled={!user}
                              className="flex-1 text-black min-h-[60px] border-2 border-[#d3d2ea] rounded-[10px] p-3 text-[14px] font-inherit resize-none outline-none transition-colors duration-200"

                              onFocus={(e) =>
                                (e.target.style.borderColor = "#7670d6")
                              }
                              onBlur={(e) =>
                                (e.target.style.borderColor = "#d3d2ea")
                              }
                            />
                            <button
                              onClick={() => handleAddComment(post._id)}
                              disabled={!user || !commentTexts[post._id]?.trim() || addCommentMutation.isPending
                              }
                              className={`flex items-center gap-[6px] rounded-[10px] px-5 py-3 text-[14px] font-semibold transition-all duration-200 h-fit border-none ${user && commentTexts[post._id]?.trim()
                                ? "bg-[#7670d6] text-white cursor-pointer"
                                : "bg-[#d3d2ea] text-white cursor-not-allowed"
                                }`}

                            >
                              <Send size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Comments List */}
                        {post.comments && post.comments.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "16px",
                            }}
                          >
                            {post.comments.map((comment) => {
                              const commentReaction = getUserCommentReaction(comment);

                              return (
                                <div key={comment._id}
                                  className="bg-[#f8f3ed] rounded-[12px] p-4">
                                  {/* Comment Header */}
                                  <div
                                    className="flex items-center gap-2 mt-2">
                                    <div
                                      className="text-[24px] w-9 h-9 flex items-center justify-center bg-white rounded-full">
                                      {getAvatar(
                                        comment.commenterName.split(" ")[0],
                                        comment.commenterName.split(" ")[1]
                                      )}
                                    </div>
                                    <div>
                                      <div
                                        className="font-semibold text-[#7670d6] text-[14px]">
                                        {comment.commenterName}
                                      </div>
                                      <div className="text-[12px] text-[#9da0dc]"
                                      >
                                        {getTimeAgo(comment.commentDate)}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Comment Text */}
                                  <p className="text-[#555] text-[14px] leading-[1.6] mb-3"

                                  >
                                    {comment.commentText}
                                  </p>

                                  {/* Comment Reactions */}
                                  <div className="flex gap-1.5 flex-wrap"
                                  >
                                    <button
                                      onClick={() => handleCommentReaction(post._id, comment._id, "like")
                                      }
                                      disabled={reactToCommentMutation.isPending}
                                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border-none text-[12px] font-semibold transition-all duration-200 cursor-pointer ${commentReaction === "like" ? "bg-[#7670d6] text-white" : "bg-white text-[#7670d6]"
                                        }`}

                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          commentReaction === "like"
                                            ? "#9da0dc"
                                            : "#e8e3f7";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          commentReaction === "like"
                                            ? "#7670d6"
                                            : "white";
                                      }}
                                    >
                                      <Smile size={14} />
                                      {comment.totalLikes?.length > 0 &&
                                        comment.totalLikes.length}
                                    </button>
                                    <button
                                      onClick={() => handleCommentReaction(post._id, comment._id, "love")
                                      }
                                      disabled={reactToCommentMutation.isPending}
                                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border-none text-[12px] font-semibold transition-all duration-200 cursor-pointer ${commentReaction === "love" ? "bg-[#7670d6] text-white" : "bg-white text-[#7670d6]"
                                        }`}

                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          commentReaction === "love"
                                            ? "#9da0dc"
                                            : "#e8e3f7";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          commentReaction === "love"
                                            ? "#7670d6"
                                            : "white";
                                      }}
                                    >
                                      <Heart
                                        size={14}
                                        fill={
                                          commentReaction === "love"
                                            ? "white"
                                            : "none"
                                        }
                                      />
                                      {comment.totalLove?.length > 0 &&
                                        comment.totalLove.length}
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleCommentReaction(
                                          post._id,
                                          comment._id,
                                          "haha"
                                        )
                                      }
                                      disabled={reactToCommentMutation.isPending}
                                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border-none text-[12px] font-semibold transition-all duration-200 cursor-pointer ${commentReaction === "haha" ? "bg-[#7670d6] text-white" : "bg-white text-[#7670d6]"
                                        }`}

                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                          commentReaction === "haha"
                                            ? "#9da0dc"
                                            : "#e8e3f7";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                          commentReaction === "haha"
                                            ? "#7670d6"
                                            : "white";
                                      }}
                                    >
                                      <Laugh size={14} />
                                      {comment.totalHaha?.length > 0 &&
                                        comment.totalHaha.length}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )
                  }
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* there was the style for animation */}

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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div >
  );
}




























