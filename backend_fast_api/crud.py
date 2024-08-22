from sqlalchemy.orm import Session

from models import RealEstateOffer, HistoricRealEstatePrice



def get_all_prices(db: Session, skip:int=0, limit: int=100):
    return db.query(RealEstateOffer).order_by(RealEstateOffer.id.desc()).offset(skip).limit(limit).all()


def get_prices_for_city(db: Session, city_name: str, market_type: str, skip:int=0, limit: int=100):
    return db.query(RealEstateOffer).filter(RealEstateOffer.city_name == city_name).filter(RealEstateOffer.market_type == market_type).all()


def get_all_city(db: Session):
    return db.query(RealEstateOffer.city_name).distinct().all()


def get_all_market_types(db: Session):
    return db.query(RealEstateOffer.market_type).distinct().all()


def get_historical_prices(db: Session, city_name: str, market_type: str, skip:int=0, limit: int=100):
    return db.query(HistoricRealEstatePrice).filter(HistoricRealEstatePrice.city_name == city_name).filter(HistoricRealEstatePrice.market_type == market_type).filter(HistoricRealEstatePrice.m2_price != 0).all()