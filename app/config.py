import os
from dotenv import load_dotenv

load_dotenv()

def build_database_uri():
    """Constrói a URI do banco a partir do .env"""
    database_uri = os.getenv("DATABASE_URI")
    if database_uri:
        return database_uri
    dialect = os.getenv("DB_DIALECT", "mysql+pymysql")
    user = os.getenv("DB_USER", "root")
    password = os.getenv("DB_PASSWORD", "")
    host = os.getenv("DB_HOST", "127.0.0.1")
    port = os.getenv("DB_PORT", "3306")
    database = os.getenv("DB_NAME", "content_creator_db")
    auth = f"{user}:{password}" if password else user
    return f"{dialect}://{auth}@{host}:{port}/{database}"

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = build_database_uri()  # será definido depois
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# Páginas públicas (navigation)
PAGES = [
    {"endpoint": "index", "path": "/", "title": "Início", "template": "pages/index.html"},
    {"endpoint": "metricas", "path": "/metricas", "title": "Métricas", "template": "pages/metricas.html"},
    {"endpoint": "parcerias", "path": "/parcerias", "title": "Parcerias", "template": "pages/parcerias.html"},
    {"endpoint": "contato", "path": "/contato", "title": "Entre em Contato", "template": "pages/contato.html"},
]


Config.SQLALCHEMY_DATABASE_URI = build_database_uri()
