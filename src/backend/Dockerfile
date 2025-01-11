# Dockerfile for Django Backend
FROM python:3.10-slim

# Set work directory
WORKDIR /app

RUN pip install --upgrade pip

# copy requirements
COPY requirements.txt /app/

# install requirements
RUN pip install -r requirements.txt

# copy rest 
COPY . /app/

EXPOSE 8000

RUN python manage.py collectstatic --noinput

# Run the application
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
