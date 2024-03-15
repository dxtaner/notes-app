import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function NotesItems({ listNotes, handleDelete }) {
  const navigate = useNavigate();

  const deleteNote = (id) => {
    handleDelete(id);
  };

  if (listNotes.length > 0) {
    return (
      <VStack width="full" spacing={4} py={2} align="start">
        {listNotes.map((item) => (
          <Box
            key={item._id}
            width="full"
            p={3}
            borderLeft={"3px solid green"}
            borderBottom={"3px solid green"}
            m={3}
            padding={4}
            borderRadius={4}
            boxShadow="lg"
            backgroundColor="white">
            <Heading p={3} m={2} size="md" fontWeight={800} color={"green.900"}>
              {item.title}
            </Heading>
            <Text p={3} m={1} fontWeight={400} color={"gray.800"}>
              {item.note}
            </Text>
            <HStack pt={2} justify="space-between" align="center">
              <Text fontWeight="800" fontSize="xs" color={"gray.700"}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
              <HStack spacing={2}>
                <IconButton
                  onClick={() => navigate("/create", { state: item })}
                  aria-label="Düzenle"
                  colorScheme="yellow"
                  icon={<FaEdit />}
                />
                <IconButton
                  onClick={() => deleteNote(item._id)}
                  aria-label="Sil"
                  colorScheme="red"
                  icon={<MdDelete />}
                />
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    );
  } else {
    return (
      <VStack justify="center" align="center">
        <Text color="gray.500" m={5} fontWeight={800}>
          Henüz notunuz yok
        </Text>
      </VStack>
    );
  }
}

export default NotesItems;
