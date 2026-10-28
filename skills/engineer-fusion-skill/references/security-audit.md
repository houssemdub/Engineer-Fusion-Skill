# Security Auditing & Threat Modeling Protocol

Rigorous security guidelines and automated verification routines covering OWASP Top 10, OWASP LLM Top 10, trust boundaries, and supply chain integrity.

---

## 1. Threat Modeling First (STRIDE)

Before implementing or reviewing sensitive logic (authentication, payment, data ingestion, file operations, permissions), execute a STRIDE analysis:

| Threat | Definition | Engineering Defense |
|---|---|---|
| **S**poofing | Impersonating an entity | Cryptographic authentication, secure session tokens, mTLS |
| **T**ampering | Modifying code or data | Cryptographic signatures, integrity checks, parameterization |
| **R**epudiation | Denying performed actions | Structured audit logs with immutable timestamps and correlation IDs |
| **I**nformation Disclosure | Exposing private data | Strict data classification, field-level encryption, no secrets in logs |
| **D**enial of Service | Exhausting resources | Rate limiting, memory & payload caps, timeouts, backpressure |
| **E**levation of Privilege | Unprivileged gaining access | Explicit RBAC/ABAC on every request boundary, principle of least privilege |

---

## 2. Trust Boundaries & Input Validation

1. **The Boundary Law**:
   - Everything crossing into the application is **untrusted**: HTTP query params, request bodies, cookies, headers, file uploads, webhooks, third-party API payloads, and **LLM outputs**.
   - Validate and sanitize at the outer boundary using strict schema validation (e.g. Zod, Pydantic, ArkType).
   - Internal functions assume clean data contracts; boundary functions reject malformed input immediately.
2. **LLM Output is Untrusted Input**:
   - Never pipe raw LLM completions directly into shell commands (`exec`, `system`), SQL queries, file paths, or browser DOM rendering (`innerHTML`).
   - Treat AI-generated code or text with the same scrutiny as user-submitted input.

---

## 3. Top Security Vulnerabilities & Hardening

### Injection & Data Access
- **SQL / NoSQL Injection**: 100% parameterized queries or type-safe query builders. Raw string concatenation in queries is strictly prohibited.
- **Command Injection**: Avoid shell execution whenever possible; use array arguments (`execFile(['git', 'status'])`) without invoking an intermediate shell.
- **SSRF (Server-Side Request Forgery)**:
  - Whitelist allowed protocols (`https:` only).
  - Resolve DNS before request and explicitly reject loopback (`127.0.0.1`), private RFC1918 blocks (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), and link-local cloud metadata endpoints (`169.254.169.254`).
  - Disable HTTP redirect following on untrusted URLs.

### Authentication & Sessions
- **Password Storage**: Argon2id or bcrypt (cost factor $\ge 12$). Never plain hashes (MD5, SHA1, SHA256).
- **Session Tokens**: Set `httpOnly`, `Secure`, and `SameSite=Lax` (or `Strict`) on all auth cookies.
- **Rate Limiting**: Mandatory on authentication, password reset, and sensitive endpoints (~5–10 requests / 15 minutes). Back by a shared memory store (Redis) in clustered deployments.

### Secret Exposure
- Zero secrets in source code, commit history, or client bundles.
- Read credentials strictly from runtime environment variables.
- Maintain a sanitized `.env.example` file with dummy values.
- Scan diffs for leaked API keys, tokens, and private keys before every commit.

---

## 4. Supply Chain & Dependency Hardening

1. **Zero-Trust Package Installation**:
   - Block or audit `postinstall` lifecycle scripts on newly introduced packages (`npm install --ignore-scripts`).
   - Audit dependencies using official scanners (`npm audit`, `osv-scanner`, `cargo audit`, `pip-audit`).
2. **Lockfile Integrity**:
   - Never hand-edit lockfiles (`package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`).
   - Commit lockfiles to version control; run reproducible builds (`npm ci`).
3. **One Dependency Per Change**:
   - Never bundle a dependency addition with structural feature logic. Review each dependency's license, author, and maintenance status independently.
