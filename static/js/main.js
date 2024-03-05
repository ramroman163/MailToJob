const form = document.getElementById("emailToForm");

form.addEventListener("submit", () => { getInputData() })

async function getInputData (e) {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const subject = document.querySelector("#subject").value;
  const text = document.querySelector("#text").value;
  const receiver = document.querySelector("#receiver").value;
  const type = document.querySelector("#type").value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      subject,
      text,
      receiver,
      type
    })
  }

  await sendMail(options)
}

async function sendMail (options) {
  fetch('http://localhost:3000/mail', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error(error))
}