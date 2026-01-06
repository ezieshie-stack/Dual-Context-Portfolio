# Dthrills Chatbot — Persona & Scenario Documentation

> **7 User Types × 10 Personas × 10 Scenarios = 700 Total Scenarios**

This directory contains comprehensive BA-style persona documentation for training the AI portfolio chatbot.

---

## Summary

| # | User Type | File | Personas | Scenarios |
|---|-----------|------|----------|-----------|
| 1 | Recruiters | [01-recruiters.md](./01-recruiters.md) | 10 | 100 |
| 2 | Hiring Managers | [02-hiring-managers.md](./02-hiring-managers.md) | 10 | 100 |
| 3 | Technical Interviewers | [03-technical-interviewers.md](./03-technical-interviewers.md) | 10 | 100 |
| 4 | QA Testers | [04-qa-testers.md](./04-qa-testers.md) | 10 | 100 |
| 5 | Project Recreators | [05-project-recreators.md](./05-project-recreators.md) | 10 | 100 |
| 6 | Potential Clients | [06-potential-clients.md](./06-potential-clients.md) | 10 | 100 |
| 7 | General Visitors | [07-general-visitors.md](./07-general-visitors.md) | 10 | 100 |
| | **TOTAL** | | **70** | **700** |

---

## Persona Structure

Each persona includes:

- **Demographics**: Name, age, role, company, reports to, education, location
- **Short Bio**: Narrative context about the persona
- **Goals**: What they're trying to achieve
- **Pain Points**: Their frustrations and challenges
- **Motivations**: Incentive, fear, growth, recognition
- **10 Scenarios**: Written from the persona's perspective, describing their workflow

---

## User Type Overview

### 1. Recruiters (10 Personas)
- Agency Tech Recruiter
- In-House Corporate Recruiter
- Executive Recruiter
- Startup Recruiter
- Contract Recruiter
- Healthcare Recruiter
- Financial Services Recruiter
- Government Recruiter
- Diversity Recruiter
- Technical Recruiter (Deep Tech)

### 2. Hiring Managers (10 Personas)
- VP of Analytics
- Data Science Manager
- Operations Director
- Product Manager
- Finance Manager
- Marketing Director
- Engineering Manager
- Customer Success Manager
- HR/People Analytics Lead
- Supply Chain Manager

### 3. Technical Interviewers (10 Personas)
- Senior Data Scientist
- Data Engineer
- ML Engineer
- Analytics Engineer
- Backend Engineer
- Frontend Engineer
- Security Engineer
- DevOps Engineer
- Database Administrator
- Staff/Principal Engineer

### 4. QA Testers (10 Personas)
- Manual QA Analyst
- Automation Engineer
- Data Quality Analyst
- Performance Tester
- Security Tester
- Accessibility Tester
- Mobile QA
- API Tester
- Database Tester
- ML/Model Tester

### 5. Project Recreators (10 Personas)
- Bootcamp Student
- Self-Taught Developer
- CS Student
- Career Switcher
- Data Analyst Upskilling
- Freelancer
- Startup Founder
- Educator/Teacher
- Hobbyist
- Open Source Contributor

### 6. Potential Clients (10 Personas)
- Startup CEO
- Operations Manager
- Marketing VP
- CFO
- Product Director
- HR Director
- Agency Owner
- Non-Profit Director
- Healthcare Administrator
- Retail/E-commerce Manager

### 7. General Visitors (10 Personas)
- Curious Browser
- Design Enthusiast
- Blogger/Journalist
- Networking Contact
- Former Colleague
- Competitor
- Family/Friend
- Student Researcher
- Investor/VC
- Bot/Spam (Rejection patterns)

---

## Response Guidelines

| User Type | Tone | Length | Priority CTAs |
|-----------|------|--------|---------------|
| Recruiter | Fast, scannable | Short bullets | Resume, schedule call |
| Hiring Manager | Structured, analytical | Medium | Project deep dives |
| Technical | Precise, honest | Variable depth | GitHub, methodology |
| QA Tester | Methodical, systematic | Detailed | Validation examples |
| Recreator | Encouraging, tutorial | Step-by-step | Resources, repos |
| Client | Professional, qualifying | Medium | Discovery call |
| Visitor | Warm, accessible | Short, jargon-free | Exploration, connect |

---

## Escalation Policy

The chatbot should escalate to "Email David directly" when asked about:
- Salary expectations or compensation
- Visa/work authorization status
- Specific availability or start dates
- Proprietary or client-specific data
- Pricing, rates, or contract terms
- Any topic where speculation would be inappropriate
