from io import BytesIO
from pypdf import PdfReader
from docx import Document


def extract_text_from_file(file, filename: str) -> str:
    """
    Extract text from TXT, PDF, or DOCX files.
    """

    filename = filename.lower()

    # -----------------------------
    # TXT
    # -----------------------------
    if filename.endswith(".txt"):

        try:
            text = file.decode("utf-8")

        except UnicodeDecodeError:
            raise ValueError(
                "Unable to read TXT file."
            )

    # -----------------------------
    # PDF
    # -----------------------------
    elif filename.endswith(".pdf"):

        try:
            pdf = PdfReader(BytesIO(file))

            pages = []

            for page in pdf.pages:

                page_text = page.extract_text()

                if page_text:
                    pages.append(page_text)

            text = "\n".join(pages)

        except Exception as e:
            raise ValueError(str(e))

    # -----------------------------
    # DOCX
    # -----------------------------
    elif filename.endswith(".docx"):

        try:
            doc = Document(BytesIO(file))

            text = "\n".join(
                paragraph.text
                for paragraph in doc.paragraphs
            )

        except Exception as e:
            raise ValueError(str(e))

    # -----------------------------
    # Unsupported
    # -----------------------------
    else:

        raise ValueError(
            "Unsupported file type. Upload TXT, PDF or DOCX."
        )

    # -----------------------------
    # Empty File
    # -----------------------------
    text = text.strip()

    if len(text) == 0:

        raise ValueError(
            "No readable text found. The file may be empty or a scanned/image-only PDF."
        )

    return text