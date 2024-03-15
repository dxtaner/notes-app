import {
  Stack,
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as ReachLink, useNavigate, Navigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import InputError from "./inputError.jsx";
import { loginUser } from "../../services/publicApiServices";
import Spinner from "../spinner.jsx";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts.jsx";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Geçersiz e-posta").required("E-posta gereklidir"),
  password: Yup.string().required("Şifre gereklidir"),
});

function LoginForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("online-notes");

  const handleLogin = (values, { setSubmitting, resetForm }) => {
    loginUser(values)
      .then((res) => {
        if (res && res.token) {
          const { token } = res;
          localStorage.setItem("online-notes", token);
          resetForm();

          navigate("/", { replace: true });
          showSuccessAlert("Kullanıcı başarıyla giriş yaptı");
        }
        setSubmitting(false);
      })
      .catch(() => showErrorAlert("Şifre veya Email Hatalı"));
  };

  // Eğer oturum açılmışsa, giriş sayfasına erişimi engelle
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
        enableReinitialize
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
          errors,
          values,
          isSubmitting,
        }) => (
          <VStack
            width={["full", "550px", "700px"]}
            boxShadow="lg"
            borderBottom={"3px solid green"}
            borderRadius="md">
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
              <Heading as="h3" fontWeight={"800"} size="md">
                Giriş Ekranı
              </Heading>
            </Box>

            <VStack width="full" padding={[2, 4, 6, 8]} spacing={4}>
              <FormControl>
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

              <FormControl>
                <FormLabel fontWeight={"800"}>Şifre</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  fontWeight={"800"}
                  name="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                />
                {errors.password && touched.password && (
                  <InputError>{errors.password}</InputError>
                )}
              </FormControl>

              {/* FOOTER */}
              <Button
                type="submit"
                colorScheme="green"
                border={"2px solid green"}
                fontWeight={"800"}
                disabled={isSubmitting}
                onClick={handleSubmit}>
                Giriş Yap
              </Button>
              {isSubmitting && <Spinner size={35} />}
              <Text fontWeight={"500"}>
                Hesabınız yok mu?{" "}
                <Link
                  color="green.800"
                  fontWeight={"800"}
                  as={ReachLink}
                  to="/auth/register">
                  Kaydolun
                </Link>
              </Text>
            </VStack>
          </VStack>
        )}
      </Formik>
    </Stack>
  );
}

export default LoginForm;
