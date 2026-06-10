/* ============================================
   SCRIPT PARA GERENCIAR O MENU HAMBURGUER E O OVERLAY
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const overlay = document.getElementById("menuOverlay");

  function closeMenu() {
    navMenu.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openMenu() {
    navMenu.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function toggleMenu() {
    if (navMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Fechar menu ao clicar em qualquer link dentro do menu (incluindo o botão interno)
  const menuLinks = document.querySelectorAll(
    ".nav-links a, .btn-contato-mobile",
  );
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Fechar menu ao redimensionar para desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});
