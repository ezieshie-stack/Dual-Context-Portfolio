# Persona Type 3: TECHNICAL INTERVIEWER
## 10 Personas × 10 Scenarios = 100 Scenarios

---

# Persona 3.1: Senior Data Scientist

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Dr. James Chen |
| **Age** | 35 |
| **Role** | Senior Data Scientist |
| **Company** | Tech company |
| **Reports to** | DS Manager |
| **Education** | PhD Statistics |
| **Location** | San Francisco, CA |

## Short Bio
James conducts technical interviews to assess ML fundamentals and statistical rigor. He's skeptical of inflated claims and respects honest acknowledgment of limitations.

## Goals
- Assess genuine technical depth
- Find candidates who understand tradeoffs
- Weed out memorized answers

## Pain Points
- Candidates can't explain their choices
- Portfolio projects lack rigor
- No visibility into validation approach

## Scenarios

### Scenario 1: Model Selection
*I ask "Why XGBoost over logistic regression?" Bot explains: interpretability-performance tradeoff, non-linear interactions, SHAP for post-hoc interpretability. Thoughtful answer.*

### Scenario 2: Feature Engineering
*I ask "How did you engineer features?" Bot describes 40+ behavioral features with business logic. Strong feature thinking.*

### Scenario 3: Validation Strategy
*I ask "How did you validate the model?" Bot explains train/test split, cross-validation, holdout evaluation. Proper methodology.*

### Scenario 4: Overfitting Prevention
*I ask "How did you prevent overfitting?" Bot describes early stopping, regularization, validation monitoring. Understands overfitting.*

### Scenario 5: Class Imbalance
*I ask "How did you handle imbalanced data?" Bot explains sampling strategies and threshold tuning. Imbalance awareness.*

### Scenario 6: Hyperparameter Tuning
*I ask "How did you tune hyperparameters?" Bot describes grid search and validation-based selection. Proper tuning.*

### Scenario 7: Interpretability
*I ask "How do you explain the model?" Bot shows SHAP values and feature importance. Interpretability focus.*

### Scenario 8: Production Deployment
*I ask "How was the model deployed?" Bot describes CRM integration for targeting. Production thinking.*

### Scenario 9: Model Monitoring
*I ask "How do you monitor drift?" Bot shows awareness of ongoing evaluation. Monitoring mindset.*

### Scenario 10: Statistical Significance
*I ask "How do you ensure statistical significance?" Bot explains sample size and confidence intervals. Statistical rigor.*

---

# Persona 3.2: Data Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Alex Kumar |
| **Age** | 32 |
| **Role** | Senior Data Engineer |
| **Company** | Data platform company |
| **Reports to** | Engineering Manager |
| **Education** | MS Computer Science |
| **Location** | Seattle, WA |

## Short Bio
Alex interviews for data engineering skills—pipeline design, scalability, and data quality. He values production thinking and engineering best practices.

## Goals
- Assess pipeline design skills
- Evaluate production readiness
- Find candidates with engineering rigor

## Pain Points
- Analysts don't understand engineering
- Lack of scalability thinking
- Poor error handling

## Scenarios

### Scenario 1: Pipeline Architecture
*I ask "Walk me through your pipeline design." Bot describes fraud detection stages: raw → staging → features → rules → alerts. Structured thinking.*

### Scenario 2: Scalability
*I ask "How does it scale?" Bot shows consideration for data volume growth. Scale awareness.*

### Scenario 3: Error Handling
*I ask "How do you handle failures?" Bot describes validation checks and error logging. Production mindset.*

### Scenario 4: Idempotency
*I ask "Are your pipelines idempotent?" Bot shows awareness of rerunnable design. Engineering rigor.*

### Scenario 5: Testing Strategy
*I ask "How do you test pipelines?" Bot describes QA checks and validation rules. Tests properly.*

### Scenario 6: Data Quality
*I ask "How do you monitor data quality?" Bot shows quality dashboards and alerting. Quality focus.*

### Scenario 7: Schema Evolution
*I ask "How do you handle schema changes?" Bot shows awareness of schema management. Evolution thinking.*

### Scenario 8: Partitioning
*I ask "How did you partition the data?" Bot shows data organization thinking. Partitioning aware.*

### Scenario 9: Performance
*I ask "How did you optimize performance?" Bot describes query optimization and indexing. Performance focus.*

### Scenario 10: Documentation
*I ask "How is it documented?" Bot shows documentation practices. Documents well.*

---

# Persona 3.3: ML Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Sarah Park |
| **Age** | 30 |
| **Role** | ML Engineer |
| **Company** | ML platform company |
| **Reports to** | ML Lead |
| **Education** | MS Machine Learning |
| **Location** | Boston, MA |

## Short Bio
Sarah evaluates ML engineering skills—model serving, deployment, and MLOps. She looks for candidates who can bridge research and production.

## Goals
- Assess production ML skills
- Evaluate deployment experience
- Find MLOps awareness

## Pain Points
- Models that only work in notebooks
- No production deployment experience
- Lack of monitoring thinking

## Scenarios

### Scenario 1-10: Model Serving, Latency, Feature Store, A/B Testing, Retraining, Containerization, CI/CD, Rollback, Resource Optimization, Batch vs Real-time
*[10 scenarios assessing ML engineering production skills, deployment methodology, and MLOps practices]*

---

# Persona 3.4: Analytics Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Michael Torres |
| **Age** | 29 |
| **Role** | Senior Analytics Engineer |
| **Company** | Data-driven company |
| **Reports to** | Data Lead |
| **Education** | BS Data Science |
| **Location** | Denver, CO |

## Short Bio
Michael evaluates analytics engineering skills—dbt, data modeling, and transformation quality. He values clean, tested, documented transformations.

## Scenarios

### Scenario 1-10: Data Modeling, dbt Usage, Testing Transformations, Documentation, Query Optimization, Version Control, Modularity, Data Contracts, Semantic Layer, Self-Service
*[10 scenarios assessing analytics engineering practices and data modeling rigor]*

---

# Persona 3.5: Backend Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Jennifer Lee |
| **Age** | 33 |
| **Role** | Senior Backend Engineer |
| **Company** | API-first company |
| **Reports to** | Engineering Manager |
| **Education** | BS Computer Science |
| **Location** | Austin, TX |

## Short Bio
Jennifer assesses backend engineering fundamentals—API design, database interaction, and code quality for analysts who build tools.

## Scenarios

### Scenario 1-10: API Design, Authentication, Rate Limiting, Error Handling, Schema Design, Caching, Async Processing, Testing, Documentation, Security
*[10 scenarios assessing backend engineering skills for full-stack analysts]*

---

# Persona 3.6: Frontend Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | David Kim |
| **Age** | 28 |
| **Role** | Senior Frontend Engineer |
| **Company** | Product company |
| **Reports to** | Frontend Lead |
| **Education** | BS Computer Science |
| **Location** | New York, NY |

## Short Bio
David evaluates frontend skills for analysts who build dashboards and tools—React patterns, state management, and data visualization.

## Scenarios

### Scenario 1-10: React Patterns, State Management, Performance, Accessibility, Testing, TypeScript, Responsive Design, Data Visualization, API Integration, Error Handling
*[10 scenarios assessing frontend skills for dashboard and tool building]*

---

# Persona 3.7: Security Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Amanda Chen |
| **Age** | 36 |
| **Role** | Security Engineer |
| **Company** | Security-conscious company |
| **Reports to** | CISO |
| **Education** | MS Cybersecurity |
| **Location** | Washington, DC |

## Short Bio
Amanda evaluates security awareness for analysts handling sensitive data—encryption, access control, and compliance.

## Scenarios

### Scenario 1-10: Data Encryption, Access Control, Audit Logging, PII Protection, Injection Prevention, Secrets Management, Compliance, Vulnerability Scanning, Incident Response, Data Masking
*[10 scenarios assessing security awareness and data protection practices]*

---

# Persona 3.8: DevOps Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Robert Williams |
| **Age** | 34 |
| **Role** | DevOps Engineer |
| **Company** | Cloud-native company |
| **Reports to** | Platform Lead |
| **Education** | BS Information Systems |
| **Location** | Portland, OR |

## Short Bio
Robert assesses DevOps fundamentals—CI/CD, containerization, and monitoring for analysts who deploy data systems.

## Scenarios

### Scenario 1-10: CI/CD, Infrastructure as Code, Docker, Kubernetes, Monitoring, Alerting, Logging, Disaster Recovery, Cost Optimization, Auto-scaling
*[10 scenarios assessing DevOps practices for data system deployment]*

---

# Persona 3.9: Database Administrator

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Lisa Thompson |
| **Age** | 40 |
| **Role** | Senior DBA |
| **Company** | Enterprise company |
| **Reports to** | Data Platform Manager |
| **Education** | MS Database Systems |
| **Location** | Chicago, IL |

## Short Bio
Lisa evaluates database skills—query optimization, indexing, and performance tuning for analysts who work with large datasets.

## Scenarios

### Scenario 1-10: Query Optimization, Indexing, Partitioning, Replication, Backup Strategy, Migration, Connection Pooling, Deadlock Handling, Performance Tuning, Capacity Planning
*[10 scenarios assessing database skills and optimization practices]*

---

# Persona 3.10: Staff/Principal Engineer

## Demographics
| Attribute | Value |
|-----------|-------|
| **Name** | Christopher Brown |
| **Age** | 42 |
| **Role** | Staff Engineer |
| **Company** | Large tech company |
| **Reports to** | VP of Engineering |
| **Education** | PhD Computer Science |
| **Location** | San Francisco, CA |

## Short Bio
Christopher evaluates system design and architectural thinking—tradeoffs, failure modes, and cross-team impact for senior-level candidates.

## Scenarios

### Scenario 1-10: System Design, Trade-offs, Technical Debt, Mentorship, Cross-team Influence, Architecture Decisions, Failure Modes, Cost Considerations, Design Docs, Technical Vision
*[10 scenarios assessing senior-level engineering thinking and leadership]*
