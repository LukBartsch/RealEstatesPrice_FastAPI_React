from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from models import RealEstateOffer
from schemas import RealEstateOfferSchema
from database import SessionLocal, engine
from crud import get_all_prices, get_prices_for_city
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
def get_prices(skip:int=0, limit:int=4, db:Session=Depends(get_db)):
    prices = get_all_prices(db, skip=skip, limit=limit)
    return prices


@app.get("/prices/{city_name}/{market_type}", response_model=list[RealEstateOfferSchema])
def get_city_prices(city_name:str, market_type: str, skip:int=0, limit:int=5, db:Session=Depends(get_db)):
    prices = get_prices_for_city(db, city_name=city_name, market_type=market_type, skip=skip, limit=limit)
    return prices

