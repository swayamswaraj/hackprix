import numpy as np
import cv2
import mediapipe as mp
from fastapi import FastAPI, UploadFile, File
from tensorflow.keras.models import load_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
model = load_model("asl_model.h5")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] if you prefer
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1)
mp_drawing = mp.solutions.drawing_utils

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        # Convert to OpenCV image
        npimg = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Detect landmarks
        results = hands.process(img_rgb)

        if not results.multi_hand_landmarks:
            return {"error": "No hand detected"}

        # Create a blank image
        blank_image = np.ones((128, 128, 3), dtype=np.uint8) * 255

        # Draw landmarks on blank image
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(
                blank_image,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS
            )

        # Resize and normalize
        img_resized = cv2.resize(blank_image, (128, 128))  # Match your training size
        img_normalized = img_resized / 255.0
        input_data = np.expand_dims(img_normalized, axis=0)  # (1, 128, 128, 3)

        # Predict
        prediction = model.predict(input_data)
        index = np.argmax(prediction)
        labels = [chr(i) for i in range(65, 91)]  # A-Z
        letter = labels[index]

        return {"prediction": letter}

    except Exception as e:
        return {"error": str(e)}
