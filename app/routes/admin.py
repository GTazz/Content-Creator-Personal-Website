from datetime import date
import os
from flask import (
    render_template,
    request,
    redirect,
    url_for,
    session,
    jsonify,
    Blueprint,
)
from werkzeug.security import check_password_hash
from app.models import db, MetricasGerais, MetricasPorRedeSocial
from app.utils import login_required
from sqlalchemy import func

bp = Blueprint("admin", __name__, url_prefix="/admin")


@bp.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        password = request.form.get("password")
        admin_hash = os.getenv("ADMIN_PASSWORD_HASH")
        if admin_hash and check_password_hash(admin_hash, password):
            session["logged_in"] = True
            return redirect(url_for("admin.metricas"))
        return render_template("admin/login.html", error=True)
    return render_template("admin/login.html", error=False)


@bp.route("/logout")
def logout():
    session.pop("logged_in", None)
    return redirect(url_for("admin.login"))


@bp.route("/metricas", methods=["GET", "POST"])
@login_required
def metricas():

    if request.method == "POST":
        data_atual = date.today()
        dados = request.get_json()

        # Métricas Gerais (upsert)
        geral = MetricasGerais.query.get(data_atual)
        if geral:
            for key, value in dados["metricas_gerais"].items():
                setattr(geral, key, value)
        else:
            geral = MetricasGerais(
                data_coleta_dados=data_atual, **dados["metricas_gerais"]
            )
            db.session.add(geral)

        # Redes Sociais (upsert)
        for rede, atributos in dados["redes_sociais"].items():
            rede_obj = MetricasPorRedeSocial.query.get((rede, data_atual))
            if rede_obj:
                for key, value in atributos.items():
                    setattr(rede_obj, key, value)
            else:
                rede_obj = MetricasPorRedeSocial(
                    nome_rede_social=rede, data_coleta_dados=data_atual, **atributos
                )
                db.session.add(rede_obj)

        db.session.commit()
        return jsonify({"message": "Métricas salvas com sucesso!"}), 200

    # GET: carregar dados mais recentes para o formulário admin
    ultima_geral = MetricasGerais.query.order_by(
        MetricasGerais.data_coleta_dados.desc()
    ).first()
    subquery = (
        db.session.query(
            MetricasPorRedeSocial.nome_rede_social,
            func.max(MetricasPorRedeSocial.data_coleta_dados).label("ultima_data"),
        )
        .group_by(MetricasPorRedeSocial.nome_rede_social)
        .subquery()
    )

    registros_redes = (
        db.session.query(MetricasPorRedeSocial)
        .join(
            subquery,
            (MetricasPorRedeSocial.nome_rede_social == subquery.c.nome_rede_social)
            & (MetricasPorRedeSocial.data_coleta_dados == subquery.c.ultima_data),
        )
        .all()
    )

    redes_dict = {r.nome_rede_social: r for r in registros_redes}
    return render_template(
        "admin/admin_metricas.html", metricas_gerais=ultima_geral, redes=redes_dict
    )
