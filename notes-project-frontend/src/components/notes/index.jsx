import { useEffect, useState } from "react";
import NotesItems from "./notesItems.jsx";
import {
  VStack,
  HStack,
  Select,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { getAllNotes, deleteNote } from "../../services/privateApiServices.js";
import { useNavigate } from "react-router-dom";
import { MdOutlineNoteAlt } from "react-icons/md";
import Spinner from "../spinner.jsx";
import {
  showQuestionAlert,
  showSuccessAlert,
  showErrorAlert,
} from "../../utils/alerts.jsx";
import { GiHamburgerMenu } from "react-icons/gi";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderValue, setOrderValue] = useState("");
  const navigate = useNavigate();

  const handleChangeValue = (e) => {
    ordenarArray(e.target.value);
  };

  const ordenarArray = (value) => {
    setOrderValue(value);
    switch (value) {
      case "İsim":
        return notes.sort((a, b) => a.title.localeCompare(b.title));

      case "Tarih":
        return notes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      default:
        return notes;
    }
  };

  const getNotes = () => {
    setLoading(true);
    getAllNotes()
      .then((res) => {
        if (res) {
          setNotes(res.notes);
          setLoading(false);
        } else {
          showErrorAlert("Notları alırken bir hata oluştu!");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    showQuestionAlert("Bu notu silmek istediğinizden emin misiniz?", () => {
      deleteNote(id)
        .then((res) => {
          if (res && res.message) {
            showSuccessAlert("Not başarıyla silindi");
            getNotes();
          } else {
            showErrorAlert("Notu silerken bir hata oluştu");
          }
        })
        .catch((error) => console.error(error));
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("online-notes");
    navigate("/welcome", { replace: true });
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <VStack width="full" minHeight={"580px"} padding={[2, 4, 6, 8]} spacing={4}>
      <HStack width="full" justify="space-between">
        <Heading size="lg" color="green.500">
          SENİN NOTLARIN
        </Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            variant="outline"
            transition="all 0.2s"
            icon={<GiHamburgerMenu />}
          />
          <MenuList>
            <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <HStack width="full" justify="space-between">
        <Button
          colorScheme="green"
          border={"2px solid green"}
          leftIcon={<MdOutlineNoteAlt size={24} />}
          onClick={() => navigate("/create")}>
          Not Oluştur
        </Button>
        <Select
          border={"3px solid green"}
          width="250px"
          value={orderValue}
          onChange={handleChangeValue}
          placeholder="Sırala">
          <option>Ad</option>
          <option>Tarih</option>
        </Select>
      </HStack>
      {loading ? (
        <Spinner size={35} />
      ) : (
        <NotesItems listNotes={notes} handleDelete={handleDelete} />
      )}
    </VStack>
  );
}

export default Notes;
