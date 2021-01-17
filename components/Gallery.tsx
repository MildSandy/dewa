import Image from "next/image";
import { FC } from "react";
import { Flex, AspectRatio, Heading, Text } from "@chakra-ui/react";

import { PostType } from "../types/postTypes";

import { Button } from "./uikit";

type GalleryProps = {
  post: PostType;
  onOpen: (slug: string) => void;
};

const Gallery: FC<GalleryProps> = ({
  post: { slug, coverImage, title, date, excerpt },
  onOpen,
}) => {
  return (
    <Flex
      direction="column"
      as="article"
      align="flex-start"
      key={slug}
      background="#fff"
      borderRadius="xl"
    >
      <AspectRatio
        ratio={16 / 9}
        position="relative"
        overflow="hidden"
        d="flex"
        w="100%"
        mb={3}
        borderRadius="lg"
      >
        <Image
          src={coverImage}
          alt={`image of ${title}`}
          layout="fill"
          objectFit="cover"
        />
      </AspectRatio>
      <Flex
        direction="column"
        justify="space-between"
        minH={[null, 12, 16, 36]}
        w="100%"
        px={3}
        pb={6}
      >
        <Heading
          variant="articleTitle"
          mb={[3, null, null, null]}
          noOfLines={2}
        >
          {title}
        </Heading>
        <Button
          onClick={() => onOpen(slug)}
          variant="secondary"
          p={0}
          fontSize={["12px", "12px", "14px", "16px"]}
          side="right"
        >
          Megnyitás
        </Button>
      </Flex>
    </Flex>
  );
};

export default Gallery;
