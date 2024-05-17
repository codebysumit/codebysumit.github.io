/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/

const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
  document.body.classList.add("disable-scroll");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
      document.body.classList.remove("disable-scroll");
    });
  });
});

/*==================== PORTFOLIO SWIPER ====================*/

let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

//validate if user previously chose a theme
if (selectedTheme) {
  // if theme selected by user previously then we add/remove classes again based on localStorage
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );

  // reCaptcha theme change
  setReCaptchaTheme(selectedTheme === "dark" ? "dark" : "light");
}
//if initially there is no local storage ie. user has not made a choice and this is first time loading
//then we check if browser/OS is in dark mode and then add dark theme if required by default
else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  // console.log("found dark mode for browser/OS");
  
  // add dark theme by setting dark theme flags in localStorage
  localStorage.setItem("selected-theme", "dark");
  localStorage.setItem("selected-icon", "uil-moon");
  // add classes for dark theme in DOM
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
  // reCaptcha theme change to dark
  setReCaptchaTheme("dark");
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  setReCaptchaTheme(getCurrentTheme())
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== Contact Forn Validation ====================*/
// Contact Forn Validation Function
function contactFormValidation() {
  const name = document.getElementById('name');
  const nameErrorMassage = document.getElementById('name-error-message');
  const email = document.getElementById('email');
  const emailErrorMassage = document.getElementById('email-error-message');
  const project = document.getElementById('project');
  const projectErrorMassage = document.getElementById('project-error-message');
  const message = document.getElementById('message');
  const messageErrorMassage = document.getElementById('message-error-message');
  const recaptchaErrorMassage = document.getElementById('recaptcha-error-message');

  let isValid = true;
  // Name validation
  name.value = name.value.trim();
  if (name.value === '' || name.value === null) {
    nameErrorMassage.innerHTML = "<i class='uil uil-times-circle'></i> please enter your name.";
    nameErrorMassage.hidden = false;
    isValid = false;
  }
  else if (/\d/.test(name.value)) {
    nameErrorMassage.innerHTML = "<i class='uil uil-times-circle'></i> please enter your name poperly.";
    nameErrorMassage.hidden = false;
    isValid = false;
  }
  else {
    nameErrorMassage.innerHTML = "";
    nameErrorMassage.hidden = true;
  }

  // Email validation
  email.value = email.value.trim();
  if (email.value === '' || email.value === null) {
    emailErrorMassage.innerHTML = "<i class='uil uil-times-circle'></i> please enter your email address.";
    emailErrorMassage.hidden = false;
    isValid = false;
  }
  else if (
    !email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  ) {
      emailErrorMassage.innerHTML = "<i class='uil uil-times-circle'></i> please enter a valid email address.";
      emailErrorMassage.hidden = false;
      isValid = false;
  }
  else {
    emailErrorMassage.innerHTML = "";
    emailErrorMassage.hidden = true;
  }

  // Project validation
  project.value = project.value.trim();
  if (project.value === '' || project.value === null) {
    projectErrorMassage.innerHTML = "<i class='uil uil-times-circle'></i> please enter your project name.";
    projectErrorMassage.hidden = false;
    isValid = false;
  }
  else {
    projectErrorMassage.innerHTML = "";
    projectErrorMassage.hidden = true;
  }

  // Message validation
  message.value = message.value.trim();
  if (message.value === '' || message.value === null) {
    messageErrorMassage.innerHTML = "<i class='uil uil-times-circle'></i> please write your massage.";
    messageErrorMassage.hidden = false;
    isValid = false;
  }
  else {
    messageErrorMassage.innerHTML = "";
    messageErrorMassage.hidden = true;
  }

  // rereCAPTCHA validation
  if (getReCaptchaToken().length === 0) {
    recaptchaErrorMassage.innerHTML = "<i class='uil uil-times-circle'></i> please complite the reCAPTCHA challenge.";
    recaptchaErrorMassage.hidden = false;
    isValid = false;
  }
  else {
    recaptchaErrorMassage.innerHTML = "";
    recaptchaErrorMassage.hidden = true;
  }

  return isValid;
};

// Live Contact Form Validation
// Name Validation
document.getElementById('name').addEventListener('keyup', () => {
  var formName = document.getElementById('name');
  var formNameError = document.getElementById('name-error-message');
  
  if(formName.value.trim().length === 0){
    formNameError.innerHTML = "<i class='uil uil-times-circle'></i> please enter your name.";
    formNameError.hidden = false;
  }
  else if (/\d/.test(formName.value.trim())) {
    formNameError.innerHTML = "<i class='uil uil-times-circle'></i> please enter your name poperly.";
    formNameError.hidden = false;
  }
  else {
    formNameError.hidden = true;
    formNameError.innerHTML = "";
  }
});

// Email validation
document.getElementById('email').addEventListener('keyup', () => {
  var formEmail = document.getElementById('email');
  var formEmailError = document.getElementById('email-error-message');
  
  if(formEmail.value.trim().length === 0){
    formEmailError.innerHTML = "<i class='uil uil-times-circle'></i> please enter your email address.";
    formEmailError.hidden = false;
  }
  else if (
    !formEmail.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  ) {
    formEmailError.innerHTML = "<i class='uil uil-times-circle'></i> please enter a valid email address.";
    formEmailError.hidden = false;
  }
  else {
    formEmailError.hidden = true;
    formEmailError.innerHTML = "";
  }
});

// Project validation
document.getElementById('project').addEventListener('keyup', () => {
  var formProject = document.getElementById('project');
  var formProjectError = document.getElementById('project-error-message');

  if (formProject.value.trim().length === 0) {
    formProjectError.innerHTML = "<i class='uil uil-times-circle'></i> please enter your project name.";
    formProjectError.hidden = false
  }
  else {
    formProjectError.hidden = true
    formProjectError.innerHTML = "";
  }
});

// Message validation
document.getElementById('message').addEventListener('keyup', () => {
  var formMessage = document.getElementById('message');
  var formMessageError = document.getElementById('message-error-message');

  if (formMessage.value.trim().length === 0) {
    formMessageError.innerHTML = "<i class='uil uil-times-circle'></i> please write your massage.";
    formMessageError.hidden = false
  }
  else {
    formMessageError.hidden = true
    formMessageError.innerHTML = "";
  }
});



