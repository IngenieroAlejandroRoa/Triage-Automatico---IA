#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from pathlib import Path
import warnings
import logging

warnings.filterwarnings('ignore')

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

# Mapeos de valores categóricos del frontend a valores esperados por el modelo
CATEGORICAL_MAPPINGS = {
    'Group': {
        '1': '1',  # Local
        '2': '2'   # Regional
    },
    'Sex': {
        '1': '1',  # Femenino
        '2': '2'   # Masculino
    },
    'Arrival mode': {
        '1': '1',  # Caminando
        '2': '2',  # Ambulancia pública
        '3': '3',  # Vehículo privado
        '4': '4',  # Ambulancia privada
        '5': '5'   # Otros
    },
    'Mental': {
        '1': '1',  # Alerta
        '2': '2',  # Respuesta verbal
        '3': '3',  # Respuesta al dolor
        '4': '4'   # Sin respuesta
    },
    'Injury': {
        '1': '1',  # No
        '2': '2'   # Sí
    },
    'Pain': {
        '0': '0',  # No
        '1': '1'   # Sí
    }
}

# Rangos válidos para variables numéricas
NUMERIC_RANGES = {
    'Age': (0, 150),
    'Patients number per hour': (0, 1000),
    'NRS_pain': (0, 10),
    'SBP': (30, 300),  # Presión sistólica
    'DBP': (10, 200),  # Presión diastólica
    'HR': (20, 250),   # Frecuencia cardíaca
    'RR': (5, 60),     # Frecuencia respiratoria
    'BT': (30, 45),    # Temperatura corporal
    'Saturation': (0, 100)  # SpO2
}

def validate_numeric_value(column, value):
    """Valida y corrige valores numéricos fuera de rango"""
    try:
        num_value = float(value)
        min_val, max_val = NUMERIC_RANGES[column]
        
        if num_value < min_val or num_value > max_val:
            logger.warning(f"Valor {column}={num_value} fuera de rango [{min_val}, {max_val}]. Usando valor por defecto.")
            # Usar valores por defecto seguros
            defaults = {
                'Age': 45, 'Patients number per hour': 15, 'NRS_pain': 0,
                'SBP': 120, 'DBP': 80, 'HR': 80, 'RR': 16, 'BT': 36.5, 'Saturation': 98
            }
            return defaults.get(column, (min_val + max_val) / 2)
        return num_value
    except (ValueError, TypeError):
        logger.error(f"Error convertiendo {column} con valor {value}")
        defaults = {
            'Age': 45, 'Patients number per hour': 15, 'NRS_pain': 0,
            'SBP': 120, 'DBP': 80, 'HR': 80, 'RR': 16, 'BT': 36.5, 'Saturation': 98
        }
        return defaults.get(column, 0)

def validate_categorical_value(column, value):
    """Valida y mapea valores categóricos"""
    str_value = str(value).strip()
    
    if column in CATEGORICAL_MAPPINGS:
        if str_value in CATEGORICAL_MAPPINGS[column]:
            return CATEGORICAL_MAPPINGS[column][str_value]
        else:
            logger.warning(f"Valor inválido para {column}: {str_value}. Usando valor por defecto '1'.")
            return '1'
    
    return str_value

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Obtener datos del request
        data = request.get_json()
        logger.info(f"Datos recibidos: {data}")
        
        # Procesar Chief_complain (síntomas)
        symptoms = []
        if data.get('symptoms_main'):
            symptoms = data.get('symptoms_main', '').split(',') if isinstance(data.get('symptoms_main'), str) else data.get('symptoms_main', [])
            symptoms = [s.strip() for s in symptoms if s.strip()]
        
        chief_complain = ', '.join(symptoms) if symptoms else 'Sin especificar'
        
        # Mapeo de campos del frontend a los del modelo CON VALIDACIÓN
        patient_data = {
            'Group': validate_categorical_value('Group', data.get('group', '1')),
            'Chief_complain': chief_complain,
            'Patients number per hour': validate_numeric_value('Patients number per hour', data.get('patients_per_hour', 15)),
            'Age': validate_numeric_value('Age', data.get('age', 45)),
            'Sex': validate_categorical_value('Sex', data.get('sex', '1')),
            'Arrival mode': validate_categorical_value('Arrival mode', data.get('arrival', '1')),
            'Mental': validate_categorical_value('Mental', data.get('mental', '1')),
            'Injury': validate_categorical_value('Injury', data.get('injury', '1')),
            'Pain': validate_categorical_value('Pain', data.get('pain', '0')),
            'NRS_pain': validate_numeric_value('NRS_pain', data.get('nrs_pain', 0)),
            'BT': validate_numeric_value('BT', data.get('temperature', 36.5)),
            'HR': validate_numeric_value('HR', data.get('heart_rate', 80)),
            'SBP': validate_numeric_value('SBP', data.get('systolic', 120)),
            'DBP': validate_numeric_value('DBP', data.get('diastolic', 80)),
            'RR': validate_numeric_value('RR', data.get('respiratory', 16)),
            'Saturation': validate_numeric_value('Saturation', data.get('saturation', 98)),
            'Saturation_missing': int(1 if not data.get('saturation_taken', True) else 0)
        }
        
        logger.info(f"Datos procesados: {patient_data}")
        
        # Preparar datos para el modelo
        df_numeric = pd.DataFrame({col: [patient_data[col]] for col in NUMERIC_COLS})
        df_categorical = pd.DataFrame({col: [str(patient_data[col])] for col in CATEGORICAL_COLS})
        
        logger.info(f"DataFrame numérico:\n{df_numeric}")
        logger.info(f"DataFrame categórico:\n{df_categorical}")
        
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
        
        logger.info(f"Predicción: KTAS={ktas_nivel}, Confianza={confianza}%")
        
        return jsonify({
            'success': True,
            'ktas': ktas_nivel,
            'description': KTAS_CLASSES[ktas_nivel],
            'confidence': round(confianza, 1),
            'probabilities': {i: round(float(p) * 100, 1) for i, p in enumerate(probabilities, 1)}
        })
    
    except Exception as e:
        logger.error(f"Error en predicción: {str(e)}", exc_info=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
