FROM python:3.10-slim

WORKDIR /app

# Instalar dependências básicas
# Vamos criar um requirements.txt na pasta depois, mas por enquanto instalamos direto
RUN pip install flask pymongo flask-cors python-dotenv requests

COPY . .

# Comando padrão (será sobrescrito no docker-compose, mas fica de fallback)
CMD ["python", "app.py"]