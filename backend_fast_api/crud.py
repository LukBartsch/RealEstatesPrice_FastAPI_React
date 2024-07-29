from sqlalchemy.orm import Session

from models import RealEstateOffer



def get_prices(db: Session, skip:int=0, limit: int=100):
    return db.query(RealEstateOffer).offset(skip).limit(limit).all()


