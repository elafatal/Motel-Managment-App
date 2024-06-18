from typing import List
from fastapi import APIRouter, Depends
from schema import UserDisplay, UserBase, UserAuth, AdminBase,AdminDisplay
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_user
from db import db_reservation
from authentication import auth
from db import db_user

router = APIRouter(prefix='/user', tags=['user'])


@router.get("/users", response_model=List[UserDisplay])
def read_all_users(db: Session = Depends(get_db)):
    users = db_reservation.get_all_users(db)
    return users


@router.post('/create', response_model=AdminDisplay)
def create_admin(request: AdminBase, db: Session = Depends(get_db)):
    return db_user.create_admin(request, db)
