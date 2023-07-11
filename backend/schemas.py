# from pydhatic import Base

# class UserSchema(Base):
#     name:int
#     email:str
#     mobile_no:int

def user_type(request):
    return{
        'id':str(request['_id']),
        'name':request['name'],
        'email':request['email'],
        'mobile_no':request['mobile_no'],
        'address':request['address']
    }