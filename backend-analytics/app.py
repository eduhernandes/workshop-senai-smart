import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app) # Permite acesso do Next.js

# Conexão com MongoDB
# Usa a variável de ambiente ou o localhost como fallback
MONGO_URI = os.getenv("MONGO_URI", "mongodb://root:root@senai_mongo:27017/")
client = MongoClient(MONGO_URI)
db = client['senai_analytics_db']
collection = db['sensor_data']

@app.route('/')
def health_check():
    return jsonify({
        "status": "online",
        "service": "Backend Analytics (Python)",
        "db_connection": "OK"
    })

# Rota para receber dados (POST)
@app.route('/api/sensor', methods=['POST'])
def receive_data():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        data['timestamp'] = datetime.utcnow()
        result = collection.insert_one(data)
        
        return jsonify({"message": "Data received", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para ler dados (GET)
@app.route('/api/sensor', methods=['GET'])
def get_data():
    # Retorna os 10 últimos registros
    readings = list(collection.find({}, {'_id': 0}).sort('timestamp', -1).limit(10))
    return jsonify(readings), 200

if __name__ == '__main__':
    # Roda na porta 5000 INTERNA do container (mapeada para 5001 fora)
    app.run(host='0.0.0.0', port=5000, debug=True)