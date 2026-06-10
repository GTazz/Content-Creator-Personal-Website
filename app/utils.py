from functools import wraps
from flask import session, redirect, url_for


def format_number_with_suffix(value):
    """Formata números com sufixo K, M, B. Para inteiros < 1000, sem casas decimais."""
    try:
        num = float(value)
    except (TypeError, ValueError):
        return "0"

    abs_num = abs(num)

    # Verifica se é praticamente inteiro para números pequenos (sem sufixo)
    is_integer = abs(num - round(num)) < 1e-10

    if abs_num >= 1_000_000_000:
        suffix = "B"
        divisor = 1_000_000_000
    elif abs_num >= 1_000_000:
        suffix = "M"
        divisor = 1_000_000
    elif abs_num >= 1_000:
        suffix = "K"
        divisor = 1_000
    else:
        # Números menores que 1000: formata como decimal/inteiro
        if is_integer:
            return str(int(round(num)))
        else:
            # Substitui ponto por vírgula e remove zeros decimais desnecessários
            s = f"{num:.10f}".rstrip("0").rstrip(".")
            return s.replace(".", ",")

    formatted = num / divisor
    is_int = abs(formatted - round(formatted)) < 1e-10
    if is_int:
        return f"{int(round(formatted))}{suffix}"
    else:
        # Exatamente uma casa decimal (como 1,5M)
        return f"{formatted:.1f}".replace(".", ",") + suffix


def format_decimal_br(value):
    """Converte ponto decimal em vírgula, sem .0 para inteiros."""
    try:
        num = float(value)
    except (TypeError, ValueError):
        return "0"

    # Verifica se é inteiro (tolerância para evitar erros de ponto flutuante)
    if abs(num - round(num)) < 1e-10:
        return str(int(round(num)))

    # Converte para string com até 10 casas decimais e remove zeros à direita
    s = f"{num:.10f}".rstrip("0").rstrip(".")
    return s.replace(".", ",")


def format_thousands_separator(value):
    """Formata número com separador de milhar (ponto) e vírgula decimal; sem .00 para inteiros."""
    try:
        num = float(value)
    except (TypeError, ValueError):
        return "0"

    # Verifica se é inteiro
    if abs(num - round(num)) < 1e-10:
        # Apenas a parte inteira com separadores
        return f"{int(round(num)):,}".replace(",", ".")

    # Caso contrário, separa parte inteira e decimal
    integer_part = int(num)
    decimal_part = num - integer_part
    formatted_int = f"{integer_part:,}".replace(",", ".")
    # Formata decimal com duas casas e remove zeros à direita
    decimals = f"{decimal_part:.2f}".split(".")[1].rstrip("0")
    if decimals:
        return f"{formatted_int},{decimals}"
    else:
        return formatted_int


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("logged_in"):
            return redirect(url_for("admin.login"))
        return f(*args, **kwargs)

    return decorated
