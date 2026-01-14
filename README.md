# ⚖️ OpticLoan: Precision Document Auditing

OpticLoan is a state-of-the-art **Forensic Intelligence Platform** designed to protect borrowers by deconstructing complex loan agreements. It utilizes advanced Neural Networks and optimized memory orchestration to identify predatory "trap clauses" hidden in large legal documents.

## 🚀 Key Features

- **Forensic Fact Extraction:** Distills 50+ page documents into core financial markers (APR, Penalties, Dates).
- **Trap Auditing:** Identifies escalation clauses, acceleration triggers, and cross-default traps.
- **Explainable AI:** Provides clear legal reasoning for every risk detected.
- **Memory-Optimized Pipeline:** Custom cloud-native orchestration that allows auditing of massive documents without local lag or OOM errors.

## 🧠 The Forensic Core
OpticLoan uses specific **Transformer-based Neural Networks** (Google Gemini Flash Series) to audit documents. Unlike a simple text scanner, it employs:
1. **Multi-Head Self-Attention:** This specific neural mechanism allows the system to correlate distant clauses (e.g., page 5 vs page 105) to find legal contradictions.
2. **Isolated Garbage Collection:** Explicit RAM purging after digitization to prevent OOM errors on large files.
3. **Constrained Decoding:** Forces the neural network into a deterministic JSON schema, ensuring 100% data integrity and zero hallucinations.
4. **2.0M Context Window:** Entire document analysis in a single unified stream for forensic precision.

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