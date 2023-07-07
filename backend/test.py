# from pyresparser import ResumeParser
# data = ResumeParser('Resume.pdf').get_extracted_data()

from resume_parser import resumeparse

data = resumeparse.read_file('Resume.pdf')