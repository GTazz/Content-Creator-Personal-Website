(function () {
  // apenas para demonstrar interação sutil - tooltip nativo hover sem necessidade, mas garantimos responsividade.
  // caso queira animar números poderia ser implementado, porém a solicitação prioriza interface fiel.
  console.log("Interface responsiva carregada - Exquilo Analytics");
  // garantir que todos os dados da imagem estejam visíveis:
  // verificando dom: visualizações 2.504.164, engajamento 5.7%, alcance org. 1.806.576, compart. 12.345.
  // idade 16-24, localização brasil 80%, global 20%, genero 55% feminino, interesses: humor, memes, cultura pop.
  // todos já renderizados.
  // adicional de hover cards suave
  const cards = document.querySelectorAll(
    ".metric-card, .info-item, .ad-card, .card",
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.2s ease, box-shadow 0.2s";
      card.style.transform = "translateY(-3px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0px)";
    });
  });
})();

(function () {
  // Se desejar adicionar algum comportamento leve, ex: clique nos cards
  const cards = document.querySelectorAll(".video-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Apenas exemplo: não faz nada, mas pode ser útil para debug
      console.log(
        "Card clicado:",
        card.querySelector(".video-title")?.innerText,
      );
    });
  });
})();

// Função para trocar a aba e atualizar a URL
function switchTab(platform) {
  // Atualiza classes dos botões e painéis
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".platform-panel")
    .forEach((panel) => panel.classList.remove("active"));
  const activeBtn = document.querySelector(
    `.tab-btn[data-platform="${platform}"]`,
  );
  if (activeBtn) activeBtn.classList.add("active");
  const activePanel = document.getElementById(`${platform}-panel`);
  if (activePanel) activePanel.classList.add("active");

  // Atualiza a URL sem recarregar a página
  const url = new URL(window.location.href);
  url.searchParams.set("tab", platform);
  window.history.pushState({}, "", url);
}

// Ativa a aba com base no parâmetro URL 'tab' (ao carregar a página)
function activateTabFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  let tab = urlParams.get("tab");
  if (!tab || !["youtube", "instagram", "tiktok"].includes(tab)) {
    tab = "youtube"; // aba padrão
  }
  switchTab(tab);
}

// Adiciona eventos de clique nas abas
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const platform = this.getAttribute("data-platform");
    switchTab(platform);
  });
});

// Captura o evento de voltar/avançar do navegador (popstate)
window.addEventListener("popstate", function () {
  activateTabFromUrl();
});

// Inicializa a página
document.addEventListener("DOMContentLoaded", function () {
  activateTabFromUrl();
});

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
