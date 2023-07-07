from fastapi import FastAPI,UploadFile,File,Body
from database import db,User_Collection
from models import User
from parser import extract_contact_number_from_resume,extract_email_from_resume,extract_name_from_resume
from schemas import user_type
from fastapi.middleware.cors import CORSMiddleware
from bson.objectid import ObjectId

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/add_data",response_description="data added successfully" )
async def add_data(file:UploadFile=File(...)):
    name = extract_name_from_resume(file.filename)
    email = extract_email_from_resume(file.filename)
    mobile_no = extract_contact_number_from_resume(file.filename)
    data = {
        'name':name,
        'email':email,
        'mobile_no':mobile_no
    }
    db_req = User(name=name,email=email,mobile_no=mobile_no)
    User_Collection.insert_one(data)
    return {'result':db_req}

@app.get("/")
async def list_data():
    user_list = []
    data = User_Collection.find()
    for i in data:
        user_list.append(user_type(i))
    return user_list
     
@app.delete('/delete/{id}')
async def delete_data(id):
    data = User_Collection.find_one({'_id':ObjectId(id)})
    if data:
        User_Collection.delete_one({'_id':ObjectId(id)})
        return {'response':'data deleted successfully'}
    return {'response':'data not found'}

@app.put('/update/{id}')
async def delete_data(id,request=Body(...)):
    data = User_Collection.find_one({'_id':ObjectId(id)})
    if data:
        User_Collection.update_one({'_id':ObjectId(id)},{'$set':request})
        return {'response':'data updated successfully'}
    return {'response':'data not found'}