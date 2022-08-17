import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "posts");

export const getAllFiles = () => {
  return fs.readdirSync(postDirectory);
};

export const getPostData = async (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // remove file extension

  const filePath = path.join(postDirectory, `${postSlug}.md`);

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
};

export const getAllPosts = async () => {
  const postFiles = getAllFiles();

  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  const soretedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  const sortedArray = [];

  for (const item of allPosts) {
    item.then((data) => {
      if (data) {
        sortedArray.push(data);
      }
    });
  }

  return sortedArray;
};

export const getFeaturedPosts = async () => {
  const allPosts = await getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  // for (const post of allPosts) {
  //   post.then((item) => {
  //     if (item.isFeatured === true) {
  //       featuredPosts.push(item);
  //     }
  //   });
  // }

  return featuredPosts;
};
