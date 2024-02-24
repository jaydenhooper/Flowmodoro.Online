from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
import os
from dotenv import load_dotenv, dotenv_values
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "flowmodoro_database"

def create_app():
    app = Flask(__name__)
    load_dotenv()
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    db.init_app(app)

    from .views import views
    from .auth import auth
    
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, Note

    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id: int):
        return User.query.get(int(id))

    return app

    