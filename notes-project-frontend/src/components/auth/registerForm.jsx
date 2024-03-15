import {
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Text,
  Link,
  Heading,
} from "@chakra-ui/react";
import { Link as ReachLink, useNavigate, Navigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import InputError from "./inputError.jsx";
import { registerUser } from "../../services/publicApiServices.js";
import Spinner from "../spinner.jsx";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts.jsx";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Ad alanı zorunludur"),
  email: Yup.string().email("Geçersiz e-posta").required("E-posta zorunludur"),
  password: Yup.string()
    .min(8, "Şifre 8 karakterden uzun olmalıdır")
    .required("Şifre zorunludur"),
});

function RegisterForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("online-notes");

  const handleRegister = (values, { setSubmitting, resetForm }) => {
    registerUser(values)
      .then((res) => {
        if (res) {
          resetForm();
          navigate("/auth/login", { replace: true });
          showSuccessAlert(
            "Kullanıcı kaydedildi, hesabınıza giriş yapabilirsiniz."
          );
        }
        setSubmitting(false);
      })
      .catch((error) => showErrorAlert(error));
  };

  // Eğer oturum açıksa, kaydı reddedin
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Stack
      height="100vh"
      bgGradient="linear(to-br, green.100, red.100)"
      justify="center"
      align="center">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          values,
          errors,
          isSubmitting,
        }) => (
          <VStack
            width={["full", "550px", "700px"]}
            boxShadow="lg"
            borderBottom={"3px solid green"}
            borderRadius="md">
            {/* HEADER */}
            <Box
              width="full"
              padding={8}
              backgroundColor="green.800"
              clipPath="polygon(0 0, 100% 0, 100% 100%, 0 80%)"
              color="white"
              textAlign="center">
              <Heading as="h1" fontWeight={"800"} m={2} size="lg">
                Çevrimiçi Notlar
              </Heading>
              <Heading as="h3" fontWeight={"800"} m={2} size="md">
                Kayıt Ol Ekranı
              </Heading>
            </Box>

            {/* MAIN */}
            <VStack width="full" padding={[2, 4, 6, 8]} spacing={4}>
              <FormControl isRequired>
                <FormLabel fontWeight={"800"}>Ad</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  name="name"
                  type="text"
                  fontWeight={"800"}
                  placeholder="Adınızı girin"
                />
                {errors.name && touched.name && (
                  <InputError>{errors.name}</InputError>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight={"800"}>E-posta</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  name="email"
                  type="email"
                  fontWeight={"800"}
                  placeholder="E-posta adresinizi girin"
                />
                {errors.email && touched.email && (
                  <InputError>{errors.email}</InputError>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight={"800"}>Şifre</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  type="password"
                  fontWeight={"800"}
                  placeholder="Şifrenizi girin"
                />
                {errors.password && touched.password && (
                  <InputError>{errors.password}</InputError>
                )}
              </FormControl>

              {/* FOOTER */}
              <Button
                onClick={handleSubmit}
                colorScheme="green"
                border={"2px solid green"}
                fontWeight={"800"}
                disabled={isSubmitting}>
                Hesap Oluştur
              </Button>
              {isSubmitting && <Spinner size={35} />}
              <Text fontWeight={"500"}>
                Zaten bir hesabınız mı var?{" "}
                <Link
                  color="green.800"
                  fontWeight={"800"}
                  as={ReachLink}
                  to="/auth/login">
                  Giriş yapın
                </Link>
              </Text>
            </VStack>
          </VStack>
        )}
      </Formik>
    </Stack>
  );
}

export default RegisterForm;
