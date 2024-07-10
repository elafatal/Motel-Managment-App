from db.models import Room, User, Room_User,Admin, Reservation
from schema import RoomBase
from sqlalchemy.orm import Session
from fastapi.exceptions import HTTPException
from fastapi import status



#admin-----------------------------------------------------------------------------------
def add_room(request: RoomBase, db :Session, admin_id: int):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    new_room = Room(
        bed_number = request.bed_number,
        price = request.price,
        is_taken = False,
    )

    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room


def delete_room(id: int, db: Session, admin_id: int):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        room = db.query(Room).filter(Room.id == id).first()
        if not room:
            return "No such a room"

        db.delete(room)
        db.commit()

        return 'room deleted'

    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_room_by_admin(id: int, db: Session, admin_id: int):
    admin = db.query(Admin).filter(Admin.id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    reservation = db.query(Room).filter(Room.id== id).first()
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='room not found.')

 

    return reservation
      
   

# def get_user_by_admin(meli_code:int, db: Session, admin_id: int):
#     admin = db.query(Admin).filter(Admin.id == admin_id).first()
#     if not admin:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

#     reservation = db.query(Reservation).filter(Reservation.meli_code == meli_code).first()
#     if not reservation:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='user not found.')

#     return reservation


#user------------------------------------------------------------------------------------------
def get_all_rooms_by_admin(db: Session):
    room = db.query(Room).all()
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='there is no room!')
    return room


def get_notreserved_rooms_by_admin(db: Session):
    room = db.query(Room).filter(Room.is_taken==False).all()
    if not room:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='there is no room!')
    return room



def get_rooms_by_bednumber(bed_number : int, db:Session):
        room = db.query(Room).filter((Room.bed_number==bed_number),(Room.is_taken==False)).all()
        if not room:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='there is no empty room!')
        return room


def get_all_rooms(db: Session):
    return db.query(Room).all()


def get_rooms_by_meli_code(meli_code: str, db: Session):
    reservations = db.query(Reservation).filter(Reservation.meli_code == meli_code).all()
    if not reservations:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='No reservations found for this meli_code')

    return reservations