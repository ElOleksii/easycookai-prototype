import json

import uvicorn
from fastapi import FastAPI, HTTPException
from google.genai import Client
from google.genai.errors import ClientError
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = Client(api_key="AIzaSyDLEZ7nyNw_LxunRXJ5-M28vlTNFUVtQtM")

class Request(BaseModel):
    text: str

class Response(BaseModel):
    message: str
    recipes: list[str]

prompt = (
    "Відповідай строго у форматі JSON:\n"
    "{\n"
    "  \"recipes\": [\"Рецепт 1\", \"Рецепт 2\", ...],\n"
    "  \"message\": \"Коротка відповідь користувачу\"\n"
    "}\n\n"
    "ВИМОГИ:\n"
    "- Поле \"recipes\" — це масив СТРОК.\n"
    "- Кожен рецепт має бути коротким (2–4 речення) і закінчуватись рядком виду:\n"
    "  \"Калорійність: XXX ккал на 100 г\".\n"
    "- НЕ повертай словники, об’єкти або вкладений JSON всередині масиву recipes.\n"
    "- Всі рецепти повинні бути СТРОКАМИ.\n"
    "- НЕ додавай інших полів.\n"
    "- Відповідь обов’язково має бути строго валідним JSON.\n"
    "- Якщо користувач передав список продуктів — використовуй їх.\n"
    "- Якщо користувач не передав продукти — повертай повідомлення з проханням передати продукти.\n"
    "- Починай відповідь ТІЛЬКИ з '{'.\n"
    "- Жодного тексту до або після JSON."
)


@app.post("/generate", response_model=Response)
async def generate(request: Request) -> Response:
    try:
        response = await client.aio.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt + request.text,
        )
        text = response.text.replace("```json", "").replace("```", "")
        response_json = json.loads(text)
        return Response(recipes=response_json["recipes"], message=response_json["message"])
    except ClientError as e:
        raise HTTPException(status_code=e.code, detail=e.details)


if "__main__" == __name__:
    uvicorn.run(app=app, port=8000, host="127.0.0.1")