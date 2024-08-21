from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from models import RealEstateOffer
from schemas import RealEstateOfferSchema, CitySchema, MarketTypeSchema, HistoricalDataSchema
from database import SessionLocal, engine
from crud import get_all_prices, get_prices_for_city, get_all_city, get_all_market_types
from fastapi.middleware.cors import CORSMiddleware

import csv
from pathlib import Path
import os

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
async def get_prices(skip:int=0, limit:int=4, db:Session=Depends(get_db)):
    prices = get_all_prices(db, skip=skip, limit=limit)
    return prices


@app.get("/prices/{city_name}/{market_type}", response_model=list[RealEstateOfferSchema])
async def get_city_prices(city_name:str, market_type: str, skip:int=0, limit:int=100, db:Session=Depends(get_db)):
    prices = get_prices_for_city(db, city_name=city_name, market_type=market_type, skip=skip, limit=limit)
    return prices


@app.get("/city_options/", response_model=list[CitySchema])
async def get_city_options(db:Session=Depends(get_db)):
    cities = get_all_city(db)
    return cities


@app.get("/market_options/", response_model=list[MarketTypeSchema])
async def get_markets_options(db:Session=Depends(get_db)):
    markets = get_all_market_types(db)
    return markets


@app.get("/get_historical_data/", response_model=list[HistoricalDataSchema])
async def get_historical_data():

    base_dir = Path(__file__).resolve().parent.parent
    data_file = os.path.join(base_dir, 'historical_real_estates_prices.csv')
    data = []
    osw_pierwotny = [] # row[1]
    wro_pierwotny = []
    osw_wtorny = [] # row[3]
    wro_wtorny = [] # row[4]
    with open(data_file, mode="r", encoding="latin-1") as file:
        reader = csv.reader(file, delimiter=";")
        next(reader)

        for row in reader:
            historical_row_wro_pierwotny = HistoricalDataSchema(date=row[0], city_name="Wrocław", market_type="pierwotny", m2_price=row[2])
            wro_pierwotny.append(historical_row_wro_pierwotny)

        #data.append(wro_pierwotny)

    return wro_pierwotny

