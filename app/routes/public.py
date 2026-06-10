from flask import render_template, Blueprint
from sqlalchemy import func
from app.models import db, MetricasGerais, MetricasPorRedeSocial
from app.config import PAGES

bp = Blueprint("public", __name__)


@bp.route("/")
def index():

    ultima_geral = MetricasGerais.query.order_by(
        MetricasGerais.data_coleta_dados.desc()
    ).first()
    # Busca os últimos registros de cada rede social
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
        "pages/index.html",
        page_title="Início",
        navigation=PAGES,
        metricas_gerais=ultima_geral,
        redes=redes_dict,
    )


@bp.route("/metricas")
def metricas():
    ultima_geral = MetricasGerais.query.order_by(
        MetricasGerais.data_coleta_dados.desc()
    ).first()
    # Últimos registros por rede social
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
        "pages/metricas.html",
        page_title="Métricas",
        navigation=PAGES,
        metricas_gerais=ultima_geral,
        redes=redes_dict,
    )


@bp.route("/parcerias")
def parcerias():
    return render_template(
        "pages/parcerias.html", page_title="Parcerias", navigation=PAGES
    )


@bp.route("/contato")
def contato():
    return render_template(
        "pages/contato.html", page_title="Entre em Contato", navigation=PAGES
    )
