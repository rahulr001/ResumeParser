import re
from pdfminer.high_level import extract_text
from tika import parser
from pyresparser import ResumeParser
import threading
# from lazy_import import lazy_module
from resume_parser import resumeparse
# resume_parser = lazy_module('resume_parser.resumeparse')
# t1 = threading.Thread(target=resumeparse)
# t1.start()
# print(dir(resume_parser.resumeparse))
# t1.join()

# def extract_text(file_path: str) -> str:
#     return parser.from_file(file_path,service='text')["content"]


# def extract_contact_number_from_resume(text: str) -> int:
#     pattern = r"\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b"
#     match = re.search(pattern, text)
#     if match:
#         return match.group()


# def extract_email_from_resume(text: str) -> str:
#     pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
#     match = re.search(pattern, text)
#     if match:
#         return match.group()


# def extract_name_from_resume(text: str) -> str:
#     pattern = r"(\b[A-Z][a-z]+\b)\s(\b[A-Z][a-z]+\b)"
#     match = re.search(pattern, text)
#     if match:
#         return match.group()


def extract_contact_number_from_resume(file_path: str) -> int:
    if file_path.endswith('.doc'):
        # from resume_parser import resumeparse
        return resumeparse.read_file(file_path)['phone']
    return ResumeParser(file_path).get_extracted_data()['mobile_number']


def extract_email_from_resume(file_path: str) -> str:
    if file_path.endswith('.doc'):
        # from resume_parser import resumeparse
        return resumeparse.read_file(file_path)['email']
    return ResumeParser(file_path).get_extracted_data()['email']


def extract_name_from_resume(file_path: str) -> str:
    if file_path.endswith('.doc'):
        # from resume_parser import resumeparse
        return resumeparse.read_file(file_path)['name']
    return ResumeParser(file_path).get_extracted_data()['name']


if __name__ == '__main__':  
    # text = extract_text(f'Resume.docx')
    print(extract_contact_number_from_resume(f'Resume.doc'))
    print(extract_email_from_resume(f'Resume.doc'))
    print(extract_name_from_resume(f'Resume.doc'))
