window.onload = function () {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const email2 = document.getElementById("email2");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
  });

  function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const email2Value = email2.value.trim();

    // username required, between 6 and 16 chars, only letters and numbers
    if (usernameValue === "") {
      setErrorFor(username, "To pole musi być wypełnione.");
    } else if (usernameValue.length < 6) {
      setErrorFor(username, "Długość nazwy użytkownika minimum 6 znaków.");
    } else if (usernameValue.length > 16) {
      setErrorFor(username, "Długość nazwy użytkownika maksimum 16 znaków.");
    } else if (!/^[A-Za-z0-9]*$/.test(usernameValue)) {
      setErrorFor(
        username,
        "Nazwa użytkownika może składać się tylko z liter i cyfr."
      );
    } else {
      setSuccessFor(username);
    }

    if (emailValue === "") {
      setErrorFor(email, "To pole musi być wypełnione.");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Wprowadź prawdziwy adres e-mail.");
    } else {
      setSuccessFor(email);
    }

    if (passwordValue === "") {
      setErrorFor(password, "To pole musi być wypełnione.");
    } else if (passwordValue.length < 6) {
      setErrorFor(password, "Długość hasła minimum 6 znaków.");
    } else {
      setSuccessFor(password);
    }

    if (email2Value === "") {
      setErrorFor(email2, "To pole musi być wypełnione.");
    } else if (emailValue !== email2Value) {
      setErrorFor(email2, "Adresy e-mail się różnią");
    } else {
      setSuccessFor(email2);
    }
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }
};
