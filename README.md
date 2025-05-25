# Med-Gemma API

A FastAPI-based API for medical image analysis using Google's Med-Gemma model.

## Features

- Image-based medical diagnosis using Med-Gemma model
- RESTful API endpoint for generating medical reports
- CORS support for frontend integration
- Base64 image input support

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### POST /generate-report

Generates a medical report based on an input image.

**Request Body:**
```json
{
    "image": "base64_encoded_image_string",
    "question": "What is the diagnosis?"  // Optional, defaults to "What is the diagnosis?"
}
```

**Response:**
```json
{
    "output": "Generated medical report text"
}
```

## Requirements

- Python 3.8+
- FastAPI
- Uvicorn
- Transformers
- PyTorch
- Pillow

## License

MIT 