-- ======================================================
-- SCRIPT PARA LIMPAR TODOS OS DADOS DO BANCO
-- (Mantém a estrutura das tabelas)
-- Banco: content_creator_db
-- ======================================================

-- Seleciona o banco de dados
USE content_creator_db;

-- Opção 1: Usando DELETE (mais compatível, respeita gatilhos)
DELETE FROM metricas_por_rede_social;
DELETE FROM metricas_gerais;

