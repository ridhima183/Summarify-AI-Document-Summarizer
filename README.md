<div align="center">

# 📜 Summarify

### *a little machine that reads big stories, so you don't have to*

![Made with](https://img.shields.io/badge/made%20with-love%20%26%20late%20nights-800020?style=for-the-badge&labelColor=EDE0D4)
![Status](https://img.shields.io/badge/status-happily%20summarizing-800020?style=for-the-badge&labelColor=EDE0D4)

</div>

<br>

## 🕯️ Once upon a document...

Somewhere out there is a 40-page PDF nobody has the time to read.
A research paper due tomorrow. A textbook chapter, three assignments,
and one very tired student.

**Summarify** was built for exactly that moment — you hand it your
sprawling wall of text, and it hands you back the *story* of it: shorter,
clearer, and still unmistakably *itself*.

<br>

## ✒️ What it does

<table>
<tr>
<td width="50%" valign="top">

**📥 It listens**
Upload a `.pdf`, `.docx`, or `.txt` — Summarify reads it using
`PyMuPDF (fitz)` and `python-docx`, quietly tidying up the formatting
before it even begins.

**🖋️ It rewrites, not just repeats**
At its heart is **BART** — a transformer that doesn't just copy-paste
your best sentences (that's the old way). It actually *understands* the
document and writes a brand new, fluent summary in its own words.

</td>
<td width="50%" valign="top">

**📖 It reads the long stuff too**
Chunky documents that blow past a normal transformer's limit get handled
with **LongDoc** techniques, so nothing important gets left behind in
the margins.

**🎯 It grades its own homework**
Every summary is checked against reference text using **ROUGE-1,
ROUGE-2, and ROUGE-L** — so the quality isn't just a vibe, it's measured.

</td>
</tr>
</table>

<br>

## 🧵 The threads that hold it together

<div align="center">

**Frontend**

![React](https://img.shields.io/badge/React-EDE0D4?style=flat-square&logo=react&logoColor=800020)
![Vite](https://img.shields.io/badge/Vite-EDE0D4?style=flat-square&logo=vite&logoColor=800020)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-EDE0D4?style=flat-square&logo=tailwindcss&logoColor=800020)

**Backend**

![FastAPI](https://img.shields.io/badge/FastAPI-800020?style=flat-square&logo=fastapi&logoColor=EDE0D4)
![Python](https://img.shields.io/badge/Python-800020?style=flat-square&logo=python&logoColor=EDE0D4)

**The Brains**

![HuggingFace](https://img.shields.io/badge/🤗_Transformers-EDE0D4?style=flat-square&labelColor=800020&color=EDE0D4)
![PyTorch](https://img.shields.io/badge/PyTorch-800020?style=flat-square&logo=pytorch&logoColor=EDE0D4)
![NLTK](https://img.shields.io/badge/NLTK-EDE0D4?style=flat-square&labelColor=800020&color=EDE0D4)
![Sumy](https://img.shields.io/badge/Sumy-800020?style=flat-square&labelColor=EDE0D4&color=800020)

</div>

<br>

## 🌾 A quiet little detail

Everything about Summarify — the reading, the rewriting, the grading —
happens so that a person could open it, drop in something enormous, and
get back something *human*: readable, coherent, and still true to the
original meaning. Not a mechanical extract. A retelling.

<br>

## 🪶 Getting it running

```bash
# the backend, where the reading happens
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# the frontend, where the story is told
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` (or wherever Vite tells you to look)
and hand it something to read. 🤎

<br>

<div align="center">

*Built for students, researchers, and anyone drowning in words —*
*so the important part never gets lost in the pile.*

![Burgundy](https://img.shields.io/badge/-800020?style=flat-square)
![Beige](https://img.shields.io/badge/-EDE0D4?style=flat-square)

</div>
