from pymongo import MongoClient

client = MongoClient('mongodb+srv://rahul:admin@cluster0.kzbcolz.mongodb.net/')

db = client['ResumeParser']
User_Collection = db['user']