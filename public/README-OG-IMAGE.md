# Open Graph Image

Per creare l'immagine PNG per Open Graph (og-image.png), puoi:

1. **Usare un servizio online:**
   - Vai su https://www.canva.com o https://www.figma.com
   - Crea un'immagine 1200x630px
   - Usa il design da `og-image.svg` come riferimento
   - Esporta come PNG

2. **Usare il template HTML:**
   - Apri `og-image.html` in un browser
   - Fai screenshot a 1200x630px
   - Salva come `og-image.png`

3. **Usare un tool CLI:**
   ```bash
   # Con Puppeteer
   npx puppeteer screenshot og-image.html og-image.png --width=1200 --height=630
   ```

L'immagine deve essere 1200x630px per ottimale visualizzazione su social media.
