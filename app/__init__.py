from flask import Flask
from app.config import Config
from app.models import db
from app.utils import format_number_with_suffix, format_decimal_br, format_thousands_separator
from app.routes import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)

    # Registra filtros Jinja
    app.jinja_env.filters['format_suffix'] = format_number_with_suffix
    app.jinja_env.filters['format_decimal'] = format_decimal_br
    app.jinja_env.filters['format_thousands'] = format_thousands_separator

    # Registra context processor
    @app.context_processor
    def inject_navigation():
        from app.config import PAGES
        return {"navigation": PAGES}

    # Registra blueprints
    register_blueprints(app)

    return app