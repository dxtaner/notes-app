import Swal from "sweetalert2";

export const showSuccessAlert = (textTo) => {
  Swal.fire({
    icon: "success",
    title: "Başarılı",
    text: textTo || "Görev tamamlandı",
    showConfirmButton: false, // Kapatma butonunu gizlemek için
    timer: 1500, // Otomatik kapanma süresi (ms cinsinden)
  });
};

export const showErrorAlert = (textTo) => {
  Swal.fire({
    icon: "error",
    title: "Hata",
    text: textTo,
    confirmButtonColor: "#FF0000", // Özel onay düğmesi rengi
  });
};

export const showQuestionAlert = (title, confirmCallback) => {
  Swal.fire({
    icon: "question",
    title: title,
    showCancelButton: true,
    cancelButtonText: "İptal",
    confirmButtonText: "Sil",
    confirmButtonColor: "#D84949",
    allowOutsideClick: () => !Swal.isLoading(), // Dışarıdaki tıklamaları engelle
  }).then((res) => {
    if (res.isConfirmed) {
      confirmCallback();
    }
  });
};
