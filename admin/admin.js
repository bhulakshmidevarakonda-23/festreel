import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {

  apiKey: "AIzaSyCtHcxkGsxw4mW8Yr78Hahm-M1rByn8AJU",

  authDomain:
    "festreel-3bb5d.firebaseapp.com",

  projectId:
    "festreel-3bb5d",

  storageBucket:
    "festreel-3bb5d.firebasestorage.app",

  messagingSenderId:
    "276572462956",

  appId:
    "1:276572462956:web:b713cfeffd5b49",

  measurementId:
    "G-99FGPC4NKE"
};


// Cloudinary

const CLOUD_NAME = "dni0yt3z";

const UPLOAD_PRESET = "festreel_upload";


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


// Elements

const loginPanel =
  document.getElementById("loginPanel");

const adminPanel =
  document.getElementById("adminPanel");

const email =
  document.getElementById("email");

const password =
  document.getElementById("password");

const loginBtn =
  document.getElementById("loginBtn");

const loginStatus =
  document.getElementById("loginStatus");

const adminEmail =
  document.getElementById("adminEmail");

const logoutBtn =
  document.getElementById("logoutBtn");

const contentType =
  document.getElementById("contentType");

const title =
  document.getElementById("title");

const filesInput =
  document.getElementById("files");

const fileCount =
  document.getElementById("fileCount");

const uploadBtn =
  document.getElementById("uploadBtn");

const progress =
  document.getElementById("progress");

const results =
  document.getElementById("results");


// Login

loginBtn.addEventListener(
  "click",
  async () => {

    loginStatus.textContent =
      "Signing in...";

    try {

      await signInWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value
      );

      loginStatus.textContent = "";

    } catch (error) {

      loginStatus.textContent =
        "Login failed: " +
        error.message;

    }

  }
);


// Logout

logoutBtn.addEventListener(
  "click",
  () => {

    signOut(auth);

  }
);


// Auth state

onAuthStateChanged(
  auth,
  (user) => {

    if (user) {

      loginPanel.hidden = true;

      adminPanel.hidden = false;

      adminEmail.textContent =
        user.email;

    } else {

      loginPanel.hidden = false;

      adminPanel.hidden = true;

    }

  }
);


// File selection

filesInput.addEventListener(
  "change",
  () => {

    const count =
      filesInput.files.length;

    fileCount.textContent =
      count === 0
        ? "No files selected."
        : `${count} file(s) selected.`;

  }
);


// Cloudinary upload

async function uploadToCloudinary(file) {

  const endpoint =
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  formData.append(
    "upload_preset",
    UPLOAD_PRESET
  );


  const response =
    await fetch(
      endpoint,
      {
        method: "POST",
        body: formData
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.error?.message ||
      "Cloudinary upload failed"
    );

  }


  return data;

}


// Upload button

uploadBtn.addEventListener(
  "click",
  async () => {

    const files =
      [...filesInput.files];


    if (!files.length) {

      progress.textContent =
        "Please select files first.";

      return;

    }


    uploadBtn.disabled = true;

    results.innerHTML = "";

    let completed = 0;

    let failed = 0;


    for (
      const file of files
    ) {

      try {

        progress.textContent =
          `Uploading ${completed + failed + 1} of ${files.length}...`;


        const data =
          await uploadToCloudinary(
            file
          );


        await addDoc(
          collection(
            db,
            "content"
          ),
          {

            type:
              contentType.value,

            title:
              title.value.trim() ||
              file.name,

            url:
              data.secure_url,

            publicId:
              data.public_id || "",

            resourceType:
              data.resource_type || "",

            active:
              true,

            createdAt:
              serverTimestamp()

          }
        );


        completed++;


        results.insertAdjacentHTML(
          "beforeend",
          `<div>✅ ${file.name}</div>`
        );


      } catch (error) {

        failed++;


        results.insertAdjacentHTML(
          "beforeend",
          `<div>❌ ${file.name}</div>`
        );

        console.error(error);

      }

    }


    progress.textContent =
      `Finished: ${completed} uploaded, ${failed} failed.`;

    uploadBtn.disabled = false;

    filesInput.value = "";

    fileCount.textContent =
      "No files selected.";

  }
);
