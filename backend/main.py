from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from db.models import Base
from db.database import engine
from admin_routers import admin_room
from authentication import authentications
from routers import user, room
from routers import reservation_router
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()
app.include_router(admin_room.router)
app.include_router(user.router)
app.include_router(room.router)
app.include_router(authentications.router)
app.include_router(reservation_router.router)

origins = [ 
     "http://localhost:*",
     "http://localhost:5173", 
     "http://localhost:5174",
     "http://127.0.0.1:8000" 
 ] 


app.add_middleware( 
     CORSMiddleware, 
     allow_origins=origins,  # Reflect the allowed origins 
     allow_credentials=True, 
     allow_methods=["*"],  # Allows all methods 
     allow_headers=["*"],  # Allows all headers 
 )

Base.metadata.create_all(engine)

@app.get("/")
def home():
    return "Hello"
