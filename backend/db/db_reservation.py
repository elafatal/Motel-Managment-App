from sqlalchemy import distinct
from sqlalchemy.orm import Session
from db import models
from db.models import Reservation, User, Room
from schema import ReservationCreate
from fastapi.exceptions import HTTPException
from fastapi import status


def create_reservation(db: Session, reservation: ReservationCreate):
    db_reservation = Reservation(
        room_id=reservation.room_id,
        check_in=reservation.check_in,
        check_out=reservation.check_out,
        first_name=reservation.first_name,
        last_name=reservation.last_name,
        email=reservation.email,
        meli_code=reservation.meli_code
    )

    room = db.query(Room).filter(Room.id==reservation.room_id).first()
    if room:
        if room.is_taken:
            return HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                                 detail='Room already occupied')
        room.is_taken = True
        db.add(room)
        db.commit()
        db.refresh(room)


    db.add(db_reservation)
    db.commit()
    db.refresh(db_reservation)
    return db_reservation

def get_all_reservations(db: Session):
    return db.query(models.Reservation).all()

def get_reservation(db: Session, reservation_id: int):
    return db.query(models.Reservation).filter(models.Reservation.id == reservation_id).first()

def get_all_users(db: Session):
    results = db.query(
        Reservation.id,
        Reservation.first_name,
        Reservation.last_name,
        Reservation.email,
        Reservation.meli_code
    ).distinct().all()
    
    meli_codes = [result[4] for result in results]
    meli_codes = list(set(meli_codes))
    users = []
    for result in results:
        if result[4] in meli_codes:
            users.append(User(
            id = result[0],
            first_name=result[1],
            last_name=result[2],
            email=result[3],
            meli_code=result[4],
            ))
            i = meli_codes.index(result[4])
            meli_codes.pop(i)
        
    return users