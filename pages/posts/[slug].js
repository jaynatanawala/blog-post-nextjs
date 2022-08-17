import Head from "next/head";
import React, { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getAllFiles, getPostData } from "../../lib/posts-util";

function SinglePostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const postData = await getPostData(params.slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const allFiles = getAllFiles();

  const slugs = allFiles.map((filename) => filename.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default SinglePostPage;
