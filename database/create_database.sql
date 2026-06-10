-- ======================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS (COM HISTÓRICO POR DATA)
-- Para XAMPP (MySQL / MariaDB)
-- Nome do banco: 'content_creator_db'
-- ======================================================

-- 1. Cria o banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS content_creator_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- 2. Seleciona o banco de dados
USE content_creator_db;

-- ======================================================
-- TABELA: metricas_gerais
-- Armazena as métricas agregadas do dashboard principal.
-- A data é a chave primária → garante que não haja duas coletas no mesmo dia.
-- ======================================================
CREATE TABLE IF NOT EXISTS metricas_gerais (
    data_coleta_dados DATE PRIMARY KEY,
    seguidores BIGINT NOT NULL,
    visualizacoes_mensais BIGINT NOT NULL,
    taxa_engajamento FLOAT NOT NULL,
    alcance BIGINT NOT NULL,
    compartilhamento BIGINT NOT NULL,
    min_idade_publico INT NOT NULL,
    max_idade_publico INT NOT NULL,
    taxa_publico_brasil FLOAT NOT NULL,
    taxa_publico_masculino FLOAT NOT NULL,
    interesses_publico VARCHAR(100) NOT NULL
);

-- ======================================================
-- TABELA: metricas_por_rede_social
-- Armazena métricas específicas por rede (YouTube, Instagram, TikTok).
-- Chave primária composta: (nome_rede_social + data_coleta_dados)
-- Permite histórico diário por rede sem duplicatas.
-- ======================================================
CREATE TABLE IF NOT EXISTS metricas_por_rede_social (
    nome_rede_social VARCHAR(10) NOT NULL,
    data_coleta_dados DATE NOT NULL,
    seguidores BIGINT NOT NULL,
    taxa_engajamento FLOAT NOT NULL,
    alcance BIGINT NOT NULL,
    visualizacoes BIGINT NOT NULL,
    likes BIGINT NOT NULL,
    comentarios BIGINT NOT NULL,
    compartilhamentos BIGINT NOT NULL,
    min_idade_publico INT NOT NULL,
    max_idade_publico INT NOT NULL,
    taxa_publico_brasil FLOAT NOT NULL,
    taxa_publico_masculino FLOAT NOT NULL,
    interesses_publico VARCHAR(100) NOT NULL,
    tipo_conteudo VARCHAR(100) NOT NULL,
    frequencia_postagem VARCHAR(100) NOT NULL,
    melhor_performance VARCHAR(100) NOT NULL,
    PRIMARY KEY (nome_rede_social, data_coleta_dados)
);

