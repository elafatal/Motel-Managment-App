from fastapi import APIRouter, Depends, status
from schema import RoomDisplay, RoomBase, UserAuth
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_room
from typing import List
from authentication import auth
from fastapi.exceptions import HTTPException


router = APIRouter(prefix='/room', tags=['room'])


@router.get('/get_not_taken_rooms', response_model=List[RoomDisplay])
def get_taken_rooms(db: Session = Depends(get_db)):
    return db_room.get_nottaken_rooms(db)
@router.get('/get_all_rooms', response_model=List[RoomDisplay])
def get_all_rooms(db: Session = Depends(get_db)):
    return db_room.get_all_rooms_by_admin(db)

@router.get('/get_notreserved_rooms', response_model=List[RoomDisplay])
def get_notreserved_rooms(db: Session = Depends(get_db)):
    return db_room.get_notreserved_rooms_by_admin(db)


@router.get('/get_rooms_by_bednumber/{number}', response_model=List[RoomDisplay])
def get_rooms_by_bednumber(bed_num : int, db: Session = Depends(get_db)):
    return db_room.get_rooms_by_bednumber(bed_num, db)


@router.get('/get_rooms_by_user/{meli_code}', response_model=List[RoomDisplay])
def get_user_by_admin(meli_code:int,  db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_room.get_user_by_admin(meli_code, db, admin.id)

@router.get('/get_all_rooms', response_model=List[RoomDisplay])
def get_all_rooms(db: Session = Depends(get_db)):
    return db_room.get_all_rooms(db)
