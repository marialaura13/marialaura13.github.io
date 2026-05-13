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
