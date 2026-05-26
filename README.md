# Content-Creator-Personal-Website
Content creator personal website

## Diagrama Banco de Dados
```mermaid
erDiagram
    USUARIO_ADMIN {
        VARCHAR(255) hash_senha
    }
    
    METRICAS_GERAIS {
        BIGINT seguidores
        BIGINT visualizaoes_mensais
        FLOAT taxa_engajamento
        BIGINT alcance
        BIGINT compartilhamento

        INT min_idade_publico
        INT max_idade_publico
        FLOAT taxa_publio_brasil
        FLOAT taxa_publio_masculino
        VARCHAR(100) interesses_publico 

        DATE data_coleta_dados
    }
    
    METRICAS_POR_REDE_SOCIAL {
        VARCHAR(10) nome_rede_social PK
        BIGINT seguidores

        FLOAT taxa_engajamento
        BIGINT alcance
        BIGINT visualizaoes
        BIGINT likes
        BIGINT comentarios
        BIGINT compartilhamentos

        INT min_idade_publico
        INT max_idade_publico
        FLOAT taxa_publio_brasil
        FLOAT taxa_publio_masculino
        VARCHAR(100) interesses_publico 
        
        VARCHAR(100) tipo_conteudo 
        VARCHAR(100) frequencia_postagem
        VARCHAR(100) melhor_performance
        
        DATE data_coleta_dados
    }

    MENSAGEM_CONTATO {
        INT id_mensagem_contato PK
        VARCHAR(120) nome
        VARCHAR(254) email_contato
        VARCHAR(140) empresa
        VARCHAR(160) assunto
        TEXT mensagem
    }
```
