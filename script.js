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

  // Close menu when clicking on a link (iOS)
  $(".navbar .menu li a").click(function () {
    $(".navbar .menu").removeClass("active");
    $(".menu-btn i").removeClass("active");
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

// PWA Service Worker Registration with iOS fallback
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('Service Worker registrado com sucesso:', registration);
  }).catch(error => {
    console.log('Erro ao registrar Service Worker:', error);
  });
}

// iOS specific optimizations
document.addEventListener('DOMContentLoaded', function() {
  // Prevent double tap zoom on iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Fix viewport on iOS for notched devices
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    // Ensure viewport is properly set
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no');
  }

  // iOS 15+ status bar color fix
  if (navigator.userAgent.match(/iPhone|iPad|iPod/)) {
    document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
    document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
    document.documentElement.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left)');
    document.documentElement.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right)');
  }
});

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
