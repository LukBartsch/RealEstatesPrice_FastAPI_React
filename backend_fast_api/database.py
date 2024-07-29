from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pathlib import Path
import os

base_dir = Path(__file__).resolve().parent
env_file = os.path.join(base_dir, '.env')
load_dotenv(env_file)


SECRET_KEY = os.environ.get('SECRET_KEY')
DB_FILE_PATH = os.path.join(base_dir, os.environ.get('DB_FILE_PATH')) # base_dir / os.environ.get('DB_FILE_PATH')
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') + os.environ.get('DB_FILE_PATH')


print(SQLALCHEMY_DATABASE_URI)

#DB_URL = DB_URL = os.getenv("DB_URL")
engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)
SessionLocal = sessionmaker(autocommit=False,autoflush=False, bind=engine)

Base = declarative_base()


