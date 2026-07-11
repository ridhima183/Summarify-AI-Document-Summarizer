from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.preprocess import router as preprocess_router
from routers.summarize import router as summarize_router
from routers.upload import router as upload_router

app = FastAPI(
    title="Extractive Text Summarizer API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }


# Register Routers
app.include_router(preprocess_router)
app.include_router(summarize_router)
app.include_router(upload_router)