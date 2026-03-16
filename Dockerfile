# Flask Application
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && pip install gunicorn

# Copy project files
COPY . .

# NOTE: Render assigns a dynamic port via the $PORT env var.
# We bind gunicorn to 0.0.0.0:$PORT so it works both locally and on Render.
CMD gunicorn --bind 0.0.0.0:$PORT --workers 2 app:app
