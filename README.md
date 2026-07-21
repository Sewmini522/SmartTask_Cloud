SmartTask ☁️✅

A cloud-based task management web application built on Microsoft Azure.

SmartTask lets users register, log in, and manage personal tasks — complete with due dates, file attachments, and due-soon reminder tracking — all hosted on real Azure cloud infrastructure.

---

📌 Introduction

In today's fast-paced world, people juggle work assignments, academic deadlines, personal errands, and appointments — and a significant share of people regularly forget daily tasks. Traditional solutions like paper to-do lists and basic phone reminders are passive; they only work if the user remembers to check them.

SmartTask was built as a practical project for a Cloud Application Development course, with the goal of designing a task manager that is genuinely cloud-native — not just a local app with a database bolted on, but a system built around Azure's managed services from the ground up.

---

❗ The Problem
Deadlines and appointments get forgotten across scattered tools — sticky notes, phone reminders, messaging apps.

Existing reminder apps are often too complex, or don't combine multiple alert channels.

Important documents attached to tasks have no structured, safe place to live.

A task list saved on one device isn't there when you need it on another.

---

✅ The Solution

SmartTask provides one central, cloud-hosted place to create, organize, and track tasks:


Secure registration and login (hashed passwords, token-based sessions)

A dashboard showing total, pending, and completed tasks at a glance

Add, edit, complete, and delete tasks with due dates and descriptions

Attach supporting documents (PDFs, images) directly to a task

Automatic detection of tasks due soon, laying the groundwork for automated reminders

Accessible from any device with a browser — nothing installed locally

---

☁️ Azure Services Used
Service                           |      Purpose                                                                       |
|---------------------------------|------------------------------------------------------------------------------------|
Azure App Service                 |      Hosts the Node.js backend and frontend as one live, publicly reachable web app|
Azure SQL Database	              |      Stores user accounts, tasks, due dates, statuses, and reminder flags          |
Azure Blob Storage	              |      Stores uploaded documents attached to tasks, kept separate from the database  |
Azure Logic Apps (in progress)	  |      Intended to check for due-soon tasks on a schedule and trigger email/SMS alerts|


ScreenShot

Azure Services
![image](https://github.com/user/repo/assets/xxxx)<img width="1917" height="857" alt="5" src="https://github.com/user-attachments/assets/2ad31514-51ec-409b-a139-cca223c44214" />


---

🛠️ Technologies Used

Backend

Node.js + Express
mssql (Tedious driver) for Azure SQL connectivity

bcrypt for password hashing

jsonwebtoken (JWT) for session authentication

multer + @azure/storage-blob for file uploads

Frontend

HTML5, CSS3, Bootstrap 5

Vanilla JavaScript (Fetch API)

Font Awesome icons

Database

Microsoft SQL Server Express (local development)
Azure SQL Database (production)

Database - User Table
![image](https://github.com/user/repo/assets/xxxx)<img width="1917" height="880" alt="1" src="https://github.com/user-attachments/assets/414bdbc1-3aa8-474e-ab86-fe4dbd536f35" />

Database - Task Table
![image](https://github.com/user/repo/assets/xxxx)<img width="1917" height="862" alt="2" src="https://github.com/user-attachments/assets/145b29f2-46ba-4e12-9053-0c2bb39087c5" />


Cloud & DevOps

Microsoft Azure (App Service, SQL Database, Blob Storage, Logic Apps)

Azure CLI

Git & GitHub


Blob Storage - Documents
![image](https://github.com/user/repo/assets/xxxx)<img width="1917" height="865" alt="4" src="https://github.com/user-attachments/assets/841ce958-6d76-4e64-865e-2209f390bfd8" />


---


⚙️ How It Works
User Authentication — A user registers with an email and password. Passwords are hashed with bcrypt before being stored in Azure SQL Database. On login, the server issues a JWT used to authenticate all further requests.

Task Management — Authenticated requests hit Express routes that read and write directly to Azure SQL Database: creating, editing, completing, and deleting tasks tied to the logged-in user.

File Attachments — When a task includes a file, the backend streams it to an Azure Blob Storage container and stores the resulting file URL alongside the task record in the database.

Reminder Detection — A backend endpoint queries Azure SQL for tasks due within a set window and not yet flagged as reminded — the data layer needed to drive automated alerts.

Hosting — The entire Node.js application (API + static frontend) is deployed to Azure App Service, making it reachable over the public internet rather than only running on a local machine.

---

Browser  →  Azure App Service (Node.js)  →  Azure SQL Database
                    →
             Azure Blob Storage

---


 📸 Screenshots
welcome page
![image](https://github.com/user/repo/assets/xxxx)<img width="1737" height="840" alt="19" src="https://github.com/user-attachments/assets/711ecc31-976a-41a4-90dc-aefbecebf185" />

Registration page
![image](https://github.com/user/repo/assets/xxxx)<img width="1817" height="857" alt="9" src="https://github.com/user-attachments/assets/7d4972a4-1fc3-406e-89af-f318e46c48ed" />

 Login page
 ![image](https://github.com/user/repo/assets/xxxx)<img width="1821" height="862" alt="11" src="https://github.com/user-attachments/assets/f940a49d-a91d-4a5d-9ae6-ee3c3f4722ac" />

Dashboard
![image](https://github.com/user/repo/assets/xxxx)<img width="1907" height="917" alt="6" src="https://github.com/user-attachments/assets/7711aae2-c134-4d8c-a96e-7ca1c235a54e" />

Add Task page
![image](https://github.com/user/repo/assets/xxxx)<img width="1820" height="866" alt="12" src="https://github.com/user-attachments/assets/f984974e-6e7e-4ec6-9bff-23805792f418" />

Edit/ Update Task page
![image](https://github.com/user/repo/assets/xxxx)<img width="1812" height="857" alt="16" src="https://github.com/user-attachments/assets/e8a2977c-4e90-4a4f-a083-35d7ad063e56" />

Reminder Message
![image](https://github.com/user/repo/assets/xxxx)<img width="1817" height="862" alt="18" src="https://github.com/user-attachments/assets/3fb21107-84d0-4523-84db-7eb3d2aabcbd" />

---

🌟 Benefits
Access anywhere — log in from any device with a browser

Fewer missed deadlines — automated due-date checks reduce reliance on memory alone

Safer data — hashed passwords, token-based sessions, managed cloud storage

Always up to date — one shared source of truth, no syncing files between devices

Cost-efficient — built and tested locally first, only provisioning Azure resources once development was complete

Scalable by design — the same architecture can grow to support more users without a redesign

---

🚀 Roadmap / Future Improvements

 Complete automated email/SMS reminder delivery via Azure Logic Apps
 
 Add push notifications
 
 Add task categories/labels and filtering
 
 Add unit and integration tests
 
 Set up CI/CD pipeline for automatic deployment on push

