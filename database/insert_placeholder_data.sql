-- ======================================================
-- (Opcional) Inserir registros iniciais de exemplo
-- Use INSERT IGNORE para não causar erro se a data já existir
-- ======================================================

INSERT IGNORE INTO metricas_gerais 
    (data_coleta_dados, seguidores, visualizacoes_mensais, taxa_engajamento, alcance, compartilhamento,
     min_idade_publico, max_idade_publico, taxa_publico_brasil, taxa_publico_masculino,
     interesses_publico)
VALUES 
    (CURDATE(), 123, 123, 0.1, 1000000, 12345,
     16, 24, 80.0, 45.0,
     'Placeholder1, Placeholder2, Placeholder3');

INSERT IGNORE INTO metricas_por_rede_social 
    (nome_rede_social, data_coleta_dados, seguidores, taxa_engajamento, alcance, visualizacoes, likes, comentarios, compartilhamentos,
     min_idade_publico, max_idade_publico, taxa_publico_brasil, taxa_publico_masculino,
     interesses_publico, tipo_conteudo, frequencia_postagem, melhor_performance)
VALUES 
    ('youtube', CURDATE(), 1300000, 9.1, 729000, 165000000, 150000, 12000, 28400,
     18, 24, 98.0, 45.0,
     'Placeholder4, Placeholder5, Placeholder6, Placeholder7',
     'Placeholder8', '2 a 3 vezes por semana (placeholder)', 'Reações e Exposições de Trends (placeholder)'),
     
    ('instagram', CURDATE(), 892000, 6.8, 1200000, 3700000, 245000, 22500, 98200,
     18, 30, 89.0, 38.0,
     'Placeholder1, Placeholder2, Placeholder3, Placeholder4',
     'Placeholder5, Placeholder6, Placeholder7', '5 vezes por semana', 'Reels virais e desafios'),
     
    ('tiktok', CURDATE(), 2100000, 12.3, 2100000, 8400000, 690000, 48000, 210000,
     16, 24, 95.0, 42.0,
     'Placeholder1, Placeholder2, Placeholder3, Placeholder4',
     'Shorts verticais, trends semanais', '1 a 2 vídeos por dia', 'Participação em hashtags virais');
