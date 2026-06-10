// ================== VARIÁVEIS DE CONTROLE ==================
let originalValues = new Map(); // armazena os valores originais de cada campo
let isDirty = false;
let allInputsValid = true;

// ================== FUNÇÕES AUXILIARES DE VALIDAÇÃO ==================
// Converte string com vírgula decimal para número
function parseDecimal(val) {
  if (typeof val !== "string") val = String(val);
  val = val.trim().replace(",", ".");
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
}

function parseInteger(val) {
  const num = parseDecimal(val);
  return num !== null && Number.isInteger(num) ? num : null;
}

function validateIntegerInput(input) {
  const val = input.value.trim();
  if (val === "") return false;
  return parseInteger(val) !== null;
}

function validateDecimalInput(input) {
  const val = input.value.trim();
  if (val === "") return false;
  return parseDecimal(val) !== null;
}

// Valida todos os campos e atualiza classe 'invalid' e flag allInputsValid
function validateAllInputs() {
  let allValid = true;
  document
    .querySelectorAll(".numeric-input, .decimal-input, .integer-input")
    .forEach((input) => {
      let isValid = false;
      if (
        input.classList.contains("numeric-input") ||
        input.classList.contains("integer-input")
      ) {
        isValid = validateIntegerInput(input);
      } else if (input.classList.contains("decimal-input")) {
        isValid = validateDecimalInput(input);
      }
      // Campo vazio também é inválido (todos são obrigatórios)
      if (!isValid || input.value.trim() === "") {
        input.classList.add("invalid");
        allValid = false;
      } else {
        input.classList.remove("invalid");
      }
    });
  allInputsValid = allValid;
  updateSaveButtonState();
}

// ================== CONTROLE DE FORMULÁRIO SUJO (DIRTY) ==================
function trackOriginalValues() {
  document
    .querySelectorAll(
      "#metricsForm input, #metricsForm textarea, #metricsForm select",
    )
    .forEach((el) => {
      if (el.id) originalValues.set(el.id, el.value);
    });
}

function checkIfDirty() {
  let changed = false;
  for (let [id, originalVal] of originalValues.entries()) {
    const el = document.getElementById(id);
    if (el && el.value !== originalVal) {
      changed = true;
      break;
    }
  }
  isDirty = changed;
  updateSaveButtonState();
}

function updateSaveButtonState() {
  const saveBtn = document.getElementById("saveMetricsBtn");
  const canSave = isDirty && allInputsValid;
  saveBtn.disabled = !canSave;
}

// ================== NOTIFICAÇÃO TOAST ==================
function showToast(message, type = "success") {
  const toast = document.getElementById("toastNotify");
  const icon = toast.querySelector("i");
  const msgSpan = document.getElementById("toastMsg");
  msgSpan.innerText = message;
  icon.className =
    "fas " + (type === "success" ? "fa-check-circle" : "fa-exclamation-circle");
  toast.classList.add("show");
  toast.classList.remove("success", "error");
  toast.classList.add(type);
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// ================== ENVIO DO FORMULÁRIO ==================
async function saveAllMetrics() {
  if (!isDirty) {
    showToast("Nenhuma alteração detectada.", "error");
    return;
  }
  if (!allInputsValid) {
    showToast("Existem campos inválidos. Corrija antes de salvar.", "error");
    return;
  }

  // Coleta os valores convertendo para número (usando parseDecimal)
  const payload = {
    metricas_gerais: {
      seguidores:
        parseInteger(document.getElementById("geral_seguidores")?.value) || 0,
      visualizacoes_mensais:
        parseInteger(
          document.getElementById("geral_visualizacoes_mensais")?.value,
        ) || 0,
      taxa_engajamento:
        parseDecimal(
          document.getElementById("geral_taxa_engajamento")?.value,
        ) || 0,
      alcance:
        parseInteger(document.getElementById("geral_alcance")?.value) || 0,
      compartilhamento:
        parseInteger(
          document.getElementById("geral_compartilhamento")?.value,
        ) || 0,
      min_idade_publico:
        parseInteger(
          document.getElementById("geral_min_idade_publico")?.value,
        ) || 0,
      max_idade_publico:
        parseInteger(
          document.getElementById("geral_max_idade_publico")?.value,
        ) || 0,
      taxa_publico_brasil:
        parseDecimal(
          document.getElementById("geral_taxa_publico_brasil")?.value,
        ) || 0,
      taxa_publico_masculino:
        parseDecimal(
          document.getElementById("geral_taxa_publico_masculino")?.value,
        ) || 0,
      interesses_publico:
        document.getElementById("geral_interesses_publico")?.value || "",
    },
    redes_sociais: {
      youtube: {},
      instagram: {},
      tiktok: {},
    },
  };

  const redes = ["youtube", "instagram", "tiktok"];
  const camposRede = [
    "seguidores",
    "taxa_engajamento",
    "alcance",
    "visualizacoes",
    "likes",
    "comentarios",
    "compartilhamentos",
    "min_idade_publico",
    "max_idade_publico",
    "taxa_publico_brasil",
    "taxa_publico_masculino",
    "interesses_publico",
    "tipo_conteudo",
    "frequencia_postagem",
    "melhor_performance",
  ];

  for (let rede of redes) {
    for (let campo of camposRede) {
      const el = document.getElementById(`${rede}_${campo}`);
      if (el) {
        let val = el.value;
        if (
          campo.includes("taxa_engajamento") ||
          campo.includes("taxa_publico_brasil") ||
          campo.includes("taxa_publico_masculino")
        ) {
          val = parseDecimal(val) || 0;
        } else if (
          campo === "interesses_publico" ||
          campo === "tipo_conteudo" ||
          campo === "frequencia_postagem" ||
          campo === "melhor_performance"
        ) {
          // mantém string
        } else {
          val = parseInteger(val) || 0;
        }
        payload.redes_sociais[rede][campo] = val;
      }
    }
  }

  // Desabilita o botão durante o envio
  const saveBtn = document.getElementById("saveMetricsBtn");
  saveBtn.disabled = true;
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Salvando...';

  try {
    const response = await fetch("/admin/metricas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const result = await response.json();
      showToast(result.message || "Métricas salvas com sucesso!", "success");
      // Após salvar, atualiza os valores originais e reseta dirty state
      originalValues.clear();
      trackOriginalValues();
      isDirty = false;
      updateSaveButtonState();
    } else {
      const err = await response.json();
      showToast(err.error || "Erro ao salvar métricas", "error");
    }
  } catch (error) {
    console.error(error);
    showToast("Erro de conexão com o servidor", "error");
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Salvar todas as métricas';
    updateSaveButtonState();
  }
}

// ================== FUNÇÕES JSON (import/export) ==================
function generateHierarchicalExampleJson() {
  const geralKeys = [
    "seguidores",
    "visualizacoes_mensais",
    "taxa_engajamento",
    "alcance",
    "compartilhamento",
    "min_idade_publico",
    "max_idade_publico",
    "taxa_publico_brasil",
    "taxa_publico_masculino",
    "interesses_publico",
  ];
  const redesKeys = [
    "seguidores",
    "taxa_engajamento",
    "alcance",
    "visualizacoes",
    "likes",
    "comentarios",
    "compartilhamentos",
    "min_idade_publico",
    "max_idade_publico",
    "taxa_publico_brasil",
    "taxa_publico_masculino",
    "interesses_publico",
    "tipo_conteudo",
    "frequencia_postagem",
    "melhor_performance",
  ];
  const example = {
    metricas_gerais: {},
    redes_sociais: {
      youtube: {},
      instagram: {},
      tiktok: {},
    },
  };
  for (let key of geralKeys) example.metricas_gerais[key] = null;
  for (let rede of ["youtube", "instagram", "tiktok"]) {
    for (let key of redesKeys) example.redes_sociais[rede][key] = null;
  }
  return example;
}

function populateFormFromHierarchicalJson(jsonData) {
  // Salva uma cópia dos valores atuais (originais do banco) para comparação
  const oldValues = new Map();
  for (let [id, val] of originalValues.entries()) {
    oldValues.set(id, val);
  }

  // Aplica os novos valores do JSON
  if (jsonData.metricas_gerais) {
    for (const [key, value] of Object.entries(jsonData.metricas_gerais)) {
      if (value !== null && value !== undefined) {
        const element = document.getElementById(`geral_${key}`);
        if (element) element.value = value;
      }
    }
  }
  if (jsonData.redes_sociais) {
    const redeMap = {
      youtube: "youtube",
      instagram: "instagram",
      tiktok: "tiktok",
    };
    for (const [rede, metrics] of Object.entries(jsonData.redes_sociais)) {
      const redeId = redeMap[rede];
      if (!redeId) continue;
      for (const [key, value] of Object.entries(metrics)) {
        if (value !== null && value !== undefined) {
          const element = document.getElementById(`${redeId}_${key}`);
          if (element) element.value = value;
        }
      }
    }
  }

  // Verifica se os novos valores diferem dos antigos
  let changed = false;
  for (let [id, oldVal] of oldValues.entries()) {
    const el = document.getElementById(id);
    if (el && el.value !== oldVal) {
      changed = true;
      break;
    }
  }

  // Atualiza o mapa de valores originais com os valores atuais (depois da mudança)
  originalValues.clear();
  trackOriginalValues();

  // Se houve mudança, marca como dirty
  isDirty = changed;
  // Revalida todos os campos
  validateAllInputs();
  // Atualiza botão (se dirty e válido, ativa)
  updateSaveButtonState();
}

function loadFromTextarea() {
  const raw = document.getElementById("jsonPasteArea").value.trim();
  if (!raw) return;
  try {
    const json = JSON.parse(raw);
    populateFormFromHierarchicalJson(json);
    const btn = document.getElementById("fillFromJsonBtn");
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Atualizado!';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 1500);
  } catch (err) {
    showToast("JSON inválido: " + err.message, "error");
  }
}

function loadJsonFromFile(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const json = JSON.parse(e.target.result);
      document.getElementById("jsonPasteArea").value = JSON.stringify(
        json,
        null,
        2,
      );
      populateFormFromHierarchicalJson(json);
      const btn = document.getElementById("fillFromJsonBtn");
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Atualizado!';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 1500);
    } catch (err) {
      showToast("Erro ao parsear JSON: " + err.message, "error");
    }
  };
  reader.readAsText(file);
}

function getExampleJsonString() {
  return JSON.stringify(generateHierarchicalExampleJson(), null, 2);
}

async function copyExampleJson() {
  const btn = document.getElementById("copyExampleJsonBtn");
  const originalHTML = btn.innerHTML;
  const jsonStr = getExampleJsonString();
  try {
    await navigator.clipboard.writeText(jsonStr);
    btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 1500);
  } catch (err) {
    showToast("Erro ao copiar", "error");
  }
}

function downloadExampleJson() {
  const jsonStr = getExampleJsonString();
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "exemplo_metricas.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ================== EVENT LISTENERS E INICIALIZAÇÃO ==================
document.addEventListener("DOMContentLoaded", () => {
  // Captura valores originais
  trackOriginalValues();
  // Adiciona eventos de input em todos os campos do formulário
  document
    .querySelectorAll(
      "#metricsForm input, #metricsForm textarea, #metricsForm select",
    )
    .forEach((el) => {
      el.addEventListener("input", () => {
        checkIfDirty();
        validateAllInputs();
      });
      el.addEventListener("blur", () => validateAllInputs());
    });
  // Validação inicial
  validateAllInputs();
  updateSaveButtonState();

  // Botões JSON
  document
    .getElementById("fillFromJsonBtn")
    .addEventListener("click", loadFromTextarea);
  document
    .getElementById("downloadExampleJson")
    .addEventListener("click", (e) => {
      e.preventDefault();
      downloadExampleJson();
    });
  document
    .getElementById("copyExampleJsonBtn")
    .addEventListener("click", copyExampleJson);
  document
    .getElementById("saveMetricsBtn")
    .addEventListener("click", saveAllMetrics);
  document.getElementById("uploadJsonInput").addEventListener("change", (e) => {
    if (e.target.files.length) loadJsonFromFile(e.target.files[0]);
    e.target.value = "";
  });
  document
    .getElementById("pasteJsonBtn")
    .addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        document.getElementById("jsonPasteArea").value = text;
        showToast(
          'Texto colado. Clique em "Preencher formulário" para aplicar.',
          "success",
        );
      } catch (err) {
        showToast("Não foi possível ler a área de transferência.", "error");
      }
    });
  document
    .getElementById("metricsForm")
    .addEventListener("submit", (e) => e.preventDefault());
});
