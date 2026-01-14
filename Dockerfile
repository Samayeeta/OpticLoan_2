# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (Minimal for PyMuPDF)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container at /app
COPY Backend/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY Backend/ .

# Ensure the upload directory exists and is writable
RUN mkdir -p uploads && chmod 777 uploads

# Expose the port the app runs on
EXPOSE 5000

# Set environment variables for Render
ENV PORT=5000
ENV PYTHONUNBUFFERED=1

# Run the application with a single worker for maximum stability
CMD ["gunicorn", "--workers", "1", "--bind", "0.0.0.0:5000", "app:app"]
