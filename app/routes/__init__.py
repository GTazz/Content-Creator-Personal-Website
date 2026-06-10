from . import public, admin

def register_blueprints(app):
    app.register_blueprint(public.bp)
    app.register_blueprint(admin.bp, url_prefix='/admin')