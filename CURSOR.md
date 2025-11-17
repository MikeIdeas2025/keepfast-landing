# Come Aprire in Cursor

## 📝 Istruzioni

### 1. Apri Cursor

Avvia l'applicazione Cursor sul tuo Mac.

### 2. Apri la Cartella del Progetto

**Metodo A - Drag & Drop:**
- Trascina la cartella `keepfast-landing` dall'icona Finder direttamente su Cursor

**Metodo B - File > Open Folder:**
1. In Cursor, vai su **File → Open Folder...**
2. Naviga fino a `/Users/michelelauro/keepfast-landing`
3. Clicca su **"Open"**

**Metodo C - Terminal:**
```bash
cd /Users/michelelauro/keepfast-landing
cursor .
```

### 3. Installa le Dipendenze

Una volta aperto il progetto in Cursor, apri il terminale integrato:
- **Mac**: `Ctrl + ` ` (backtick) oppure **View → Terminal**

Poi esegui:
```bash
npm install
```

### 4. Avvia il Dev Server

```bash
npm run dev
```

La landing page sarà disponibile su: http://localhost:3000

## 🎯 Comandi Utili in Cursor

- **Command Palette**: `Cmd + Shift + P`
- **Terminale**: `Ctrl + ` `
- **Cerca File**: `Cmd + P`
- **Cerca in Tutti i File**: `Cmd + Shift + F`
- **Split Editor**: `Cmd + \`

## 🔧 Configurazione Cursor

Cursor dovrebbe riconoscere automaticamente il progetto Next.js/TypeScript.

Se chiedi a Cursor di modificare codice, si baserà su:
- `tsconfig.json` per TypeScript
- `next.config.js` per Next.js
- La struttura `app/` di Next.js 15

## 🎨 Lavorare sulla Landing Page

### File Principali da Modificare

1. **`app/page.tsx`** - Tutta la landing page
2. **`app/globals.css`** - Stili e brand colors
3. **`components/WaitlistForm.tsx`** - Form waitlist
4. **`components/Header.tsx`** - Header navigation
5. **`components/Footer.tsx`** - Footer

### Hot Reload

Quando modifichi i file, il browser si aggiornerà automaticamente (Fast Refresh).

## 💡 Tips

- Usa **Cursor AI** (Cmd + K) per modificare sezioni di codice
- Usa **Cursor Chat** (Cmd + L) per fare domande sul codice
- Tutte le modifiche sono indipendenti dal progetto `keepfast` principale

## 🚀 Quando Sei Pronto

Il progetto è completamente standalone e può essere:
- Deployato su Vercel/Netlify
- Usato come landing page separata
- Modificato senza impattare il progetto principale `keepfast`

---

Buon lavoro! 🎨
