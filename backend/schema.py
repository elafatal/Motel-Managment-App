from pydantic import BaseModel
from typing import ClassVar
from datetime import datetime
from typing import List
from typing import Optional


class UserBase(BaseModel):
    meli_code: str
    first_name: str
    last_name: str
    password : str
    email: str


class UserDisplay(BaseModel):
    id: int
    first_name: str
    last_name: str
    meli_code: str
    email: str
    #is_admin: bool


    class Config:
        orm_mode = True


class UserAuth(BaseModel):
    id: int
    meli_code: str
    email: str


    class Config:
        orm_mode = True




# user in post display and comment display
class User(BaseModel):
    meli_code: str
    email : str

    class Config:
        orm_mode = True


class RoomBase(BaseModel):
    bed_number : int
    price : int

    class Config:
        orm_mode = True


class RoomDisplay(BaseModel):
    id : int
    bed_number : int
    price : int
    is_taken : bool

    class Config:
        orm_mode = True



class ReservationBase(BaseModel):
    room_id: int
    check_in: datetime
    check_out: datetime

class ReservationCreate(ReservationBase):
    first_name: str
    last_name: str
    email: str
    meli_code: str

class Reservation(ReservationBase):
    id: int
    first_name: str
    last_name: str
    email: str
    meli_code: str

    class Config:
        orm_mode = True

class ReservationDisplay(BaseModel):
    room_id: int
    check_in: datetime
    check_out: datetime
    first_name: str
    last_name: str
    email: str
    meli_code: str


class AdminBase(BaseModel):
    username: str
    password: str


class AdminDisplay(BaseModel):
    username: str

    class Config:
        from_orm = True


class AdminAuth(BaseModel):
    id: int
    username: str


    class Config:
        from_attributes = True