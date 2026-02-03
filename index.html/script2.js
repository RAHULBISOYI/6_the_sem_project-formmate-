const dropArea = document.getElementById("dropArea");
const browseBtn = document.getElementById("browseBtn");
const fileInput = document.getElementById("fileInput");

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    alert("Selected: " + fileInput.files[0].name);
  }
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    alert("Uploaded: " + files[0].name);
  }
});
