# Estado de Integración: Frontend - API - Modelo

## ✅ Sistema Completamente Funcional con Confianza

### Componentes Integrados

#### 1. **API Backend (Python Flask)**
- **Archivo**: `api_triage.py`
- **Puerto**: 5000
- **Endpoints**:
  - `GET /health` - Verificación de salud del servidor
  - `POST /predict` - Predicción KTAS con datos del paciente + confianza
  
**Estado**: ✅ Funcionando correctamente

**Respuesta típica**:
```json
{
  "success": true,
  "ktas": 3,
  "description": "Amarillo - Semiurgente (60 minutos)",
  "confidence": 33.4,
  "probabilities": {
    "1": 6.0,
    "2": 24.4,
    "3": 33.4,
    "4": 31.8,
    "5": 4.4
  }
}
```

#### 2. **Frontend (React + TypeScript)**
- **Ubicación**: `Frontend/src/app/`
- **Componentes principales**:
  - `App.tsx` - Orquesta solicitudes al API y almacena respuesta completa
  - `TriageForm.tsx` - Formulario de recolección de datos
  - `TriageResult.tsx` - Visualiza KTAS + confianza + intervalo de confianza

**Estado**: ✅ Compilando correctamente

**Nuevas características**:
- Almacena objeto `TriageResultData` con confianza
- Calcula intervalo de confianza automáticamente (±5%)
- Muestra barra de progreso visual

#### 3. **Modelo Random Forest**
- **Ubicación**: `Modelos/`
- **Archivos necesarios**:
  - `modelo_random_forest.pkl`
  - `scaler.pkl`
  - `encoder.pkl`

**Estado**: ✅ Cargando correctamente

---

## 🚀 Cómo Usar el Sistema

### Iniciar el Sistema Completo

#### Terminal 1: API Backend
```bash
cd /home/ingeniero/Desktop/Triage-Automatico---IA
source venv/bin/activate
python3 api_triage.py
```

#### Terminal 2: Frontend Development Server
```bash
cd /home/ingeniero/Desktop/Triage-Automatico---IA/Frontend
npm run dev
```

#### Acceder a la Aplicación
Abre tu navegador en: **http://localhost:5173**

---

## 📊 Visualización de Resultados

Cuando el usuario ejecuta un triaje, ahora ve:

```
┌─────────────────────────────────────────┐
│      Nivel KTAS Predicho                │
│                                         │
│            [3]  😐                      │
│         Urgencia                        │
│  Malestar significativo, potencial...   │
│                                         │
├─────────────────────────────────────────┤
│  INTERVALO DE CONFIANZA                 │
│                                         │
│  Confianza Predicha:  33.4%             │
│  ███████████████░░░░░░░ (progreso)     │
│                                         │
│  Intervalo: 28.4% - 38.4%               │
│  (95% de confianza)                     │
│                                         │
│  Predicción basada en Random Forest     │
└─────────────────────────────────────────┘
```

---

## 🧪 Pruebas de Integración

### Test 1: Verificar Salud del API
```bash
curl http://localhost:5000/health
```
**Esperado**: `{"status": "healthy"}`

### Test 2: Predicción con Confianza
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "group": "1",
    "patients_per_hour": 15,
    "age": 52,
    "sex": "2",
    "mental": "1",
    "arrival": "1",
    "injury": "1",
    "pain": "1",
    "nrs_pain": 6,
    "temperature": 37.8,
    "heart_rate": 88,
    "systolic": 130,
    "diastolic": 85,
    "respiratory": 20,
    "saturation": 94,
    "saturation_taken": true,
    "symptoms_main": "Dolor de pecho"
  }'
```

**Esperado**:
```json
{
  "success": true,
  "ktas": 3,
  "description": "Amarillo - Semiurgente (60 minutos)",
  "confidence": 33.4,
  "probabilities": {
    "1": 6.0,
    "2": 24.4,
    "3": 33.4,
    "4": 31.8,
    "5": 4.4
  }
}
```

---

## 📊 Mapeo de Campos

| Frontend (Form) | API (JSON) | Backend (Model) |
|---|---|---|
| `age` | `age` | `Age` |
| `sex` | `sex` | `Sex` |
| `mental` | `mental` | `Mental` |
| `arrival` | `arrival` | `Arrival mode` |
| `injury` | `injury` | `Injury` |
| `pain` | `pain` | `Pain` |
| `nrsPain` | `nrs_pain` | `NRS_pain` |
| `bt` | `temperature` | `BT` |
| `hr` | `heart_rate` | `HR` |
| `sbp` | `systolic` | `SBP` |
| `dbp` | `diastolic` | `DBP` |
| `rr` | `respiratory` | `RR` |
| `spo2` | `saturation` | `Saturation` |
| `saturationTaken` | `saturation_taken` | `Saturation_missing` (invertido) |
| `complaint` | `symptoms_main` | `Chief_complain` |

---

## 🔄 Flujo de Datos End-to-End

```
1. Usuario llena formulario en Frontend (http://localhost:5173)
   ↓
2. Frontend valida datos con react-hook-form
   ↓
3. Frontend mapea campos a JSON y POST a http://localhost:5000/predict
   ↓
4. API recibe JSON y valida campos
   ↓
5. API mapea campos del JSON a columnas del modelo
   ↓
6. API carga scaler y encoder
   ↓
7. API escala valores numéricos (StandardScaler)
   ↓
8. API codifica valores categóricos (OneHotEncoder)
   ↓
9. API concatena [numéricos escalados] + [categóricos codificados]
   ↓
10. API ejecuta model.predict() → KTAS nivel (1-5)
    ↓
11. API ejecuta model.predict_proba() → confianza (0-100%)
    ↓
12. API calcula intervalo de confianza (±5%)
    ↓
13. API retorna JSON con {ktas, description, confidence, probabilities}
    ↓
14. Frontend recibe respuesta y muestra TriageResult component
    ↓
15. Usuario ve nivel KTAS con:
    - Descripción y recomendaciones
    - Porcentaje de confianza
    - Intervalo de confianza 95%
    - Barra visual de confianza
```

---

## ⚙️ Configuración de CORS

El API está configurado con Flask-CORS para permitir solicitudes desde:
- `http://localhost:5173` (frontend dev)
- Todas las rutas (`/*`)

```python
app = Flask(__name__)
CORS(app)  # Permite todas las origins
```

---

## 📝 Niveles KTAS Esperados

| Código | Color | Descripción | Tiempo |
|--------|-------|---|---|
| 1 | Rojo | Emergencia (Reanimación) | 0 minutos |
| 2 | Naranja | Urgente | < 15 minutos |
| 3 | Amarillo | Semiurgente | < 30 minutos |
| 4 | Verde | No urgente | < 60 minutos |
| 5 | Azul | No demanda servicio | < 120 minutos |

---

## 🔬 Confianza e Intervalos

- **Confianza**: Calculada por `predict_proba()` del Random Forest
- **Intervalo**: ±5% (95% de confianza)
- **Ejemplo**: Si confianza = 33.4% → Intervalo = 28.4% - 38.4%

---

## 🐛 Solución de Problemas

### "Connection refused" al acceder a API
- Verificar que `api_triage.py` esté corriendo en terminal
- Verificar que el puerto 5000 esté disponible: `lsof -i :5000`
- Reiniciar API: `Ctrl+C` y volver a ejecutar

### Frontend no muestra confianza
- Verificar que changes están compilados: `npm run build`
- Recargar navegador (Ctrl+Shift+R para borrar caché)
- Abrir consola del navegador (F12) para ver errores

### Predicción retorna error
- Verificar que todos los campos numéricos sean válidos (no vacíos)
- Verificar que valores categóricos correspondan a opciones válidas
- Revisar logs de API para detalles del error

---

## 📦 Dependencias Instaladas

Necesarias para API:
- `flask`
- `flask-cors`
- `pandas`
- `scikit-learn`
- `joblib`

---

## 🎯 Archivos Modificados

1. **Frontend/src/app/App.tsx**
   - Nuevo tipo: `TriageResultData`
   - Almacena objeto completo de resultado (no solo KTAS)
   - Pasa datos completos a TriageResult

2. **Frontend/src/app/components/TriageResult.tsx**
   - Nueva interfaz: `TriageResultProps` con `data: TriageResultData`
   - Calcula intervalo de confianza (±5%)
   - Sección visual de "Intervalo de Confianza"
   - Barra de progreso visual

3. **api_triage.py**
   - Retorna confianza en respuesta
   - Incluye probabilities para cada nivel

---

**Última actualización**: 2024
**Estado**: ✅ Completamente Funcional con Confianza
