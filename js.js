/**
 * Satik 2022
 * 
 * input  Validation
 *
 * * */
function signUpOpenClose() {
  document.getElementById("signUp").classList.add("d-none");
}
document.getElementById("popup").addEventListener("click", function () {
  document.getElementById("signUp").classList.remove("d-none");
});
document.getElementById("clos").addEventListener("click", signUpOpenClose);
signUpOpenClose();
//
class SignupValidation {
  errors = [];
  validCount = 0;
  userNameError = false;

  checkName(nam) {
    return nam;
  }
  checkSurname(surname) {
    return surname;
  }
  checkUsername(username) {
    let arr = username.match(/[a-z]/g);
    let p = document.createElement("p");
    let pArr = document.querySelectorAll(".user p");
    p.innerHTML = "Username must contain lowercase English letters";
    if (!arr) {
      for (let elem of pArr) {
        document.getElementById("rowUser").removeChild(elem);
      }
      document.getElementById("rowUser").append(p);
      this.userNameError = false;
    } else if (arr.length !== username.length) {
      for (let elem of pArr) {
        document.getElementById("rowUser").removeChild(elem);
      }
      document.getElementById("rowUser").append(p);
      this.userNameError = false;
    } else {
      for (let elem of pArr) {
        document.getElementById("rowUser").removeChild(elem);
      }
      this.userNameError = true;
    }
  }

  checkPassword(password, surname, name) {
    let passwordLength = password.length;
    if (passwordLength >= 8 && passwordLength <= 16) {
      this.validCount++;
    } else {
      this.errors.push(
        "Password must contain more than 8 characters and less than 16 characters"
      );
    }
    if (password.match(/[0-9]/g)) {
      this.validCount++;
    } else {
      this.errors.push("The password must contain a number");
    }
    if (password.match(/[A-ZԱ-ՖА-Я]/g)) {
      this.validCount++;
    } else {
      this.errors.push("The password must contain a capital letter");
    }
    if (password.match(/[a-zա-ֆа-я]/g)) {
      this.validCount++;
    } else {
      this.errors.push("Password must contain lowercase letters");
    }
    let arr = password.match(/\W/g);
    let goodSymbol = [
      "!",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "_",
      "+",
      "+",
      "-",
      ",",
      ".",
      "?",
      "@",
    ];
    if (arr) {
      let arrFilter = goodSymbol.filter((item, index) => arr.includes(item));

      //console.log(arr.length);
      //console.log(arrFilter.length);

      if (arr.length > arrFilter.length) {
        this.errors.push(
          "Unauthorized symbol. Can you use: !, #, $, %, ^, &, *, _, +, +, -, . ?, @"
        );
      } else {
        this.validCount++;
      }
    } else {
      this.errors.push(
        "The password must contain the following characters: !, #, $, %, ^, &, *, _, +, +, -, . ?, @"
      );
    }
    if (password.includes(surname) || password.includes(name)) {
      this.errors.push("Password cannot contain first name or last name");
    } else {
      this.validCount++;
    }
    //console.log(password.match(/\n/g));
  }
  valid(n, erors) {
    let arr = document.querySelectorAll(".validation div");
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove("bg");
    }
    for (let i = 0; i < n; i++) {
      arr[i].classList.add("bg");
    }
    for (let eror of erors) {
      let p = document.createElement("p");
      p.innerHTML = eror;
      document.getElementById("rowPass").append(p);
    }
  }
  deleteChild(p) {
    for (let elem of p) {
      document.getElementById("rowPass").removeChild(elem);
      this.errors.pop();
    }
    this.validCount = 0;
    this.errors = [];
  }
  addLocalStorage(a, b) {
    if (a.length === 0 && b) {
      const user = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("gmail").value,
        username: document.getElementById("username").value,
        password: document.getElementById("pas").value,
      };
      localStorage["user"] = JSON.stringify(user);
      setTimeout(function () {
        alert(
          "Your data has been successfully registered.Thank you for your trust"
        );
        signUpOpenClose();
      }, 700);
    }
  }
  main() {
    this.deleteChild(document.querySelectorAll(".pas p"));
    this.checkUsername(document.getElementById("username").value);
    this.checkPassword(
      document.getElementById("pas").value,
      this.checkName(document.getElementById("name").value),
      this.checkSurname(document.getElementById("surname").value)
    );
    this.valid(this.validCount, this.errors);
    this.addLocalStorage(this.errors, this.userNameError);

    return "success";
  }
}

const signup = new SignupValidation();
document.getElementById("sub").addEventListener("click", function () {
  signup.main();
});

class Login {
  main() {
    const email = document.getElementById("loginMail").value;
    const pass = document.getElementById("loginPass").value;
    const user = JSON.parse(localStorage.getItem("user"));
    let pArr = document.querySelectorAll("#error p");
    for (let elem of pArr) {
      document.getElementById("error").removeChild(elem);
    }
    if (user.email === email && user.password === pass) {
      // document.getElementById("log").href = "user.html";
      // window.open("user.html", "_blank");
      document.write(`Hello  ${user.name} ${user.surname} `);
    } else {
      let p = document.createElement("p");
      p.innerHTML = "error";
      document.getElementById("error").append(p);
    }
    return "login";
  }
}
const login = new Login();
document.getElementById("log").addEventListener("click", function () {
  login.main();
});
