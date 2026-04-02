FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r backend/requirements.txt

WORKDIR /app/backend

CMD ["python", "app.py"]