import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { FC } from "react";

import { Divider, SimpleGrid, Box } from "@chakra-ui/react";

import { Button } from "../../components/uikit";
import PageBody from "../../components/PageBody";
import PageHeader from "../../components/PageHeader";
import { getAllContents, getContentBySlug } from "../../util";

import { PostType } from "../../types/postTypes";
import Carousel from "../../components/Carousel";

type PostProps = {
  reference: PostType;
};

const Reference: FC<PostProps> = ({ reference }) => {
  const { seo, content, slug, gallery } = reference;

  const { isFallback, back: onBack } = useRouter();
  if (!isFallback && !slug) {
    return <div>ERRORPAGE</div>;
  }

  // gallery
  if (!content) {
    return (
      <>
        <Head>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
        </Head>

        <Button
          variant="secondary"
          mb={[8, 8, 12, 16]}
          side="left"
          onClick={onBack}
        >
          Vissza
        </Button>
        <PageHeader post={reference} />
        <Divider
          my={12}
          borderBottomColor="grey.silver"
          opacity={1}
          borderBottomWidth="2px"
          orientation="horizontal"
        />
        <Carousel gallery={gallery} />
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
  }

  // Reference
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <Button
        variant="secondary"
        mb={[8, 8, 12, 16]}
        side="left"
        onClick={onBack}
      >
        Vissza
      </Button>
      <PageHeader post={reference} />
      <Divider
        my={12}
        borderBottomColor="grey.silver"
        opacity={1}
        borderBottomWidth="2px"
        orientation="horizontal"
      />
      <PageBody content={content} />
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
  const reference = getContentBySlug("references", slug as string, [
    "slug",
    "content",
    "coverImage",
    "date",
    "excerpt",
    "gallery",
    "seo",
    "title",
  ]);

  return {
    props: {
      reference,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllContents("references", ["slug"]);

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

export default Reference;
