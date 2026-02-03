
  const uploadForm = document.getElementById("uploadForm");
  const browseBtn = document.getElementById("browseBtn");
  const fileInput = document.getElementById("fileInput");
  const dropArea = document.getElementById("dropArea");
  const fileText = document.getElementById("fileText");

  // Open file selector
  browseBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // Show selected file name
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileText.textContent = fileInput.files[0].name;
    }
  });

  // Drag & drop support
  dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropArea.classList.add("active");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
  });

  dropArea.addEventListener("drop", e => {
    e.preventDefault();
    dropArea.classList.remove("active");

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      fileInput.files = e.dataTransfer.files;
      fileText.textContent = file.name;
    } else {
      alert("Only PDF files are allowed");
    }
  });

  // Submit form
  uploadForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(uploadForm);

    const res = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("PDF uploaded successfully");
      uploadForm.reset();
      fileText.textContent = "Drop PDF";
    } else {
      alert(data.error || "Upload failed");
    }
  });

