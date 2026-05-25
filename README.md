# 🏥 Triage Automático con IA

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)](https://www.python.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Sistema inteligente de clasificación médica (KTAS) mediante IA para optimizar la atención en emergencias**

[🚀 Inicio Rápido](#-inicio-rápido) • [📋 Características](#-características) • [🗂️ Estructura](#-estructura-del-proyecto) • [🛠️ Tech Stack](#-tech-stack)

</div>

---

## 📖 Descripción

Este proyecto implementa un **sistema automatizado de triage médico** basado en inteligencia artificial que clasifica a los pacientes según la escala **KTAS (5 niveles de urgencia)**. Combina un backend de ML con Python y un frontend moderno con React + TypeScript.

### ¿Qué es el Triage KTAS?

El **Sistema Monárquico Canadiense de Triage (KTAS)** clasifica pacientes en 5 niveles:

| Nivel | Urgencia | Color | Tiempo Espera |
|-------|----------|-------|----------------|
| **1** | 🔴 Resucitación | Rojo | Inmediato |
| **2** | 🟠 Emergencia | Naranja | 10-15 min |
| **3** | 🟡 Urgencia | Amarillo | 30-60 min |
| **4** | 🟢 Menos Urgencia | Verde | 1-2 horas |
| **5** | 🔵 No Urgencia | Azul | 2-4 horas |

---

## ✨ Características

- 🤖 **Clasificación Inteligente**: Modelos de ML entrenados para análisis de signos vitales
- 💻 **Interfaz Moderna**: UI responsiva con React + Tailwind CSS
- 📊 **Análisis de Datos**: Visualización ECG y gráficos en tiempo real
- 📱 **Diseño Responsive**: Funciona en desktop, tablet y móvil
- ⚡ **Rendimiento**: Vite para desarrollo ultra-rápido
- 🎨 **Componentes UI**: Radix UI + Shadcn para experiencia profesional
- 🔐 **Tipado Completo**: TypeScript para mayor seguridad
- 📈 **Validación de Datos**: React Hook Form + Zod para formularios robustos

---

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** 18.0+ ([descargar](https://nodejs.org))
- **Python** 3.10+ ([descargar](https://www.python.org))
- **Git** ([descargar](https://git-scm.com))

### 1. Clonar el Repositorio

```bash
git clone https://github.com/IngenieroAlejandroRoa/Triage-Automatico---IA.git
cd Triage-Automatico---IA
```

### 2. Configurar Frontend

```bash
cd Frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

➡️ **Frontend disponible en**: `http://localhost:5173`

### 3. Configurar Backend (Python)

```bash
# Crear entorno virtual (si no existe)
python -m venv venv

# Activar entorno virtual
# En macOS/Linux:
source venv/bin/activate
# En Windows:
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar notebook de análisis
jupyter notebook Triage_Automatico_Proyecto_IA.ipynb
```

---

## 🗂️ Estructura del Proyecto

```
Triage-Automatico---IA/
│
├── 📁 Frontend/                          # Aplicación React
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.tsx                  # Componente principal
│   │   │   └── components/
│   │   │       ├── TriageForm.tsx       # Formulario de entrada
│   │   │       ├── TriageResult.tsx     # Resultado clasificación
│   │   │       ├── ECGLine.tsx          # Gráfico ECG
│   │   │       └── ui/                  # Componentes Shadcn/UI
│   │   ├── main.tsx                     # Punto de entrada
│   │   └── styles/                      # Estilos CSS
│   ├── index.html
│   ├── vite.config.ts                   # Configuración Vite
│   ├── package.json
│   └── .gitignore
│
├── 📁 venv/                             # Entorno virtual Python
│
├── 📄 Triage_Automatico_Proyecto_IA.ipynb  # Análisis ML
├── 📄 data.csv                          # Dataset de entrenamiento
├── 📄 LICENSE
├── .gitignore                           # Ignorar archivos
└── README.md                            # Este archivo

```

---

## 🛠️ Tech Stack

### Frontend
```
React 18.3.1           - Librería UI
TypeScript             - Tipado estático
Vite 6.3.5            - Build tool ultra-rápido
Tailwind CSS 4.1.12   - Utility-first CSS
Shadcn/UI             - Componentes accesibles
React Router 7.13.0   - Enrutamiento
React Hook Form 7.55  - Gestión de formularios
Zod                   - Validación de schemas
Recharts 2.15.2       - Gráficos interactivos
Emotion               - CSS-in-JS
Motion                - Animaciones Framer Motion
```

### Backend
```
Python 3.12           - Lenguaje
Jupyter Notebook      - Análisis exploratorio
Pandas                - Manipulación de datos
Scikit-learn          - Machine Learning
NumPy                 - Cálculo numérico
Matplotlib            - Visualización
```

---

## 📊 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO / MÉDICO                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            FRONTEND (React + TypeScript)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Formulario: Signos Vitales + Datos Clínicos          │ │
│  │  - Frecuencia Cardíaca (HR)                           │ │
│  │  - Saturación de Oxígeno (SpO2)                       │ │
│  │  - Presión Sistólica (SBP)                            │ │
│  │  - Frecuencia Respiratoria (RR)                       │ │
│  │  - Estado Mental                                       │ │
│  │  - Nivel de Dolor (0-10)                              │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            MODELO IA (Python)                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Algoritmos ML Entrenados:                            │ │
│  │  - Random Forest                                       │ │
│  │  - Gradient Boosting                                   │ │
│  │  - SVM                                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            CLASIFICACIÓN KTAS (1-5)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Nivel de Urgencia Médica                             │ │
│  │  Recomendación de Prioridad                            │ │
│  │  Tiempo Estimado de Atención                          │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            RESULTADO VISUAL (Frontend)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Dashboard Interactivo                                 │ │
│  │  Gráficos ECG                                          │ │
│  │  Alertas y Recomendaciones                            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Casos de Uso

### 👨‍⚕️ Personal Médico
- Clasificar rápidamente pacientes en triaje
- Obtener recomendaciones de prioridad
- Registrar signos vitales de forma estructurada

### 🏥 Hospitales
- Optimizar flujo de pacientes
- Reducir tiempos de espera
- Mejorar eficiencia en emergencias

### 📚 Estudiantes de Medicina
- Aprender sobre KTAS
- Practicar clasificaciones
- Entender criterios clínicos

---

## 📝 Variables Clínicas Monitoreadas

### Signos Vitales
- **HR** (Frecuencia Cardíaca): 60-100 bpm normal
- **SpO2** (Saturación O2): >95% normal
- **SBP** (Presión Sistólica): 120-130 mmHg normal
- **RR** (Frecuencia Respiratoria): 12-20 resp/min normal

### Estado Clínico
- **Estado Mental**: Inconsciente → Verbal → Dolor → Alerta
- **Dolor**: Escala 0-10
- **Historial Médico**: Condiciones crónicas, alergias

---

## 🚀 Comandos Útiles

### Frontend

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview
```

### Backend (Python)

```bash
# Ejecutar Jupyter Notebook
jupyter notebook

# Entrenar modelos
python train_models.py

# Hacer predicciones
python predict.py
```

---

## 📊 Análisis Exploratorio

El notebook `Triage_Automatico_Proyecto_IA.ipynb` incluye:

- 📈 Análisis estadístico de datos
- 🎯 Comparación de modelos ML
- 📊 Matriz de confusión y métricas
- 🔬 Feature importance
- 🧪 Validación cruzada

---

## 🔐 Consideraciones de Seguridad

⚠️ **Importante**: Este sistema es **educativo**. Para uso clínico real:

- ✅ Validar con médicos especialistas
- ✅ Cumplir normativas médicas locales (HIPAA, GDPR, etc.)
- ✅ Implementar auditoría de decisiones
- ✅ Usar HTTPS en producción
- ✅ Encriptar datos sensibles de pacientes

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

## 👤 Autor

**Ingeniero Alejandro Roa**

- 📧 Email: [Tu email]
- 🐙 GitHub: [@IngenieroAlejandroRoa](https://github.com/IngenieroAlejandroRoa)
- 💼 LinkedIn: [Tu LinkedIn]

---

## 💡 Agradecimientos

- 🏥 Profesionales de salud por orientación clínica
- 🎨 [Shadcn/UI](https://ui.shadcn.com) por componentes
- ⚡ [Vite](https://vitejs.dev) por build tool
- 🔬 Comunidad ML de Python

---

## 📞 Soporte

¿Preguntas o problemas?

- 📖 Revisa la [documentación](#)
- 🐛 Abre un [Issue](https://github.com/IngenieroAlejandroRoa/Triage-Automatico---IA/issues)
- 💬 Discusiones en [Discussions](https://github.com/IngenieroAlejandroRoa/Triage-Automatico---IA/discussions)

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub**

Made with ❤️ by Ingeniero Alejandro Roa

</div>
