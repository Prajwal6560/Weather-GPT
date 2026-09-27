# 🌦️ WeatherGPT — Conversational Meteorological Intelligence & Decision Support

> **Smart India Hackathon 2026 Prototype — Problem Statement SIH26068**  
> *Theme: Disaster Management | Domain: Meteorological AI & Early Warning Systems*

---

## 🌟 Executive Overview

**WeatherGPT** is not a generic weather dashboard or a simple chatbot wrapping a weather API. It is an **autonomous meteorological intelligence and decision-support platform** designed to transform complex numerical weather prediction (NWP) model outputs into actionable, life-saving recommendations for citizens, commuters, farmers, and disaster management authorities.

When a user asks:
> *"Will it rain tomorrow in Bengaluru, and is it safe to travel?"*

WeatherGPT parses the natural-language query, extracts temporal and spatial entities, retrieves high-resolution numerical weather prediction (NWP) data, computes localized transit risk thresholds, and presents an authoritative, grounded decision:
* **Forecast Synopsis:** Afternoon convective downpours (peak 3:00 PM – 6:00 PM, up to 14.8 mm/h).
* **AI Decision Support:** Commute Risk **ELEVATED**; optimal departure window before 2:00 PM.
* **Evidence:** Saturated road drainage, Doppler radar reflectivity (45 dBZ), and IMD Orange Alert.
* **Confidence & Provenance:** 88% model convergence (ECMWF & GFS ensemble), with explicit timestamps.
* **GIS Interactivity:** Structured action to trigger the visual GIS workspace with radar and urban flood overlays.

---

## 🏛️ Six Core Surfaces

WeatherGPT avoids navigational clutter by organizing the entire experience across 6 primary surfaces:

1. **💬 Chat (Conversational AI Heart):**
   * Natural language query parser with persona disambiguation.
   * Multi-domain decision support cards (Travel, Agriculture, Civil Defense, Schools, Marine).
   * Speech-to-Text input (Web Speech API) and Text-to-Speech audio playback.
   * Interactive follow-up suggestion chips.
2. **📊 Dashboard:**
   * Real-time observations, feels-like temperatures, atmospheric pressure, and AQI.
   * 24-hour hourly precipitation timeline and 7-day outlook cards.
   * Active Severe Alert banners with civic safety guidelines.
3. **🗺️ Weather Map (Advanced GIS Workspace):**
   * Full-screen interactive Leaflet GIS interface with CartoDB Dark Matter tiles.
   * Dynamic layers: Precipitation radar sweep, urban flood risk polygons (e.g. Bengaluru Bellandur, Silk Board), Bay of Bengal cyclone tracking cone, and Doppler weather radar stations.
   * 24-hour timeline slider with Play/Pause animation.
4. **📈 Insights (Climate & Decadal Anomalies):**
   * Decadal trend visualizer (e.g. 2019 vs 2025 comparative assessment).
   * Recharts interactive diagrams: Monthly rainfall accumulation, temperature curves, and cloudburst frequencies.
   * Grounded AI climate interpretation explaining climatological shifts without hallucination.
5. **🚨 Alerts Center (Early Warning & Civil Defense):**
   * Multi-hazard bulletins classified by IMD standard color codes: **Green, Yellow, Orange, Red**.
   * District-level impacts, issuance timestamps, safety precautions, and one-click GIS mapping.
6. **⚙️ Settings & Configuration:**
   * Persona switcher (Citizen, Farmer, Disaster Management Authority, Researcher).
   * 8 Indian languages selector (English, हिन्दी, ಕನ್ನಡ, தமிழ், తెలుగు, മലയാളം, বাংলা, मराठी).
   * Unit conversions (°C / °F, km/h / mph) and notification subscription preferences.

---

## 🚀 Calibrated SIH2026 Flagship Scenarios

The platform includes deterministic, ground-calibrated scenarios for demonstration:
1. **🌧️ Bengaluru Rain & Travel Advisory:**
   * Query: *"Will it rain tomorrow in Bengaluru, and is it safe to travel?"*
   * Result: Afternoon peak rainfall analysis, ORR waterlogging alert, and safe travel window before 2:00 PM.
2. **🌾 Mysuru Farmer Pesticide Spraying Advisory:**
   * Query: *"Should I spray pesticides tomorrow in Mysuru?"*
   * Result: Acute foliar chemical wash-off warning; advises rescheduling to calm Friday morning.
3. **🌀 Chennai Cyclone Threat Bulletin:**
   * Query: *"What is the cyclone alert status in Chennai?"*
   * Result: Red Alert for Bay of Bengal depression; squall gales 75–85 km/h, storm surge warnings, and maritime suspension.
4. **🗺️ Bengaluru Urban Flood GIS Trigger:**
   * Query: *"Show me flood risk around Bengaluru tomorrow."*
   * Result: Structured AI action `OPEN_WEATHER_MAP` auto-focusing on Bellandur & Varthur drainage basins with high-resolution risk polygons.
5. **📊 Decadal Climate Comparison (2019 vs 2025):**
   * Query: *"Compare today's weather with 2019 in Bengaluru."*
   * Result: Statistical analysis showing +1.6°C mean temperature increase and 3.5× rise in extreme heat days.

---

## 🛠️ Technology Stack

| Layer | Framework / Library | Role |
|---|---|---|
| **Frontend Framework** | **Next.js 14 (App Router)** | Server Components, dynamic streaming, and fullstack modular routes |
| **Language** | **TypeScript 5.7** | Strict type safety across the meteorological schema |
| **Styling & Design** | **Tailwind CSS + Glassmorphism** | Obsidian frosted glass aesthetic (`backdrop-blur-xl`, slate-900/cyan-500) |
| **GIS / Mapping** | **Leaflet + React-Leaflet** | Client-side GIS polygon rendering, radar animation, and custom markers |
| **Charts** | **Recharts** | Interactive SVG visualizations for rainfall and temperature trends |
| **Icons** | **Lucide React** | Consistent, modern iconography |
| **Speech** | **Web Speech API** | Client-side speech recognition and localized Indian language voice synthesis |
| **NWP Telemetry** | **Open-Meteo High-Res NWP** | Live ECMWF IFS / GFS 0.25° ensemble data with fallback simulation |

---

## 💻 Getting Started

### 1. Prerequisites
* **Node.js** v18+ (tested on v24.11)
* **npm** v9+

### 2. Installation
```bash
# Clone or navigate to the workspace
cd SIH2026

# Install dependencies
npm install
```

### 3. Running the Verification Test Suite
```bash
# Executes 25/25 automated unit and end-to-end flagship scenario tests
npm test
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🔒 Safety & Trust Principles
1. **Official Warnings First:** Active emergency warnings from IMD or SDMA always supersede routine forecasts.
2. **Never Fabricate Meteorological Facts:** The AI only reasons over verified observation, NWP model outputs, or explicitly labeled simulation data.
3. **Data Provenance:** Every response identifies the numerical weather prediction model, observation freshness, and issue timestamp.
4. **Communicated Confidence:** Confidence scores communicate model convergence and Doppler radar agreement rather than arbitrary certainty.
