import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import dbService from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Initialize React Hook Form
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
        // Note: featuredImage is handled by 'image' file input
      },
    });

  const submit = async (data) => {
    try {
      if (post) {
        // UPDATE POST
        // 1. Handle image
        const file = data.image[0]
          ? await dbService.uploadFile(data.image[0])
          : null;

        if (file) {
          // If new image is uploaded, TRY to delete the old one
          try {
            await dbService.deleteFile(post.featuredImage);
          } catch (error) {
            // Log the error but don't stop the update process
            console.warn(
              "Could not delete old file (it may already be gone):",
              error
            );
          }
        }

        // 2. Update post in DB
        const dbPost = await dbService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // CREATE NEW POST
        // 1. Upload image
        const file = await dbService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId; // Add fileId to data object

          // 2. Create post in DB
          const dbPost = await dbService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("PostForm submission error:", error);
    }
  };

  // Slug transform logic
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-") // remove special chars
        .replace(/\s/g, "-"); // replace spaces with -
    }
    return "";
  }, []);

  // Watch title and auto-generate slug
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    // Unsubscribe on component unmount
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">
      {/* Left Column */}
      <div className="w-full md:w-2/3 space-y-4">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          readOnly={!!post}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/3 space-y-4">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })} // Image is only required if it's a new post
        />
        {/* Image Preview for existing post */}
        {post && (
          <div className="w-full mb-4">
            <img
              src={dbService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full max-h-60 object-contain text-gray-700 dark:text-gray-400"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
