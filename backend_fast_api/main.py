from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from models import RealEstateOffer
from schemas import RealEstateOfferSchema
from database import SessionLocal, engine
from crud import get_prices

app = FastAPI()

#Dependency
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/prices/", response_model=list[RealEstateOfferSchema])
def get_users(skip:int=0, limit:int=0, db:Session=Depends(get_db)):
    prices = get_prices(db,skip=skip,limit=limit)

    return prices

