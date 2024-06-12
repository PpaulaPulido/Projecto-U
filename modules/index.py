from flask import Blueprint, request, render_template, redirect, url_for, flash,current_app,send_from_directory,abort,session
from db import get_db, get_cursor
import os

inicio = Blueprint('inicio', __name__)
db = get_db()
cursor = get_cursor(db)

@inicio.route('/index_user')
def index():
    return render_template('index.html')

@inicio.route('/nosotros')
def nosotros():
    return render_template('MVQ.html')