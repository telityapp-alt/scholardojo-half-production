# BRIEF TOTAL EKSEKUSI: FOUNDATION REBUILD

**Kirim ini ke AI setiap kali mau build / coding session baru.**

---

## SYSTEM INSTRUCTION (WAJIB DIBACA SETIAP SESSION)

Kita sedang membangun satu platform inti berskala besar dengan arsitektur production-grade dan foundation-first. Sistem terdiri dari multiple domain terisolasi (Student, Intern, Scholar) dengan aturan, data, dan istilah yang tidak boleh saling bocor. Engine aplikasi bersifat domain-agnostic dan tidak boleh mengandung conditional logic berbasis domain; seluruh perilaku domain hanya ditentukan melalui konfigurasi dan adapter layer. Tidak boleh ada duplikasi logika lintas domain. Semua fitur harus delete-friendly, modular, dan siap di-spin-off per domain tanpa refactor besar. Routing menggunakan React Router saja. AI diperlakukan sebagai engine pendukung non-otoritatif, selalu dipanggil melalui domain ruleset yang eksplisit, tidak boleh mengambil keputusan bisnis final, dan harus dioptimalkan untuk efisiensi biaya (minimize calls, deterministic first). Fokus hanya pada fitur, logic, dan arsitektur — bukan styling. Tujuan sistem adalah stabil, scalable, anti-bug, dan dapat tumbuh jangka panjang tanpa chaos atau spaghetti logic.

---

## ARCHITECTURE LAWS (TIDAK BOLEH DILANGGAR)

### 1. Domain Isolation
- ❌ **DILARANG**: `if (domain === 'student')` di komponen atau feature
- ❌ **DILARANG**: Cross-domain data access langsung
- ❌ **DILARANG**: Shared mutable state antar domain
- ✅ **WAJIB**: Semua perbedaan lewat Domain Contract (config)
- ✅ **WAJIB**: Data filtering hanya di Data Access Layer

### 2. Engine Purity
- ❌ **DILARANG**: Engine mengandung kata "student", "intern", "scholar", "campus", "company"
- ❌ **DILARANG**: Engine membuat keputusan domain-specific
- ✅ **WAJIB**: Engine hanya menerima config sebagai parameter
- ✅ **WAJIB**: Engine generic, reusable untuk semua domain

### 3. Feature Independence
- ❌ **DILARANG**: Feature import feature lain
- ❌ **DILARANG**: Feature tahu konteks domain langsung
- ✅ **WAJIB**: Feature registered di Feature Registry
- ✅ **WAJIB**: Feature hanya consume contract & data dari props

### 4. AI Safety
- ❌ **DILARANG**: AI call langsung dari UI component
- ❌ **DILARANG**: AI response dijadikan source of truth tanpa validation
- ✅ **WAJIB**: AI call lewat Orchestration Layer
- ✅ **WAJIB**: AI context di-inject oleh Domain Contract
- ✅ **WAJIB**: AI cost guard (rate limit, token limit, frequency check)

---

## FOLDER STRUCTURE (DOMAIN-DRIVEN)

```
src/
├── core/
│   ├── contracts/          # Domain Contract Layer
│   │   ├── domainConfig.ts # STUDENT_CONFIG, INTERN_CONFIG, SCHOLAR_CONFIG
│   │   ├── entityMap.ts    # HostEntity, Program, Vault abstraction
│   │   └── featureRegistry.ts
│   ├── engines/            # Domain-agnostic engines
│   │   ├── tagEngine.ts    # Super Tag logic
│   │   ├── levelEngine.ts  # XP, Streak, Progress
│   │   ├── rankEngine.ts   # Comparison, Scoring
│   │   └── aiEngine.ts     # AI Orchestration
│   └── access/             # Data Access Layer
│       ├── useDomainData.ts
│       ├── programAccess.ts
│       └── hostAccess.ts
├── features/               # Generic features (domain-blind)
│   ├── vault/              # Generic "collection" feature
│   ├── tracker/            # Generic "kanban" feature
│   ├── curriculum/         # Generic "roadmap" feature
│   └── admission/          # Generic "application" feature
├── services/               # External integration
│   ├── geminiService.ts
│   └── storageService.ts
└── App.tsx                 # Router Orchestrator ONLY
```

---

## COMPLETED PHASES (STATUS REPORT)

### ✅ PHASE 1: DOMAIN CONTRACT LAYER
- Created `core/contracts/domainConfig.ts`
- Created `core/contracts/entityMap.ts`
- Created `core/contracts/featureRegistry.ts`
- **Result**: Centralized configuration for Student, Intern, and Scholar domains.

### ✅ PHASE 2: ENTITY ABSTRACTION
- Defined `GenericProgram`, `GenericStat`, `NavigationItem` in `entityMap.ts`.
- **Result**: Unified schema across all domains.

### ✅ PHASE 3: DATA ACCESS LAYER
- Created `core/access/useDomainData.ts`.
- **Result**: Hard boundary for data access. Mock data moved behind a hook.

---

## PENDING PHASES

### PHASE 4: AI ORCHESTRATION LAYER
**Goal**: AI dikandangkan, tidak liar.
- Create `core/engines/aiEngine.ts`

### PHASE 5: FEATURE REGISTRY EXPANSION
**Goal**: Fitur terdaftar, tidak liar.
- Expand `core/contracts/featureRegistry.ts` to support dynamic routing.

### PHASE 6: FEATURE SKELETON
**Goal**: Rangka fitur, bukan isi.
- Create `features/vault/VaultList.tsx`
- Create `features/vault/VaultDetail.tsx`

---

## PROMPT TEMPLATE HARIAN

Kirim ini setiap mulai coding session:

```
Kita lanjut build [PHASE_NAME]. 
Ingat: foundation-first, domain-isolated, config-driven.
Jangan bikin logic domain di komponen.
Jangan bikin AI call langsung.
Jangan bikin cross-domain access.
[TASK SPECIFIC]
```
