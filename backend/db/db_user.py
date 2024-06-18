from db.models import Room, User, Admin
from schema import UserBase, AdminBase
from sqlalchemy.orm import Session
from db.hash import Hash
from fastapi.exceptions import HTTPException
from fastapi import status



def create_user(request: UserBase, db: Session):
    name = request.meli_code
    checked = duplicate_meli_code(name, db)
    if checked:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail='This meli_code already exists')

    user = User(
        first_name=request.first_name,
        last_name=request.last_name,
        meli_code=request.meli_code,
        # password=Hash.bcrypt(request.password),
        email=request.email,
        #is_admin=False,
        # room_id = None
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def delete_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()

    try:
        db.delete(user)
        db.commit()
        return 'User Deleted'
    except:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


def duplicate_meli_code(meli_code: str, db: Session):
    user = db.query(User).filter(User.meli_code == meli_code).first()
    if user:
        return True
    else:
        return False


#
# def edite_user(request: UpdateUserBase, db: Session, user_id: int):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
#
#     name = request.meli_code
#     checked = duplicate_meli_code(name, db)
#     if checked == True and user.meli_code != request.meli_code:
#         raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
#                             detail='This meli_code already exists')
#
#     user.meli_code = request.meli_code
#     user.password = Hash.bcrypt(request.password)
#     user.email = request.email
#
#     db.commit()
#
#     return user

def get_user_by_meli_code(meli_code: str, db: Session):
    user = db.query(User).filter(User.meli_code == meli_code).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='User not found !')

    return user


def get_user_by_username(username: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='User not found !')

    return user




def create_admin(request: AdminBase, db: Session):
    # name = request.meli_code

    admin = Admin(
        username=request.username,
        password=Hash.bcrypt(request.password),
        # is_admin=True,
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin

def get_admin_by_username(username: str, db: Session):
    admin = db.query(Admin).filter(Admin.username == username).first()
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='admin not found !')

    return admin






