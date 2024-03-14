import { Center, Text } from "@chakra-ui/react";

function NotFound() {
  return (
    <Center minH="calc(100vh - 70px)">
      <Text fontSize="2xl" fontWeight="bold">
        404 - Sayfa Bulunamadı
      </Text>
    </Center>
  );
}

export default NotFound;
