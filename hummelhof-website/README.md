# Hummelhof – Website

Statische Website für **Hummelhof – Gasthof & Landhotel** (Oberösterreich):
Startseite, Speisekarte, Zimmer, Galerie, Kontakt sowie Impressum und
Datenschutz. Kein Framework, kein Build-Schritt – reines HTML/CSS/JS und
damit direkt auf Vercel deploybar.

> **Shop:** Es gibt bewusst kein Shop-Menü und keine Shop-Seiten.

---

## Aufbau

```
hummelhof-website/
├─ index.html            Startseite (Hero, Über uns, Küche, Zimmer, Galerie, Stimmen, Anfahrt)
├─ speisekarte.html      Speisekarte mit Kategorien und Preisen
├─ zimmer.html           Zimmer „Stube“, „Lindenhof“, „Wiesenblick“, Preise, Inklusivleistungen
├─ galerie.html          Bildergalerie mit Lightbox
├─ kontakt.html          Kontaktdaten, Öffnungszeiten, Anfahrt, Anfrage-Formular
├─ impressum.html        Impressum (Platzhalter – vor Livegang ersetzen)
├─ datenschutz.html      Datenschutzerklärung (Platzhalter – vor Livegang prüfen)
├─ vercel.json           Caching-Header, Security-Header, cleanUrls
├─ robots.txt            Crawling-Freigaben (Domain anpassen)
├─ sitemap.xml           Sitemap (Domain anpassen)
└─ assets/
   ├─ css/styles.css     Design-System (Farben, Typografie, Komponenten, Responsive)
   ├─ js/main.js         Navigation, Scroll-Effekte, Lightbox, Öffnungszeiten, Formular
   └─ img/               Bilder (KI-generiert) und Favicon
```

## Lokal ansehen

Es genügt ein simpler Webserver im Projektordner:

```bash
python3 -m http.server 8000
# danach http://localhost:8000 öffnen
```

Alternativ die `index.html` direkt im Browser öffnen – die Seite funktioniert
auch als Datei, da alle Pfade relativ sind.

## Auf Vercel deployen

1. Repository in GitHub öffnen (dieser Ordner ist der Website-Stamm).
2. In Vercel **Add New… → Project** wählen und das Repository importieren.
3. **Framework Preset: Other**, **Build Command** leer lassen,
   **Output Directory** leer lassen oder `.` eintragen.
4. Wichtig, falls das Repository weiteres (z. B. `game.zip`) enthält:
   **Root Directory** auf `hummelhof-website` setzen, damit Vercel direkt
   auf `index.html` zeigt.
5. **Deploy** – fertig. Jeder weitere Push löst automatisch ein neues
   Deployment aus.

## Vor dem Livegang anpassen

| Was | Wo |
| --- | --- |
| Adresse, Telefon, E-Mail | `index.html`, `zimmer.html`, `kontakt.html`, `impressum.html`, `datenschutz.html` (Kopf- und Fußbereich) |
| Preise der Speisen und Zimmer | `speisekarte.html`, `zimmer.html` |
| Öffnungszeiten | Footer aller Seiten + Tabellen in `index.html` und `kontakt.html` |
| Bilder | `assets/img/` – eigene Fotos ersetzen, Dateinamen beibehalten |
| Domain | `robots.txt`, `sitemap.xml`, `<link rel="canonical">` in allen Seiten |
| Firmendaten (UID, Firmenbuch, Gewerbe) | `impressum.html` |
| Karteneinbindung | aktuell Link zu Google Maps; wer eine eingebettete Karte will, kann einen `<iframe>` in `kontakt.html` einsetzen (dann Datenschutzerklärung ergänzen) |

## Technische Hinweise

- **Schriften:** Fraunces und Inter werden über Google Fonts geladen. Für
  maximalen Datenschutz können die Schriftdateien heruntergeladen, unter
  `assets/fonts/` abgelegt und im Stylesheet per `@font-face` eingebunden
  werden.
- **Bilder:** Alle Motive sind KI-generierte Platzhalter. Sie sind
  lizenzfrei einsetzbar, zeigen aber nicht das echte Haus.
- **Formular:** Da die Website statisch ist, öffnet der Absenden-Button das
  E-Mail-Programm (`mailto:`). Wer ein echtes Server-Formular möchte, kann
  z. B. Vercel Serverless Functions, Formspree oder ein anderes Formular-
  Backend nachrüsten.
- **Barrierefreiheit:** Skip-Link, Fokus-Stile, `aria`-Attribute, Alt-Texte
  und `prefers-reduced-motion` sind berücksichtigt.
