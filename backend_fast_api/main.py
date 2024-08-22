from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from models import RealEstateOffer, HistoricRealEstatePrice
from schemas import RealEstateOfferSchema, CitySchema, MarketTypeSchema, HistoricalDataSchema
from database import SessionLocal, engine
from crud import get_all_prices, get_prices_for_city, get_all_city, get_all_market_types, get_historical_prices, get_shorter_prices
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


@app.get("/historical_prices/{city_name}/{market_type}", response_model=list[HistoricalDataSchema])
async def get_historical_data(city_name:str, market_type: str, skip:int=0, limit:int=100, db:Session=Depends(get_db)):
    historical_prices = get_historical_prices(db, city_name=city_name, market_type=market_type, skip=skip, limit=limit)
    return historical_prices


@app.get("/combined_data/{city_name}/{market_type}", response_model=list[HistoricalDataSchema])
async def get_combined_data(city_name:str, market_type: str, skip:int=0, limit:int=100, db:Session=Depends(get_db)):
    historical_prices = get_historical_prices(db, city_name=city_name, market_type=market_type, skip=skip, limit=limit)
    prices = get_shorter_prices(db, city_name=city_name, market_type=market_type, skip=skip, limit=limit)
    combined_data = historical_prices + prices 
    return combined_data

