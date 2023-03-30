import { SkeletonText, Stack } from "@chakra-ui/react";

export const SkeletonTable = () => {
  return (
    <Stack spacing={3}>
      <SkeletonText mt="4" noOfLines={13} spacing="5" skeletonHeight="5" />
    </Stack>
  );
};
