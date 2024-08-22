from sqlalchemy import Column, String, Integer, Float

from database import Base


class RealEstateOffer(Base):

    __tablename__ = "real_estate_average_price"

    id = Column(Integer, primary_key=True)
    date = Column(String)
    time = Column(String)
    city_name = Column(String)
    real_estate_type = Column(String)
    market_type = Column(String)
    total_price = Column(Integer)
    m2_price = Column(Integer)
    rooms = Column(Float)
    area = Column(Float)
    samples = Column(Integer)


class HistoricRealEstatePrice(Base):

    __tablename__ = "historical_real_estates_price"

    id = Column(Integer, primary_key=True)
    date = Column(String)
    city_name = Column(String)
    market_type = Column(String)
    m2_price = Column(Integer)