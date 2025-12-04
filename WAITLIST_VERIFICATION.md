# Checklist Verifica Pre-Lancio Waiting List

## ✅ Modifiche Codice Completate

- [x] Rate limiting implementato (3 richieste per IP ogni 15 minuti)
- [x] Validazione email migliorata con regex RFC 5322
- [x] Sanitizzazione input per prevenire injection
- [x] Logging strutturato degli errori con request ID
- [x] Link unsubscribe rimosso, sostituito con link Privacy Policy
- [x] Gestione errori migliorata con distinzione tra errori temporanei e permanenti

## 🔍 Verifiche Necessarie (Da Fare Manualmente)

### 1. Variabili d'Ambiente su Vercel

Verifica che queste variabili siano configurate nel dashboard Vercel:

**Obbligatorie:**
- [ ] `RESEND_API_KEY` - API key di Resend (formato: `re_...`)
- [ ] `RESEND_FROM_EMAIL` - Email mittente dopo verifica dominio (formato: `Keepfa.st <hello@keepfa.st>`)

**Opzionali (per analytics):**
- [ ] `NEXT_PUBLIC_POSTHOG_KEY` - PostHog API key (formato: `phc_...`)
- [ ] `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host (es: `https://eu.i.posthog.com`)

**Come verificare:**
1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il progetto `keepfast-landing`
3. Vai su **Settings** → **Environment Variables**
4. Verifica che tutte le variabili siano presenti e corrette

### 2. Configurazione Resend

#### 2.1 Dominio Verificato
- [ ] Il dominio `keepfa.st` è stato aggiunto in [Resend Dashboard](https://resend.com/domains)
- [ ] Il dominio risulta verificato (status: ✅ Verified)

**Come verificare:**
1. Vai su [Resend Dashboard](https://resend.com/domains)
2. Controlla che `keepfa.st` sia presente e verificato

#### 2.2 DNS Records per Email
Verifica che questi record DNS siano configurati su Gandi.net:

- [ ] **SPF Record** (Tipo: TXT, Nome: `@`)
  - Valore: `v=spf1 include:resend.com ~all`
  
- [ ] **DKIM Record** (Tipo: TXT, Nome: `resend._domainkey`)
  - Valore: (fornito da Resend dashboard)
  
- [ ] **DMARC Record** (Tipo: TXT, Nome: `_dmarc`) - Opzionale ma consigliato
  - Valore: `v=DMARC1; p=none; rua=mailto:hello@keepfa.st`

**Come verificare:**
1. Vai su [Resend Dashboard](https://resend.com/domains)
2. Clicca sul dominio `keepfa.st`
3. Verifica che tutti i record DNS siano configurati correttamente
4. Usa [whatsmydns.net](https://www.whatsmydns.net) per verificare la propagazione DNS

#### 2.3 Audience Resend
**Nota Importante:** Il codice usa `resend.contacts.create()` che funziona **senza** bisogno di un Audience ID specifico. Resend crea automaticamente i contatti nell'audience di default.

- [ ] Verifica che l'API key abbia i permessi per creare contatti
- [ ] (Opzionale) Crea un Audience specifico in Resend se vuoi organizzare meglio i contatti

### 3. Test End-to-End

Esegui questi test manuali prima del lancio:

#### Test 1: Form Valido
- [ ] Compila il form con nome e email validi
- [ ] Verifica che il form si invii correttamente
- [ ] Verifica che ricevi l'email di conferma
- [ ] Verifica che il contatto sia stato aggiunto in Resend

#### Test 2: Email Duplicata
- [ ] Prova a iscriverti con la stessa email due volte
- [ ] Verifica che la seconda richiesta non generi errore
- [ ] Verifica che venga comunque inviata l'email di conferma

#### Test 3: Input Invalidi
- [ ] Prova a inviare il form senza nome → deve mostrare errore
- [ ] Prova a inviare il form senza email → deve mostrare errore
- [ ] Prova con email invalida (es: `test@`, `test@test`) → deve mostrare errore
- [ ] Prova con email troppo lunga → deve mostrare errore

#### Test 4: Rate Limiting
- [ ] Invia 3 richieste valide rapidamente → tutte devono funzionare
- [ ] Invia una 4a richiesta → deve restituire errore 429 "Too many requests"
- [ ] Attendi 15 minuti e riprova → deve funzionare di nuovo

#### Test 5: Verifica Email
- [ ] Controlla che l'email di conferma arrivi nella inbox (non spam)
- [ ] Verifica che il link Privacy Policy nell'email funzioni
- [ ] Verifica che il design dell'email sia corretto

### 4. Verifica Logs

Dopo i test, controlla i log su Vercel:

- [ ] Vai su Vercel Dashboard → Project → **Deployments** → **Functions** → `/api/waitlist`
- [ ] Verifica che i log mostrino:
  - Request ID univoci
  - Informazioni strutturate (email, duration, rate limit, etc.)
  - Nessun errore critico

## 🚨 Problemi Comuni e Soluzioni

### Le email non arrivano
1. Verifica che `RESEND_API_KEY` sia corretta
2. Verifica che il dominio sia verificato in Resend
3. Controlla i log di Vercel per errori
4. Verifica che i record DNS siano propagati (può richiedere fino a 48 ore)

### Rate limiting troppo aggressivo
Se il rate limiting è troppo restrittivo, modifica in `app/api/waitlist/route.ts`:
- `RATE_LIMIT_MAX_REQUESTS` (default: 3)
- `RATE_LIMIT_WINDOW_MS` (default: 15 minuti)

### Errori 500
1. Controlla i log di Vercel per dettagli
2. Verifica che tutte le variabili d'ambiente siano configurate
3. Verifica che l'API key di Resend sia valida

## 📝 Note Finali

- Il rate limiting usa un store in-memory. In produzione con multiple istanze Vercel, considera l'uso di Vercel KV o Redis per un rate limiting distribuito.
- Il logging strutturato aiuta a debuggare problemi in produzione.
- Tutti gli input sono sanitizzati per prevenire injection attacks.

---

**Ultimo aggiornamento:** Dopo implementazione miglioramenti sicurezza e validazione
