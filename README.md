# 🧪 RudderStack SDET Automation Framework

This repository contains a basic test automation framework for validating essential RudderStack flows using **WebdriverIO**, **CucumberJS**, and **JavaScript**. The framework is environment-configurable and integrates with GitHub Actions to run scheduled test executions.

---


## 🧰 Tech Stack

| Tool              | Purpose                             |
|-------------------|-------------------------------------|
| WebdriverIO       | UI automation                       |
| CucumberJS        | BDD and test runner                 |
| Dotenv            | Environment config management       |
| Axios             | API request handling                |
| GitHub Actions    | CI/CD and daily test automation     |
| Node.js (v18+)    | Runtime                             |

---


---

## ⚙️ Environment Configuration

Create `.env` files for each environment (`dev`, `qa`, `prod`). Example:

### `.env.dev`

```env
BASE_URL=https://app.rudderstack.com
QA_USER=your-temp-business-testemail@example.com
QA_PASSWORD=yourSecurePassword123

//run cmd
npx wdio
