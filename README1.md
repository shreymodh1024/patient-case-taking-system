# Patient Case Taking System

An AI-assisted patient case-taking system designed to streamline the initial patient registration and history-taking process in government hospitals. The system is intended to reduce waiting time, simplify OPD workflows, and provide doctors with a structured summary of the patient's responses before consultation.

## 🚀 Live Prototype

**Live App:** https://patient-case-taking-system.lovable.app/

**GitHub Repository:** https://github.com/shreymodh1024/patient-case-taking-system

---

## 📌 Problem Statement

Government hospital OPDs often involve long queues, repetitive manual data entry, paper-based records, and limited time for doctors to collect a complete patient history.

A patient may have to move through multiple counters and repeatedly provide the same information before reaching the doctor. This creates delays for both patients and hospital staff.

The Patient Case Taking System aims to digitize and automate the initial case-taking workflow so that the patient's basic information, symptoms, medical history, and relevant documents can be collected before the doctor consultation.

---

## 💡 Proposed Solution

The system provides a patient-facing digital interface where a patient can:

- Authenticate using an **ABHA ID**
- Interact with an AI/chatbot-based case-taking assistant
- Describe symptoms and health concerns conversationally
- Provide information in a structured manner
- Upload previous medical reports
- Use OCR to extract useful information from uploaded reports
- Receive a summarized case that can be reviewed by the doctor
- Reduce repetitive questioning and manual paperwork at the OPD

The system is designed with multilingual and conversational interaction in mind, making it more accessible to patients who may be more comfortable communicating in regional languages.

---

## ✨ Key Features

### 🏥 Digital Patient Case Taking
Collects relevant patient information through a guided digital conversation before the consultation.

### 🤖 AI-Assisted Conversation
A chatbot assistant guides the patient through symptom and medical-history questions and helps organize the responses.

### 🪪 ABHA ID Authentication
ABHA ID is proposed as the primary patient authentication mechanism, helping associate the case with the patient's digital health identity.

> **Note:** ABHA integration in the prototype may be represented as a concept/prototype flow and should be connected to an authorized ABDM/ABHA integration for production deployment.

### 📄 Medical Report OCR
Patients can upload previous medical reports. OCR can extract text from reports so that relevant information can be summarized for the doctor.

### 📝 Doctor-Friendly Summary
Collected information can be converted into a structured patient case summary, reducing the amount of time a doctor needs to spend on initial history collection.

### 🌐 Multilingual Interaction
The project is intended to support multilingual interaction, including Indian languages, to improve accessibility.

### 🗣️ Speech Interaction
The system can be extended with speech-to-text and text-to-speech services to support conversational voice interaction.

### 🖥️ Kiosk-Based Deployment
The concept is suitable for deployment on hospital kiosks equipped with:

- Touchscreen/display
- Linux-based operating system
- Health-screening sensors
- Other kiosk-specific hardware

---

## 🧑‍💻 Technology Stack

The prototype uses a modern web application architecture.

### Frontend

- HTML
- CSS
- TypeScript
- Modern web UI components

### Backend / Data Layer

- PostgreSQL
- AI chatbot/API integration
- Programming languages such as C++ and Java can be used for supporting services and hardware integration.

### AI & Document Processing

- AI chatbot / conversational assistant API
- OCR API for medical-document text extraction
- Text-to-speech / speech services for conversational interaction

### Hardware

The proposed kiosk can integrate:

- Health screening sensors
- Touchscreen/display
- Camera/scanner for document capture
- Microphone and speaker
- Linux OS
- Kiosk-specific peripheral hardware

---

## 🏗️ High-Level Architecture

```text
                    ┌───────────────────────┐
                    │       Patient         │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Hospital Kiosk /    │
                    │      Web Interface    │
                    └───────────┬───────────┘
                                │
                 ┌──────────────┼──────────────┐
                 │              │              │
                 ▼              ▼              ▼
          ┌───────────┐  ┌────────────┐  ┌─────────────┐
          │ ABHA ID   │  │ AI Case    │  │ Medical     │
          │ Auth      │  │ Taking     │  │ Report OCR  │
          └───────────┘  └─────┬──────┘  └──────┬──────┘
                               │                │
                               └───────┬────────┘
                                       ▼
                             ┌──────────────────┐
                             │ Structured Case  │
                             │ + Report Summary │
                             └────────┬─────────┘
                                      │
                                      ▼
                             ┌──────────────────┐
                             │     Doctor       │
                             │    Consultation  │
                             └──────────────────┘
```

---

## 🔄 Expected Workflow

1. Patient arrives at the hospital OPD.
2. Patient uses the kiosk/web application.
3. Patient authenticates using their ABHA ID.
4. The system begins a guided case-taking conversation.
5. The patient provides symptoms and relevant medical history.
6. The system asks follow-up questions based on the patient's responses.
7. The patient can upload previous medical reports.
8. OCR extracts information from uploaded documents.
9. The AI system organizes the collected information.
10. A concise structured case summary is prepared for the doctor.
11. The doctor reviews the information and performs the actual medical consultation.
12. The doctor remains responsible for diagnosis and treatment decisions.

---

## 📄 Medical Report Processing

The proposed report-processing pipeline is:

```text
Patient uploads report
        │
        ▼
   File validation
        │
        ▼
       OCR
        │
        ▼
 Extracted text
        │
        ▼
 AI summarization
        │
        ▼
 Structured medical summary
        │
        ▼
 Doctor review
```

The OCR system should be treated as an information-extraction aid rather than a diagnostic system. Extracted information should be verified against the original document.

---

## 🎯 Impact

The project aims to provide:

### Social Benefits

- Easier access to healthcare workflows
- Better accessibility for patients with limited digital literacy
- Support for regional-language interaction
- Reduced patient frustration caused by repetitive registration procedures

### Economic Benefits

- Reduced administrative workload
- More efficient utilization of doctor time
- Lower dependence on paper-based documentation
- Potentially shorter OPD processing times

### Operational Benefits

- Structured patient information
- Faster initial history collection
- Better availability of previous medical information
- Reduced repetitive data entry
- Improved consistency of case documentation

### Environmental Benefits

- Reduced paper usage
- Digital storage and processing of medical information

---

## ⚠️ Challenges & Risk Mitigation

### ABHA Availability

Not every patient may have an ABHA ID.

**Possible approach:** The system can initially support an alternative registration mechanism while encouraging ABHA adoption as the digital-health ecosystem develops.

### Digital Literacy

Some patients may not be comfortable using a touchscreen or chatbot.

**Possible approach:**

- Simple UI
- Large buttons
- Voice guidance
- Regional-language support
- Assisted kiosk mode

### Language & Speech Accuracy

Speech recognition and text-to-speech can vary across languages, accents, and environments.

**Possible approach:**

- Combine voice interaction with text input
- Provide confirmation screens
- Support multiple language APIs
- Allow staff-assisted correction

### OCR Errors

Old, handwritten, damaged, or low-quality reports may produce inaccurate OCR output.

**Possible approach:**

- Display extracted information for verification
- Preserve the original document
- Clearly mark uncertain information
- Keep doctor verification in the loop

### Patient Data Privacy

Medical information is highly sensitive.

**Possible approach:**

- Strong authentication
- Encryption in transit and at rest
- Role-based access
- Minimal data collection
- Audit logging
- Compliance with applicable Indian healthcare and data-protection requirements

### AI Reliability

An AI assistant can misunderstand a patient's response or incorrectly summarize information.

**Possible approach:**

- Use AI primarily for structured information collection and summarization
- Avoid autonomous diagnosis
- Provide the original patient responses to clinicians
- Require doctor review before clinical decisions

---

## 🔐 Security & Privacy Considerations

For a production deployment, the application should implement:

- Secure authentication
- HTTPS/TLS
- Encryption of sensitive data
- Role-based access control
- Secure API key management
- Server-side validation
- Audit trails
- Secure file-upload validation
- Malware scanning for uploaded files
- Appropriate retention/deletion policies
- Compliance with applicable healthcare and privacy regulations

**Never expose API keys or database credentials in frontend source code.**

---

## 🧪 Current Prototype

The current prototype demonstrates the core user experience and concept of the proposed system.

It can be accessed here:

**https://patient-case-taking-system.lovable.app/**

The GitHub repository containing the project source is:

**https://github.com/shreymodh1024/patient-case-taking-system**

---

## 🛠️ Local Development

Clone the repository:

```bash
git clone https://github.com/shreymodh1024/patient-case-taking-system.git
cd patient-case-taking-system
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL displayed by the development server, typically:

```text
http://localhost:5173
```

> The exact commands and environment variables may vary depending on the current repository configuration. Refer to the repository's package configuration and source files if the project has additional setup requirements.

---

## 🔑 Environment Variables

If external APIs are used, store credentials in environment variables rather than hard-coding them into the application.

Example:

```env
VITE_API_BASE_URL=
VITE_AI_API_KEY=
VITE_OCR_API_KEY=
VITE_TTS_API_KEY=
DATABASE_URL=
```

Only variables that are actually required by the implementation should be configured.

> **Security warning:** Variables prefixed with `VITE_` are generally exposed to client-side code in Vite applications. Sensitive secrets such as private API keys and database credentials should be handled by a secure backend/server-side function instead.

---

## 📁 Suggested Project Structure

```text
patient-case-taking-system/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── lib/
│   └── ...
├── package.json
├── README.md
├── .env.example
└── ...
```

The exact structure may differ from the current implementation.

---

## 🔮 Future Scope

Possible future improvements include:

- Full ABHA/ABDM integration
- Hospital information-system integration
- Doctor dashboard
- Queue/token management
- Appointment management
- Real-time multilingual voice conversation
- More robust OCR for handwritten reports
- Automated vital-sign collection through sensors
- Patient medical-history retrieval with appropriate authorization
- Offline/low-connectivity kiosk support
- Analytics for hospital administrators
- Accessibility features for elderly and differently abled patients
- Integration with electronic health record systems

---

## 👥 Intended Users

- Patients visiting government hospitals
- OPD registration staff
- Doctors
- Nurses and healthcare workers
- Hospital administrators

---

## ⚕️ Medical Disclaimer

This project is a **healthcare workflow and patient case-taking prototype**. It is not intended to independently diagnose diseases or prescribe treatment.

AI-generated information, OCR output, and patient-entered information must be reviewed by qualified healthcare professionals before being used for clinical decision-making.

---

## 📚 References & Research Areas

The project is based on research and exploration around:

- Digital healthcare and electronic health records
- ABHA / ABDM ecosystem
- AI-assisted healthcare workflows
- OCR-based medical document processing
- Conversational AI
- Multilingual speech technologies
- Government hospital OPD workflow optimization
- Healthcare kiosk systems

For implementation, production deployments should rely on current official documentation and applicable healthcare regulations.

---

## 📜 License

Add the project's intended open-source license here, for example MIT, Apache-2.0, or another license selected by the project owners.

Until a license is explicitly added to the repository, users should not assume that the source code is licensed for unrestricted reuse.

---

## ⭐ Project

**Patient Case Taking System**

A digital-first approach to making the initial government-hospital OPD experience faster, more structured, and more patient-friendly.
