const form = document.getElementById("emailToForm");

form.addEventListener('submit', getInputData)

async function getInputData (e) {
  e.preventDefault();

  animateSendButton(true)

  const parsedBody = await setBody();

  const options = {
    method: "POST",
    body: parsedBody
  }

  await sendMail(options)
}

function animateSendButton (activate) {
  const button = document.getElementById("sendButton");

  if (activate === true) {
    document.querySelector(".spinner").classList.remove("hidden");
    button.classList.add("disabled");
    document.querySelector("#message").classList.add("hidden");
  } else {
    document.querySelector(".spinner").classList.add("hidden");
    button.classList.remove("disabled");
    document.querySelector("#message").classList.remove("hidden");
  }
}

async function sendMail (options) {
  fetch('http://localhost:3000/mail/', options)
    .then(response => response.json())
    .then(response => {
      animateSendButton(false)
      if (response.message) {
        correctToast();
      } else if (response.error) {
        console.log(response.error);
        incorrectToast();
      }
      else {
        incorrectToast();
      }
    })
    .catch(error => {
      incorrectToast();
      console.error(error)
    })
}

async function setBody () {
  const formData = new FormData();

  const email = document.querySelector("#email").value;
  const sender = document.querySelector("#sender").value;
  const password = document.querySelector("#password").value;
  const subject = document.querySelector("#subject").value;
  const text = document.querySelector("#text").value;
  const receiver = document.querySelector("#receiver").value;
  const type = document.querySelector("#type").value;
  const myFileInput = document.querySelector("#myFile");
  const myFile = myFileInput?.files[0]; // Obtener el archivo seleccionado

  formData.append('email', email);
  formData.append('sender', sender);
  formData.append('password', password);
  formData.append('subject', subject);
  formData.append('text', text);
  formData.append('receiver', receiver);
  formData.append('type', type);

  if (myFile) {
    formData.append('myFile', myFile); // Agregar el archivo al FormData
  }

  return formData;
}

async function correctToast () {
  Toastify({
    text: "Email enviado!",
    duration: 1500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#198754",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}

async function incorrectToast () {
  Toastify({
    text: "Error al enviar!",
    duration: 1500,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "#2c0b0e",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}