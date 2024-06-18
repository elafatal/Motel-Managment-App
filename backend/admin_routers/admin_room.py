from fastapi import APIRouter, Depends, status, UploadFile, File
from fastapi.exceptions import HTTPException
from schema import RoomDisplay, RoomBase, UserAuth
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_room
from typing import List
from string import ascii_letters
from authentication import auth

router = APIRouter(
    tags=['Admin Room'],
    prefix='/admin/room',
)


@router.post('/add_room', response_model=RoomDisplay)
def add_room(request: RoomBase, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_room.add_room(request, db, admin.id)


@router.get('/get_room/{id}', response_model=RoomDisplay)
def get_room_by_admin(id: int, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_room.get_room_by_admin(id, db, admin.id)


@router.get('/get_user/{name}', response_model=RoomDisplay)
def get_user_by_admin(name: str, db: Session = Depends(get_db), admin: UserAuth = Depends(auth.get_current_admin)):
    return db_room.get_user_by_admin(name, db, admin.id)