import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/database";
import { Button, Container } from "../components";
import parse from "html-react-parser"; // Parses the HTML from RTE
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  // Check if the current user is the author
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      // First, delete the post document
      const status = await dbService.deletePost(post.$id);

      if (status) {
        // If post document is deleted, TRY to delete the image
        try {
          await dbService.deleteFile(post.featuredImage);
        } catch (error) {
          // Log an error if image deletion fails, but don't stop
          console.warn(
            "Post document deleted, but could not delete image (it may be gone):",
            error
          );
        }

        // Navigate home regardless of image deletion success
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold dark:text-white">
            Loading post...
          </h1>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={dbService.getFileView(post.featuredImage)}
            alt={post.title}
            className="rounded-xl object-contain max-h-[500px]"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold dark:text-white">{post.title}</h1>
        </div>
        <div className="browser-css dark:text-gray-200">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
