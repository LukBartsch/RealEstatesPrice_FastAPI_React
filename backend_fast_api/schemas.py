from pydantic import BaseModel


class RealEstateOfferSchema(BaseModel):

    id: int
    date: str
    time: str
    city_name: str
    real_estate_type: str
    market_type: str
    total_price: int
    m2_price: int
    rooms: float
    area: float
    samples: float

    class Config:
        orm_model = True


class CitySchema(BaseModel):
    city_name: str

    class Config:
        orm_model = True


class MarketTypeSchema(BaseModel):
    market_type: str

    class Config:
        orm_model = True


class HistoricalDataSchema(BaseModel):

    date: str
    city_name: str
    market_type: str
    m2_price: str

