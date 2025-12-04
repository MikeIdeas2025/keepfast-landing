# ✅ Checklist Pre-Lancio - Cosa Fare Prima di Procedere

## 🔑 1. Configurazione API Keys (OBBLIGATORIO)

### Resend API Key
- [ ] Crea/ottieni la tua API key da [Resend Dashboard](https://resend.com/api-keys)
- [ ] Aggiungi su Vercel: `RESEND_API_KEY=re_...`

### PostHog API Key (Opzionale ma Consigliato)
- [ ] Crea/ottieni la tua API key da [PostHog](https://posthog.com)
- [ ] Aggiungi su Vercel: `NEXT_PUBLIC_POSTHOG_KEY=phc_...`
- [ ] Aggiungi su Vercel: `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com` (o il tuo host)

**Come aggiungere su Vercel:**
1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleziona il progetto `keepfast-landing`
3. Vai su **Settings** → **Environment Variables**
4. Aggiungi le variabili e clicca **Save**

---

## 📧 2. Configurazione Resend per Email (OBBLIGATORIO)

### Step 1: Aggiungi Dominio in Resend
- [ ] Vai su [Resend Dashboard](https://resend.com/domains)
- [ ] Clicca **"Add Domain"**
- [ ] Inserisci `keepfa.st`
- [ ] Resend ti fornirà i record DNS da configurare

### Step 2: Configura DNS su Gandi.net
Aggiungi questi record DNS su Gandi.net:

- [ ] **SPF Record** (Tipo: TXT, Nome: `@`)
  - Valore: `v=spf1 include:resend.com ~all`
  
- [ ] **DKIM Record** (Tipo: TXT, Nome: `resend._domainkey`)
  - Valore: (fornito da Resend dashboard - copia esattamente)
  
- [ ] **DMARC Record** (Tipo: TXT, Nome: `_dmarc`) - Opzionale ma consigliato
  - Valore: `v=DMARC1; p=none; rua=mailto:hello@keepfa.st`

### Step 3: Verifica Dominio
- [ ] Attendi la propagazione DNS (5-30 minuti, max 48 ore)
- [ ] Vai su Resend Dashboard e clicca **"Verify"** sul dominio
- [ ] Verifica che il dominio risulti **✅ Verified**

### Step 4: Configura RESEND_FROM_EMAIL
- [ ] Dopo che il dominio è verificato, aggiungi su Vercel:
  ```
  RESEND_FROM_EMAIL=Keepfa.st <hello@keepfa.st>
  ```
- [ ] **Importante:** Usa l'email che hai verificato in Resend

**Verifica propagazione DNS:**
- Usa [whatsmydns.net](https://www.whatsmydns.net) per verificare che i record DNS siano propagati

---

## 🧪 3. Test End-to-End (OBBLIGATORIO)

Prima di lanciare pubblicamente, testa tutto:

### Test 1: Form Valido ✅
- [ ] Compila il form con nome e email validi
- [ ] Verifica che il form si invii correttamente
- [ ] Verifica che ricevi l'email di conferma nella inbox (non spam)
- [ ] Verifica che il contatto sia stato aggiunto in Resend Dashboard → Contacts

### Test 2: Email Duplicata ✅
- [ ] Prova a iscriverti con la stessa email due volte
- [ ] Verifica che la seconda richiesta non generi errore
- [ ] Verifica che venga comunque inviata l'email di conferma

### Test 3: Input Invalidi ✅
- [ ] Prova senza nome → deve mostrare errore
- [ ] Prova senza email → deve mostrare errore
- [ ] Prova con email invalida (es: `test@`, `test@test`) → deve mostrare errore

### Test 4: Rate Limiting ✅
- [ ] Invia 3 richieste valide rapidamente → tutte devono funzionare
- [ ] Invia una 4a richiesta → deve restituire errore 429 "Too many requests"
- [ ] Attendi 15 minuti e riprova → deve funzionare di nuovo

### Test 5: Verifica Email ✅
- [ ] Controlla che l'email di conferma arrivi nella inbox (non spam)
- [ ] Verifica che il link Privacy Policy nell'email funzioni
- [ ] Verifica che il design dell'email sia corretto

---

## 📋 4. Verifica Finale

- [ ] Tutte le variabili d'ambiente sono configurate su Vercel
- [ ] Il dominio Resend è verificato
- [ ] I record DNS sono propagati
- [ ] Tutti i test end-to-end sono passati
- [ ] Il sito è deployato e funzionante su `https://keepfa.st`

---

## 🚨 Problemi Comuni

### Le email non arrivano
1. Verifica che `RESEND_API_KEY` sia corretta
2. Verifica che il dominio sia verificato in Resend
3. Controlla i log di Vercel per errori
4. Verifica che i record DNS siano propagati

### Rate limiting troppo aggressivo
Se necessario, modifica in `app/api/waitlist/route.ts`:
- `RATE_LIMIT_MAX_REQUESTS` (default: 3)
- `RATE_LIMIT_WINDOW_MS` (default: 15 minuti)

### Errori 500
1. Controlla i log di Vercel per dettagli
2. Verifica che tutte le variabili d'ambiente siano configurate
3. Verifica che l'API key di Resend sia valida

---

**In sintesi:** Oltre alle API key, devi configurare il dominio Resend, i DNS records, e fare i test. Poi sei pronto! 🚀
