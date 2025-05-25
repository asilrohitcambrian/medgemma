from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from PIL import Image
import base64
import io

app = FastAPI()

# Enable CORS so React frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Allow both React dev ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Med-Gemma model pipeline
pipe = pipeline("image-text-to-text", model="google/medgemma-4b-it")

class ReportRequest(BaseModel):
    image: str  # base64 string
    question: str = "What is the diagnosis?"

@app.post("/generate-report")
async def generate_report(request: ReportRequest):
    try:
        # Decode image
        image_data = base64.b64decode(request.image.split(",")[1])
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # Run model
        messages = [{"role": "user", "content": [{"type": "image", "image": image}, {"type": "text", "text": request.question}]}]
        result = pipe(messages)

        return {
            "output": result[0]["generated_text"]
        }

    except Exception as e:
        return {"error": str(e)} 