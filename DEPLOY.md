# 🚀 Guida Deploy su Vercel con Dominio keepfa.st

## Prerequisiti

- ✅ Repository GitHub: https://github.com/MikeIdeas2025/keepfast-landing
- ✅ Account Vercel (gratuito)
- ✅ Dominio keepfa.st su Gandi.net
- ✅ Account Resend con API key

## Step 1: Deploy su Vercel

### 1.1 Connetti Repository

1. Vai su [vercel.com](https://vercel.com) e accedi
2. Clicca **"Add New..."** → **"Project"**
3. Importa il repository `MikeIdeas2025/keepfast-landing`
4. Vercel rileverà automaticamente Next.js

### 1.2 Configurazione Build

Vercel dovrebbe rilevare automaticamente:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 1.3 Variabili d'Ambiente

Aggiungi queste variabili d'ambiente in Vercel Dashboard → Settings → Environment Variables:

```
RESEND_API_KEY=re_KDRoY9nQ_HxP2ve8KK37t4VctU3PRcgoX
```

**Nota**: Aggiungi anche `RESEND_FROM_EMAIL` dopo aver verificato il dominio in Resend (Step 3).

### 1.4 Deploy

1. Clicca **"Deploy"**
2. Attendi il completamento del build
3. Il sito sarà disponibile su `https://keepfast-landing.vercel.app`

## Step 2: Configurazione Dominio keepfa.st

### 2.1 Aggiungi Dominio su Vercel

1. Vai su **Project Settings** → **Domains**
2. Aggiungi `keepfa.st`
3. Aggiungi anche `www.keepfa.st` (opzionale)
4. Vercel ti fornirà i record DNS da configurare

### 2.2 Configura DNS su Gandi.net

Vai sul pannello DNS di Gandi.net e aggiungi questi record:

#### Record A (per dominio principale)
- **Nome**: `@` (o lascia vuoto)
- **Tipo**: `A`
- **Valore**: IP fornito da Vercel (es: `76.76.21.21`)
- **TTL**: `3600`

#### Record CNAME (per www)
- **Nome**: `www`
- **Tipo**: `CNAME`
- **Valore**: `cname.vercel-dns.com`
- **TTL**: `3600`

#### Record CNAME (per verifica dominio Vercel)
- **Nome**: `_vercel`
- **Tipo**: `CNAME`
- **Valore**: `76.76.21.21` (o quello fornito da Vercel)
- **TTL**: `3600`

### 2.3 Verifica Dominio

1. Attendi la propagazione DNS (può richiedere fino a 48 ore, solitamente 5-30 minuti)
2. Vercel verificherà automaticamente il dominio
3. Una volta verificato, il sito sarà disponibile su `https://keepfa.st`

## Step 3: Configurazione Resend per Email

### 3.1 Aggiungi Dominio in Resend

1. Vai su [Resend Dashboard](https://resend.com/domains)
2. Clicca **"Add Domain"**
3. Inserisci `keepfa.st`
4. Resend ti fornirà i record DNS da aggiungere

### 3.2 Configura DNS per Resend

Aggiungi questi record DNS su Gandi.net:

#### SPF Record
- **Nome**: `@`
- **Tipo**: `TXT`
- **Valore**: `v=spf1 include:resend.com ~all`
- **TTL**: `3600`

#### DKIM Record
- **Nome**: `resend._domainkey` (o quello fornito da Resend)
- **Tipo**: `TXT`
- **Valore**: (fornito da Resend)
- **TTL**: `3600`

#### DMARC Record (opzionale ma consigliato)
- **Nome**: `_dmarc`
- **Tipo**: `TXT`
- **Valore**: `v=DMARC1; p=none; rua=mailto:hello@keepfa.st`
- **TTL**: `3600`

### 3.3 Verifica Dominio in Resend

1. Attendi la propagazione DNS
2. Clicca **"Verify"** in Resend Dashboard
3. Una volta verificato, aggiorna la variabile d'ambiente su Vercel:

```
RESEND_FROM_EMAIL=Keepfa.st <hello@keepfa.st>
```

## Step 4: Test Finale

### 4.1 Test Waitlist Form

1. Vai su `https://keepfa.st`
2. Compila il form waitlist
3. Verifica che:
   - Il form funzioni correttamente
   - Ricevi email di conferma
   - Il contatto viene aggiunto a Resend Audience

### 4.2 Test SEO

- Verifica che `https://keepfa.st/sitemap.xml` funzioni
- Verifica che `https://keepfa.st/robots.txt` funzioni
- Testa con [Google Rich Results Test](https://search.google.com/test/rich-results)

## Checklist Pre-Deploy

- [x] Repository su GitHub
- [ ] Account Vercel creato
- [ ] Variabili d'ambiente configurate
- [ ] Dominio aggiunto su Vercel
- [ ] DNS configurato su Gandi.net
- [ ] Dominio verificato su Vercel
- [ ] Dominio aggiunto su Resend
- [ ] DNS email configurato su Gandi.net
- [ ] Dominio verificato su Resend
- [ ] `RESEND_FROM_EMAIL` aggiornato su Vercel
- [ ] Test waitlist form funzionante

## Troubleshooting

### Il dominio non si verifica su Vercel
- Attendi fino a 48 ore per la propagazione DNS
- Verifica che i record DNS siano corretti
- Usa [whatsmydns.net](https://www.whatsmydns.net) per verificare la propagazione

### Le email non vengono inviate
- Verifica che `RESEND_API_KEY` sia corretta su Vercel
- Verifica che il dominio sia verificato in Resend
- Controlla i log di Vercel per errori

### Build fallisce su Vercel
- Verifica che tutte le dipendenze siano in `package.json`
- Controlla i log di build in Vercel Dashboard
- Testa il build localmente con `npm run build`

## Supporto

- Vercel Docs: https://vercel.com/docs
- Resend Docs: https://resend.com/docs
- Gandi DNS: https://docs.gandi.net/en/domain_names/

---

**Buon deploy! 🚀**

