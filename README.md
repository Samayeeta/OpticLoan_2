# ⚖️ OpticLoan: Precision Document Auditing

OpticLoan is a state-of-the-art **Forensic Intelligence Platform** designed to protect borrowers by deconstructing complex loan agreements. It utilizes advanced Neural Networks and optimized memory orchestration to identify predatory "trap clauses" hidden in large legal documents.

## 🚀 Live Demo
**[Try it out here: opticloan-2-1.onrender.com](https://opticloan-2-1.onrender.com)**

## 🚀 Key Features

- **Forensic Fact Extraction:** Distills 50+ page documents into core financial markers (APR, Penalties, Dates).
- **Trap Auditing:** Identifies escalation clauses, acceleration triggers, and cross-default traps.
- **Explainable AI:** Provides clear legal reasoning for every risk detected.
- **Memory-Optimized Pipeline:** Custom cloud-native orchestration that allows auditing of massive documents without local lag or OOM errors.

## 🧠 The Neural Architecture (The "How")
OpticLoan is powered by a **Transformer-based Decoder-only Neural Network** (Google Gemini 2.x Flash). Specifically:
1. **Multi-Head Self-Attention:** This neural mechanism enables the system to assign contextual weights across a **2.0M token span**, allowing it to model long-range legal dependencies (e.g., page 5 definitions affecting page 105 clauses).
2. **Path-Based Positional Encoding:** Enables the network to understand the hierarchy of legal headings and subsections, treating the legal document as a structured graph rather than raw text.
3. **Constrained JSON Decoding:** We use deterministic sampling with a forced MIME-type schema to ensure the neural network generates verifiable extraction data with zero hallucinations.

## 🛠️ Technical Stack

- **Frontend:** React, Tailwind CSS (Forensic Aesthetic)
- **Backend:** Flask, Python (Memory Managed)
- **ML Engine:** Gemini 2.x Flash (Transformer-based LLM)
- **OCR/Parsing:** PyMuPDF (Tailored for Legal Hierarchies)

## 🛠️ Installation

### 1. Backend Setup
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # Mac
pip install -r requirements.txt
python app.py
```

### 2. Frontend Setup
```bash
cd dashboard
npm install
npm run dev
```

## 📜 Project Documentation
For a deep technical breakdown of the architecture and memory handling, see [Project_DeepDive.md](./Project_DeepDive.md).