/* ============================================
   SCRIPT PARA GERENCIAR AS ABAS DA TELA MÉTRICAS
   ============================================ */
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
