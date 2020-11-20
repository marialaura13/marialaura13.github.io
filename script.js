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

$(".step").click(function () {
  $(this).addClass("active").prevAll().addClass("active");
  $(this).nextAll().removeClass("active");
});

$(".step01").click(function () {
  $("#line-progress").css("width", "3%");
  $(".discovery").addClass("active").siblings().removeClass("active");
});

$(".step02").click(function () {
  $("#line-progress").css("width", "50%");
  $(".strategy").addClass("active").siblings().removeClass("active");
});

$(".step03").click(function () {
  $("#line-progress").css("width", "100%");
  $(".creative").addClass("active").siblings().removeClass("active");
});

let emailLink =
  "https://mail.google.com/mail/u/0/?view=cm&tf=1&su=&to=marialauraindi@outlook.com&body=";
let titleText = "";
let nameText = "";
let messageText = "";

const title = document.querySelector("#contact [name=title]");
const name = document.querySelector("#contact [name=name]");
const message = document.querySelector("#contact [name=message]");

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

const openEmailLink = () => {
  window.open(emailLink);
};
