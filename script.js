$(document).ready(function () {
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });
});

let emailLink =
  "https://mail.google.com/mail/u/0/?view=cm&tf=1&su=&to=marialauraindi@outlook.com&body=";
let titleText = "";
let nameText = "";
let messageText = "";

const title = document.querySelector("#contact-form [name=title]");
const name = document.querySelector("#contact-form [name=name]");
const message = document.querySelector("#contact-form [name=message]");

if (title && name && message) {
  title.onchange = (e) => {
    titleText = e.target.value.trim();
    emailLink = `https://mail.google.com/mail/u/0/?view=cm&tf=1&su=${titleText} - ${nameText}&to=marialauraindi@outlook.com&body=${messageText}`;
  };

  name.onchange = (e) => {
    nameText = e.target.value.trim();
    emailLink = `https://mail.google.com/mail/u/0/?view=cm&tf=1&su=${titleText} - ${nameText}&to=marialauraindi@outlook.com&body=${messageText}`;
  };

  message.onchange = (e) => {
    messageText = e.target.value.trim();
    emailLink = `https://mail.google.com/mail/u/0/?view=cm&tf=1&su=${titleText} - ${nameText}&to=marialauraindi@outlook.com&body=${messageText}`;
  };
}

const openEmailLink = () => {
  window.open(emailLink);
};

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('Service Worker registrado com sucesso:', registration);
  }).catch(error => {
    console.log('Erro ao registrar Service Worker:', error);
  });
}

// Enable install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
  console.log('App instalado com sucesso!');
  deferredPrompt = null;
});
