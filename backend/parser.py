import re
# import docx2txt
from pdfminer.high_level import extract_text
# from docx import Document
from pyresparser import ResumeParser


# def extract_text_from_pdf(file_path: str) -> str:
#     if file_path.endswith(".docx"):
#         doc = Document(file_path)
#         text = ""
#         for paragraph in doc.paragraphs:
#             text += paragraph.text + "\n"
#         return text
#     elif file_path.endswith(".doc"):
#         pass
#     return extract_text(file_path)


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
        from resume_parser import resumeparse
        return resumeparse.read_file(file_path)['phone']
    return ResumeParser(file_path).get_extracted_data()['mobile_number']


def extract_email_from_resume(file_path: str) -> str:
    if file_path.endswith('.doc'):
        from resume_parser import resumeparse
        return resumeparse.read_file(file_path)['email']
    return ResumeParser(file_path).get_extracted_data()['email']


def extract_name_from_resume(file_path: str) -> str:
    if file_path.endswith('.doc'):
        from resume_parser import resumeparse
        return resumeparse.read_file(file_path)['name']
    return ResumeParser(file_path).get_extracted_data()['name']


if __name__ == '__main__':
    # text = extract_text_from_pdf(f'Resume.docx')
    print(extract_contact_number_from_resume(f'Resume.pdf'))
    print(extract_email_from_resume(f'Resume.pdf'))
    print(extract_name_from_resume(f'Resume.pdf'))
