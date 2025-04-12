# 🧠 AI Command Agent

This project is an **AI-powered command agent** that automates local development tasks via terminal commands. It uses a free-tier AI API (like OpenAI or open-source models) to interpret natural language tasks, convert them into actionable plans, execute those commands, and retry on failure.

---

## 🛠 Tech Stack
- Node.js
- TypeScript / JavaScript
- OpenAI (Free-tier or compatible local models)
- readline / fs / child_process

---

## ⚙️ Features
- Chat-like command interface
- Plans tasks using AI
- Seeks user confirmation before execution
- Executes terminal commands locally
- Handles task failures and retries with improved prompts

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/bhanu2209/actron-task-pilot.git
cd actron-task-pilot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment
Create a `.env` file and add your API key:
```
OPENAI_API_KEY=your_key_here
```

### 4. Run the Agent
```bash
node ai-command-agent.js
```

---

## 🧪 Example Task Flow

1. **You:** "Create a simple Node.js Hello World server"
2. **Agent:** Suggests plan, shows commands.
3. **You:** Approve.
4. **Agent:** Executes, confirms success.
5. **You:** Report success or request retry.

---

## 🔐 Security Warning
This agent executes terminal commands. Only run trusted prompts on secure systems. Use responsibly.

---

## 🧩 Future Enhancements
- VSCode extension support
- Built-in prompt templates
- Error analysis and auto-debugging
- Git integration for tracking changes

---

## 📄 License
MIT License

---

Built with 💻 and AI to streamline local development workflows.
