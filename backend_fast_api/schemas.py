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