from flask_sqlalchemy import SQLAlchemy

db_error = False

db = SQLAlchemy()


class MetricasGerais(db.Model):
    __tablename__ = "metricas_gerais"
    data_coleta_dados = db.Column(db.Date, primary_key=True)
    seguidores = db.Column(db.BigInteger, nullable=False)
    visualizacoes_mensais = db.Column(db.BigInteger, nullable=False)
    taxa_engajamento = db.Column(db.Float, nullable=False)
    alcance = db.Column(db.BigInteger, nullable=False)
    compartilhamento = db.Column(db.BigInteger, nullable=False)
    min_idade_publico = db.Column(db.Integer, nullable=False)
    max_idade_publico = db.Column(db.Integer, nullable=False)
    taxa_publico_brasil = db.Column(db.Float, nullable=False)
    taxa_publico_masculino = db.Column(db.Float, nullable=False)
    interesses_publico = db.Column(db.String(100), nullable=False)


class MetricasPorRedeSocial(db.Model):
    __tablename__ = "metricas_por_rede_social"
    nome_rede_social = db.Column(db.String(10), primary_key=True)
    data_coleta_dados = db.Column(db.Date, primary_key=True)
    seguidores = db.Column(db.BigInteger, nullable=False)
    taxa_engajamento = db.Column(db.Float, nullable=False)
    alcance = db.Column(db.BigInteger, nullable=False)
    visualizacoes = db.Column(db.BigInteger, nullable=False)
    likes = db.Column(db.BigInteger, nullable=False)
    comentarios = db.Column(db.BigInteger, nullable=False)
    compartilhamentos = db.Column(db.BigInteger, nullable=False)
    min_idade_publico = db.Column(db.Integer, nullable=False)
    max_idade_publico = db.Column(db.Integer, nullable=False)
    taxa_publico_brasil = db.Column(db.Float, nullable=False)
    taxa_publico_masculino = db.Column(db.Float, nullable=False)
    interesses_publico = db.Column(db.String(100), nullable=False)
    tipo_conteudo = db.Column(db.String(100), nullable=False)
    frequencia_postagem = db.Column(db.String(100), nullable=False)
    melhor_performance = db.Column(db.String(100), nullable=False)
