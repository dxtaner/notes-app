import {
  Stack,
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import InputError from "../auth/inputError.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { createNote, updateNote } from "../../services/privateApiServices.js";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts.jsx";

const notesSchema = Yup.object().shape({
  title: Yup.string().required("Başlık gereklidir"),
});

function NotesForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const createNoteForm = (values) => {
    createNote(values)
      .then((res) => {
        if (res && res.message) {
          showSuccessAlert("Not başarıyla oluşturuldu");
          navigate("/");
        } else {
          showErrorAlert("Not oluşturulurken bir hata oluştu");
        }
      })
      .catch((error) => {
        showErrorAlert(
          error.response?.data?.message || "Beklenmeyen bir hata oluştu"
        );
      });
  };

  const updateNoteForm = (id, values) => {
    updateNote(id, values)
      .then((res) => {
        if (res && res.message) {
          showSuccessAlert("Not başarıyla güncellendi");
          navigate("/");
        } else {
          showErrorAlert("Not güncellenirken bir hata oluştu");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleNewNote = (values, { setSubmitting }) => {
    if (location.state) {
      updateNoteForm(location.state._id, values);
    } else {
      createNoteForm(values);
    }
    setSubmitting(false);
  };

  return (
    <Stack
      justify="center"
      align="center"
      height={750}
      bgGradient="linear(to-br, green.100, red.100)">
      <Formik
        initialValues={{
          title: location.state?.title || "",
          note: location.state?.note || "",
        }}
        validationSchema={notesSchema}
        onSubmit={handleNewNote}>
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
            width={[500, 520, 680]}
            borderBottom={"3px solid green"}
            boxShadow="lg"
            borderRadius="xl">
            <Box
              width="full"
              padding={8}
              backgroundColor="green.800"
              clipPath="polygon(0 0, 100% 0, 100% 100%, 0 80%)"
              color="white"
              fontWeight={800}
              textAlign="center">
              <Heading as="h1" size="lg">
                ONLINE NOTES
              </Heading>
              <Heading as="h3" size="sm" fontWeight={600} m={2}>
                {location.state ? "Güncelle" : "Yeni not"}
              </Heading>
            </Box>

            <VStack width="full" padding={[2, 4, 6, 8]} spacing={4}>
              <FormControl>
                <FormLabel fontWeight={"800"}>Başlık</FormLabel>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  name="title"
                  type="text"
                  fontWeight={"700"}
                  placeholder="Not başlığını girin"
                />
                {errors.title && touched.title && (
                  <InputError fontWeight={"800"}>{errors.title}</InputError>
                )}
              </FormControl>

              <FormControl>
                <FormLabel fontWeight={"800"}>Not Açıklaması</FormLabel>
                <Textarea
                  fontWeight={"500"}
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Bir not girin"
                />
                {errors.note && touched.note && (
                  <InputError fontWeight={"800"}>{errors.note}</InputError>
                )}
              </FormControl>

              {/* FOOTER */}
              <Button
                type="submit"
                colorScheme="green"
                fontWeight={"800"}
                border={"2px solid green"}
                disabled={isSubmitting}
                onClick={handleSubmit}>
                {location.state ? "Notu Güncelle" : "Not Oluştur"}
              </Button>
              <Button
                colorScheme="red"
                fontWeight={"800"}
                border={"2px solid red"}
                onClick={() => navigate("/")}>
                Geri Dön
              </Button>
            </VStack>
          </VStack>
        )}
      </Formik>
    </Stack>
  );
}

export default NotesForm;
