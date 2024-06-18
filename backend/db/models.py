from sqlalchemy import Column, Integer,Float,String, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base, Mapped, mapped_column
Base = declarative_base()

#user table
class User(Base):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    first_name: Mapped[str] = mapped_column(String)
    last_name: Mapped[str] = mapped_column(String)
    password:Mapped[int] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    meli_code: Mapped[str] = mapped_column(String, unique=True, index=True)
    #is_admin :Mapped[bool]=mapped_column(Boolean)


    class Config:
        orm_mode: True



class Admin(Base):
    __tablename__ = 'admin'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username : Mapped[str] = mapped_column(String)
    password : Mapped[str] = mapped_column(String)
    # is_admin : Mapped[bool] = mapped_column(Boolean)

    class Config:
        orm_mode: True


#room table
class Room(Base):
    __tablename__ = 'room'
    id = Column(Integer, index=True, primary_key=True)
    bed_number = Column(Integer)
    is_taken = Column(Boolean)
    price = Column(Integer)
    # user_id = Column(Integer, ForeignKey('user.id'))
    # user = relationship("User", back_populates="room")


class Room_User(Base):
    __tablename__ = 'room_user'
    id = Column(Integer, index=True, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    room_id = Column(Integer, ForeignKey('room.id'))


class Reservation(Base):
    __tablename__ = 'reservations'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    room_id: Mapped[int] = mapped_column(Integer)
    check_in: Mapped[str] = mapped_column(String)
    check_out: Mapped[str] = mapped_column(String)
    first_name: Mapped[str] = mapped_column(String)
    last_name: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String)
    meli_code: Mapped[str] = mapped_column(String)
  



