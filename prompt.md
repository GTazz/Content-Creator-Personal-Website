Você receberá imagens de painéis de métricas de três redes sociais: YouTube, Instagram e TikTok. Cada imagem mostra números e textos como seguidores, visualizações, engajamento, localização, interesses, etc. Sua tarefa é extrair esses dados e preencher o JSON abaixo.

**Regras de extração:**

1. Para cada rede (youtube, instagram, tiktok), extraia os valores diretamente da imagem respectiva.
2. Se algum campo não estiver visível na imagem, deixe `null`.
3. Para campos percentuais (ex: `taxa_engajamento`, `taxa_publico_brasil`, `taxa_publico_masculino`), use o valor numérico (ex: 5.7, não "5,7%").
4. Para números grandes (seguidores, visualizações), ignore pontos ou vírgulas e use apenas dígitos (ex: 1.3M → 1300000).
5. `interesses_publico` deve ser uma string com os interesses separados por vírgula (ex: "Humor, Memes, Cultura Pop").
6. `tipo_conteudo`, `frequencia_postagem`, `melhor_performance` devem ser preenchidos com o texto exato que aparece na imagem.

**Cálculo das métricas gerais (`metricas_gerais`) a partir dos dados extraídos:**

- `seguidores` = soma dos `seguidores` das três redes.
- `visualizacoes_mensais` = soma das `visualizacoes` das três redes.
- `taxa_engajamento` = média aritmética das `taxa_engajamento` das redes.
- `alcance` = soma dos `alcance` das três redes.
- `compartilhamento` = soma dos `compartilhamentos` das três redes.
- `min_idade_publico` = menor valor entre os `min_idade_publico` das redes.
- `max_idade_publico` = maior valor entre os `max_idade_publico` das redes.
- `taxa_publico_brasil` = média aritmética das `taxa_publico_brasil` das redes.
- `taxa_publico_masculino` = média aritmética das `taxa_publico_masculino` das redes.
- `interesses_publico` = união (sem repetições) dos interesses mais frequentes entre as três redes. Limite a 5 itens, separados por vírgula. Exemplo: "Humor, Memes, Games, Cultura Pop".

**Formato de saída:** Apenas o JSON, sem texto adicional.

**Estrutura do JSON:**
``` json
{
  "metricas_gerais": {
    "seguidores": null,
    "visualizacoes_mensais": null,
    "taxa_engajamento": null,
    "alcance": null,
    "compartilhamento": null,
    "min_idade_publico": null,
    "max_idade_publico": null,
    "taxa_publico_brasil": null,
    "taxa_publico_masculino": null,
    "interesses_publico": null
  },
  "redes_sociais": {
    "youtube": {
      "seguidores": null,
      "taxa_engajamento": null,
      "alcance": null,
      "visualizacoes": null,
      "likes": null,
      "comentarios": null,
      "compartilhamentos": null,
      "min_idade_publico": null,
      "max_idade_publico": null,
      "taxa_publico_brasil": null,
      "taxa_publico_masculino": null,
      "interesses_publico": null,
      "tipo_conteudo": null,
      "frequencia_postagem": null,
      "melhor_performance": null
    },
    "instagram": {
      "seguidores": null,
      "taxa_engajamento": null,
      "alcance": null,
      "visualizacoes": null,
      "likes": null,
      "comentarios": null,
      "compartilhamentos": null,
      "min_idade_publico": null,
      "max_idade_publico": null,
      "taxa_publico_brasil": null,
      "taxa_publico_masculino": null,
      "interesses_publico": null,
      "tipo_conteudo": null,
      "frequencia_postagem": null,
      "melhor_performance": null
    },
    "tiktok": {
      "seguidores": null,
      "taxa_engajamento": null,
      "alcance": null,
      "visualizacoes": null,
      "likes": null,
      "comentarios": null,
      "compartilhamentos": null,
      "min_idade_publico": null,
      "max_idade_publico": null,
      "taxa_publico_brasil": null,
      "taxa_publico_masculino": null,
      "interesses_publico": null,
      "tipo_conteudo": null,
      "frequencia_postagem": null,
      "melhor_performance": null
    }
  }
}
```