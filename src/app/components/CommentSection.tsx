'use client'
import { useState, FormEvent } from "react";

// Define types for comments
type Comment = {
  author: string;
  comment: string;
};

interface CommentSectionProps {
  initialComments: Comment[];
}

export default function CommentSection({ initialComments }: CommentSectionProps) {
  // State to manage the list of comments
  const [comments, setComments] = useState<Comment[]>(initialComments);

  // Handle new comment submission
  const handleCommentSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const author = (form.author.value || "").trim();
    const comment = (form.comment.value || "").trim();

    // Ensure that both the author and comment fields are non-empty
    if (author && comment) {
      const newComment = { author, comment };
      setComments((prevComments) => [...prevComments, newComment]);
      form.reset();
    }
  };

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg mt-8 w-[870px] ">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>

      {/* Display existing comments */}
      <div className="space-y-4 mb-6">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-800">{comment.author}</p>
              <p className="text-gray-600 mt-2">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Comment Form */}
      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Leave a Comment</h4>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm text-gray-600 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm text-gray-600 mb-2">
              Your Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white rounded-md hover:bg-pink-500 focus:outline-none"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
