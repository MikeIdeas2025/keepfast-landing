# Keepfa.st Landing Page

Landing page standalone per Keepfa.st - AI-powered churn prevention per SaaS.

## 🚀 Quick Start

### 1. Installa le dipendenze

```bash
npm install
```

### 2. Avvia il dev server

```bash
npm run dev
```

La landing page sarà disponibile su [http://localhost:3000](http://localhost:3000)

## 📁 Struttura Progetto

```
keepfast-landing/
├── app/
│   ├── page.tsx          # Landing page principale
│   ├── layout.tsx        # Layout root con SEO
│   └── globals.css       # Stili globali + Tailwind + brand colors
├── components/
│   ├── Header.tsx        # Header con logo e nav
│   ├── Footer.tsx        # Footer
│   ├── Logo.tsx          # Componente logo
│   └── WaitlistForm.tsx  # Form per waitlist
└── public/               # File statici (immagini, favicon, etc.)
```

## 🎨 Design System

### Brand Colors (definiti in globals.css)

- **Yellow**: `#FFB800` - Colore principale (CTA, accenti)
- **Cream**: `#FFF8E7` - Background hero
- **Pink**: `#FFE5E5` - Background sezioni problema
- **Mint**: `#D4F4DD` - Background sezioni soluzione
- **Purple**: `#5B3A7D` - Background "How it works"
- **Dark**: `#1A1A1A` - Background CTA finale

### Utility Classes

- `.btn-brand-yellow` - Bottone giallo con hover effect
- `.bg-gradient-hero` - Gradient hero section
- `.icon-circle` - Icone circolari gialle
- `.bg-brand-*` - Background colors

## 🛠 Tecnologie

- **Framework**: Next.js 15.4.6 (App Router)
- **Styling**: TailwindCSS 4 + DaisyUI
- **Language**: TypeScript
- **Notifications**: React Hot Toast

## 📝 Note per lo Sviluppo

### Waitlist Form

Il form waitlist è configurato per logging in console. Per connettere a un backend:

1. Apri `components/WaitlistForm.tsx`
2. Scommenta il codice API (riga 41-47)
3. Sostituisci con il tuo endpoint

### SEO

I meta tag sono configurati in `app/layout.tsx`. Modifica:
- Title
- Description
- Keywords
- Open Graph tags
- Twitter Card

### Personalizzazione

1. **Logo**: Modifica `components/Logo.tsx` per usare un'immagine personalizzata
2. **Social Links**: Aggiorna in `components/Footer.tsx` e nella waitlist section
3. **Contenuti**: Modifica `app/page.tsx`

## 🚀 Deploy

### Vercel (Consigliato)

```bash
npm run build
vercel --prod
```

### Altre Piattaforme

```bash
npm run build
npm start  # Server in produzione su porta 3000
```

## 📧 Contatti

- Twitter: [@keepfast](https://twitter.com/keepfast)
- LinkedIn: [keepfast](https://linkedin.com/company/keepfast)

---

Made with ❤️ for indie hackers
