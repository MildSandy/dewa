import React, { FC } from "react";
import Image from "next/image";
import { Text, Heading, Flex, Box } from "@chakra-ui/react";

import { PostType } from "../types";

type PageHeaderProps = {
  post: PostType;
};

const PageHeader: FC<PageHeaderProps> = ({
  post: { coverImage, date, excerpt, title },
}) => {
  return (
    <Flex
      direction={["column", "row", "row", "row"]}
      align="center"
      justify="space-between"
    >
      <Flex
        direction="column"
        align="flex-start"
        justify={[null, "center", "center", "center"]}
        maxW={[null, "40%", "40%", "40%"]}
      >
        <Heading variant="title" mb={[3, null, null, null]}>
          {title}
        </Heading>
        <Text
          fontSize={[null, null, null, 24]}
          mb={[3, null, null, null]}
          color="grey.iron"
        >
          {excerpt}
        </Text>
        <Text variant="meta" mb={[3, null, null, null]}>
          {date}
        </Text>
      </Flex>
      <Box
        position="relative"
        overflow="hidden"
        h={["auto", "250px", "350px", "450px"]}
        pt={["100%", "initial", "initial", "initial"]}
        w={["100%", "250px", "350px", "450px"]}
        borderRadius="lg"
        mb={6}
        ml={[0, 16, 24, 32]}
      >
        <Image
          src={coverImage}
          alt={`image of ${title}`}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Flex>
  );
};

export default PageHeader;
