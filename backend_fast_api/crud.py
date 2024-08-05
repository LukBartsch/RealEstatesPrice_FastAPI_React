from sqlalchemy.orm import Session

from models import RealEstateOffer



def get_all_prices(db: Session, skip:int=0, limit: int=100):
    return db.query(RealEstateOffer).order_by(RealEstateOffer.id.desc()).offset(skip).limit(limit).all()

def get_prices_for_city(db: Session, city_name: str, market_type: str, skip:int=0, limit: int=100):
    return db.query(RealEstateOffer).filter(RealEstateOffer.city_name == city_name).filter(RealEstateOffer.market_type == market_type).offset(skip).limit(limit).all()



