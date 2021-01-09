import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { FC } from "react";

import { Divider } from "@chakra-ui/react";
import PageBody from "../../components/PageBody";
import PageHeader from "../../components/PageHeader";
import { getAllContents, getContentBySlug } from "../../util";

import { PostType } from "./types";
import { Button } from "../../components/uikit";

type PostProps = {
  post: PostType;
};

const Post: FC<PostProps> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post.slug) {
    return <div>ERRORPAGE</div>;
  }

  return (
    <>
      <Head>
        <title>{post.seo.title}</title>
        <meta name="description" content={post.seo.description} />
      </Head>

      <Button variant="secondary" side="left">
        Vissza
      </Button>
      <PageHeader post={post} />
      <Divider
        my={12}
        borderBottomColor="grey.silver"
        opacity={1}
        borderBottomWidth="2px"
        orientation="horizontal"
      />
      <PageBody content={post.content} />
      <Divider
        my={12}
        borderBottomColor="grey.metal"
        opacity={1}
        borderBottomWidth="2px"
        orientation="horizontal"
      />
      <Button>Elozo</Button>
      <Button>Kovetkezo</Button>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const post = getContentBySlug("posts", slug as string, [
    "slug",
    "content",
    "coverImage",
    "date",
    "excerpt",
    "seo",
    "title",
  ]);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllContents("posts", ["slug"]);

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
