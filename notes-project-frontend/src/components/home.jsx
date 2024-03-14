import { Box, Container, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Notes from "../components/notes/index.jsx";

function Home() {
  const token = localStorage.getItem("online-notes");

  if (!token) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <Container
      maxW="container.xxl"
      bgGradient="linear(to-br, green.100, red.100)"
      boxShadow="2xl"
      p={6}
      rounded="lg">
      <Box
        maxW="container.xxl"
        maxH={"container.xxl"}
        mx="auto"
        mt={5}
        textAlign="center">
        <Text fontSize="4xl" color="green.800" fontWeight="900" mb={4}>
          Notlarınıza Hoş Geldiniz{" "}
        </Text>
        <Notes />
      </Box>
    </Container>
  );
}

export default Home;
