#!/usr/bin/env python3
import joblib
import pandas as pd
from pathlib import Path

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

# Descripción de KTAS
KTAS_CLASSES = {
    1: 'Rojo - Emergencia (Atención inmediata)',
    2: 'Naranja - Urgente (10 minutos)',
    3: 'Amarillo - Semiurgente (60 minutos)',
    4: 'Verde - No urgente (120 minutos)',
    5: 'Azul - No demanda servicio'
}

print("\n=== SISTEMA DE TRIAGE AUTOMÁTICO ===\n")

# Solicitar datos
data = {
    'Group': input("1. Servicio de Urgencias (1=local, 2=regional): "),
    'Chief_complain': input("2. Síntomas principales: "),
    'Patients number per hour': float(input("3. Pacientes por hora: ")),
    'Age': float(input("4. Edad: ")),
    'Sex': input("5. Sexo (1=Femenino, 2=Masculino): "),
    'Arrival mode': input("6. Método de llegada (1 = Caminando 2 = Ambulancia pública 3 = Vehículo privado 4 = Ambulancia privada 5, 6, 7 = Otros): "),
    'Mental': input("7. Estado mental (1=Alerta, 2=Verbal, 3=Dolor, 4=Sin respuesta): "),
    'Injury': input("8. Lesión (1=No, 2=Si): "),
    'Pain': input("9. Dolor (1=Si, 0=No): "),
    'NRS_pain': float(input("10. Escala de dolor (0-10): ")),
    'BT': float(input("11. Temperatura (°C): ")),
    'HR': float(input("12. Frecuencia cardíaca (bpm): ")),
    'SBP': float(input("13. Presión sistólica (mmHg): ")),
    'DBP': float(input("14. Presión diastólica (mmHg): ")),
    'RR': float(input("15. Frecuencia respiratoria: ")),
    'Saturation': float(input("16. Saturación (%): ")),
    'Saturation_missing': int(input("17. Falta saturación (0=No, 1=Si): "))
}

# Preparar datos para el modelo
df_numeric = pd.DataFrame({col: [data[col]] for col in NUMERIC_COLS})
df_categorical = pd.DataFrame({col: [str(data[col])] for col in CATEGORICAL_COLS})

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

# Mostrar resultado
ktas_nivel = int(prediction)
confianza = probabilities[ktas_nivel-1] * 100

print("\n" + "="*60)
print(f"KTAS PREDICHO: {ktas_nivel}")
print(f"{KTAS_CLASSES[ktas_nivel]}")
print(f"Confianza: {confianza:.1f}%")
print("="*60 + "\n")
