import FeaturedPosts from "../components/Home-Page/featured-posts";
import Hero from "../components/Home-Page/hero";
import { getFeaturedPosts } from "../lib/posts-util";
import styles from "../styles/Home.module.css";
import Head from "next/head";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <meta name="description" content="dev purpose"></meta>
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredPosts = await getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 60,
  };
}
