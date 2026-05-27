#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from pathlib import Path
import warnings

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Cargar modelos
MODEL_DIR = Path(__file__).parent / "Modelos"
model = joblib.load(MODEL_DIR / "modelo_random_forest.pkl")
scaler = joblib.load(MODEL_DIR / "scaler.pkl")
encoder = joblib.load(MODEL_DIR / "encoder.pkl")

# Variables en orden correcto para el modelo
NUMERIC_COLS = ["Age", "Patients number per hour", "NRS_pain", "SBP", "DBP", 
                "HR", "RR", "BT", "Saturation"]
CATEGORICAL_COLS = ["Group", "Sex", "Arrival mode", "Injury", "Chief_complain", 
                     "Mental", "Pain", "Saturation_missing"]

KTAS_CLASSES = {
    1: 'Rojo - Emergencia (Atención inmediata)',
    2: 'Naranja - Urgente (10 minutos)',
    3: 'Amarillo - Semiurgente (60 minutos)',
    4: 'Verde - No urgente (120 minutos)',
    5: 'Azul - No demanda servicio'
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener datos del request
        data = request.get_json()
        
        # Mapeo de campos del frontend a los del modelo
        patient_data = {
            'Group': str(data.get('group', '1')),
            'Chief_complain': str(data.get('symptoms_main', '')),
            'Patients number per hour': float(data.get('patients_per_hour', 0)),
            'Age': float(data.get('age', 0)),
            'Sex': str(data.get('sex', '1')),
            'Arrival mode': str(data.get('arrival', '1')),
            'Mental': str(data.get('mental', '1')),
            'Injury': str(data.get('injury', '1')),
            'Pain': str(data.get('pain', '0')),
            'NRS_pain': float(data.get('nrs_pain', 0)),
            'BT': float(data.get('temperature', 0)),
            'HR': float(data.get('heart_rate', 0)),
            'SBP': float(data.get('systolic', 0)),
            'DBP': float(data.get('diastolic', 0)),
            'RR': float(data.get('respiratory', 0)),
            'Saturation': float(data.get('saturation', 0)),
            'Saturation_missing': int(1 if not data.get('saturation_taken', True) else 0)
        }
        
        # Preparar datos para el modelo
        df_numeric = pd.DataFrame({col: [patient_data[col]] for col in NUMERIC_COLS})
        df_categorical = pd.DataFrame({col: [str(patient_data[col])] for col in CATEGORICAL_COLS})
        
        # Escalar y codificar
        df_numeric_scaled = pd.DataFrame(scaler.transform(df_numeric), columns=NUMERIC_COLS)
        df_categorical_encoded = pd.DataFrame(
            encoder.transform(df_categorical).toarray(),
            columns=encoder.get_feature_names_out()
        )
        
        # Concatenar y predecir
        X_final = pd.concat([df_numeric_scaled, df_categorical_encoded], axis=1)
        prediction = model.predict(X_final)[0]
        probabilities = model.predict_proba(X_final)[0]
        
        # Procesar resultado
        ktas_nivel = int(prediction)
        confianza = float(probabilities[ktas_nivel-1] * 100)
        
        return jsonify({
            'success': True,
            'ktas': ktas_nivel,
            'description': KTAS_CLASSES[ktas_nivel],
            'confidence': round(confianza, 1),
            'probabilities': {i: round(float(p) * 100, 1) for i, p in enumerate(probabilities, 1)}
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
