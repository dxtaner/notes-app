import { VStack, Heading, Text, Button, chakra, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const backgroundStyle = {
  backgroundSize: "cover",
  background: "linear-gradient(to bottom right, #FFC7D2, #A2FFAB)",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.85)",
  borderRadius: "lg",
  padding: "16px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

function Welcome() {
  const navigate = useNavigate();

  return (
    <Box style={backgroundStyle}>
      <VStack
        spacing={6}
        width={"1200px"}
        borderRadius={10}
        borderBottom={"3px solid gray"}
        borderLeft={"3px solid gray"}
        textAlign="center"
        style={cardStyle}>
        <Heading
          as="h1"
          color={"green.800"}
          fontFamily={"cursive"}
          fontWeight={800}>
          Hoş Geldiniz Çevrimiçi Notlar Dünyasına
        </Heading>

        <Text fontWeight={800} color={"gray.600"}>
          <chakra.span>Merhaba!</chakra.span> Çevrimiçi notlarınızı oluşturmak
          için buradasınız. Burada, kişisel notlarınızı düzenlemek, paylaşmak ve
          herhangi bir cihazdan erişmek için harika bir araç bulacaksınız.
          Notlarınıza başlamak için lütfen hesabınıza giriş yapın.
        </Text>

        <Text fontWeight={800} color={"gray.600"}>
          Hesap oluşturarak, ihtiyacınız olan tüm notları kolayca oluşturabilir
          ve yönetebilirsiniz. Özel notlar, yapılacaklar listeleri, düşünceler
          veya herhangi bir şey - burası notlarınız için. Hadi başlayın ve
          düşüncelerinizi düzenlemeye başlayın.
        </Text>

        <Button
          colorScheme="green"
          border={"2px solid green"}
          size="lg"
          fontWeight="800"
          onClick={() => navigate("/auth/login")}>
          Hemen Başlayın!
        </Button>
      </VStack>
    </Box>
  );
}

export default Welcome;
