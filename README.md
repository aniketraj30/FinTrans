💼 FinTrans – Finance Transformation Tracker

A robust financial transaction tracking system designed to process large-scale financial data with real-time analytics, anomaly detection, and high reliability.
This project uses Node.js, Python (FastAPI), and SQL to deliver seamless tracking of 5,000+ daily records with <200 ms latency — ensuring accuracy, compliance, and performance in financial auditing and reporting.

📌 Table of Contents

About

Features

Architecture

Tech Stack

Getting Started

How It Works

Dataset

Challenges Faced

Future Scope

Contact

📖 About

FinTrans simplifies financial operations by automating transaction tracking, enabling faster audits, and ensuring data accuracy through intelligent anomaly detection.
It integrates a microservices architecture for fault tolerance and uses machine learning for data insights — all while maintaining compliance and scalability.

The system integrates:

Node.js and FastAPI for backend APIs and distributed services

SQL databases for structured transaction data

NGINX for load balancing

Docker & CI/CD pipelines for scalable deployment

✨ Features

📊 Automated transaction processing for 5,000+ daily records
⚡ Real-time financial data ingestion with <200 ms latency
🧠 ML-powered anomaly and fraud detection
🧩 Microservices-based architecture with NGINX load balancing
🔄 CI/CD pipelines for continuous deployment and monitoring
🔐 Compliance-ready with secure authentication and logging

🧩 Architecture
+-------------+     +-------------------+     +-------------------+     +-------------------+
|  Frontend   | --> |  API Gateway      | --> |  Microservices     | --> |  SQL Database     |
+-------------+     +-------------------+     +-------------------+     +-------------------+
                                            ↑
                                            |
                                     [ML Anomaly Detection]

🛠 Tech Stack

Frontend: React, Tailwind CSS, Vite
Backend: Node.js, FastAPI, Express.js
Database: PostgreSQL, MySQL
AI / ML: Scikit-learn, Pandas, Python ML models
DevOps & Cloud: Docker, Kubernetes, AWS ECS, GitHub Actions
Load Balancer: NGINX
Testing & Monitoring: PyTest, Jest, Postman, Prometheus
Version Control: Git, GitHub
Python Version: 3.10+

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/aniketraj30/FinTrans
cd FinTrans

2️⃣ Install Requirements
pip install -r requirements.txt
npm install

3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

DB_HOST=your_database_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=fintrans_db

4️⃣ Run the Backend Services
uvicorn app:app --reload
node server.js


Visit API docs at:
👉 http://localhost:8000/docs

5️⃣ Run the Frontend
npm run dev

🧠 How It Works

1️⃣ Data Input: Transactions are uploaded or received from financial sources.
2️⃣ Processing: Backend services validate, clean, and store data securely.
3️⃣ ML Analysis: Models detect anomalies and generate audit insights.
4️⃣ Dashboard: Users can visualize transaction patterns and reports in real time.

📚 Dataset

FinTrans processes both real and synthetic datasets:

Simulated financial transaction logs

Labeled data for fraud/anomaly detection

Stored in SQL and cached in Redis for quick retrieval

⚠️ Challenges Faced

Maintaining low latency for large-scale data ingestion

Designing fault-tolerant microservices under heavy load

Ensuring audit compliance and transaction integrity

Integrating ML inference without performance degradation

🚧 Future Scope

📈 Integration with banking APIs (Plaid, Razorpay, Stripe)
🤖 Automated financial forecasting with LLMs
📱 Mobile-first dashboard with real-time alerts
💾 Data lake integration for long-term analytics
🧾 Role-based admin panel for auditors and finance teams

📬 Contact

Aniket Raj
📞 +91 7979024295
📧 rjaniket30@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/aniket-raj-3a8410231/

💻 GitHub: https://github.com/aniketraj30
