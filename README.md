# Decimal Clocks

## Beschreibung
Dieses Projekt enthält eine Implementierung sowohl **regulärer** als auch **dezimaler** Uhren, sowohl in **analogem** als auch **digitalem** Format. Es wurde mit **Web Components** realisiert und nutzt moderne **CSS und JavaScript**, um eine eigenständige, wiederverwendbare UI-Komponente bereitzustellen.

## Funktionen
✅ **Reguläre Uhr** (analog & digital) – basiert auf dem 24-Stunden-Format mit 60 Minuten und 60 Sekunden.
✅ **Dezimale Uhr** (analog & digital) – nutzt ein vollständig dezimales Zeitsystem mit **100.000 Sekunden pro Tag**.
✅ **Responsive Design** – Uhren passen sich dynamisch an die Bildschirmgröße an.
✅ **Web Components** – Modular und wiederverwendbar, ohne globale CSS-Konflikte.
✅ **Interaktives Tooltip-System** – Erklärungen zur Umrechnung von regulärer zu dezimaler Zeit.

## Technologie-Stack
- **HTML**: Strukturierung der Uhrenkomponenten.
- **CSS**: Styling mit responsiven Layouts.
- **JavaScript (ES6)**: Implementierung der Logik über Web Components.

## Installation
1. **Projekt klonen**
   ```sh
   git clone https://github.com/dein-user/dein-repo.git
   cd dein-repo
   ```
2. **Lokal im Browser testen**
   - Öffne die `index.html` in einem Browser.

## Verwendung
Die Web Components können einfach in einer HTML-Datei eingebunden werden:
```html
<regular-clock></regular-clock>
<regular-digi-clock></regular-digi-clock>
<decimal-clock></decimal-clock>
<decimal-digi-clock></decimal-digi-clock>
```

## Umrechnungsfaktoren (Regulär ↔ Dezimal)
**Von regulärer zu dezimaler Zeit:**
- 1 normale Stunde ≈ **0,83** dezimale Stunden
- 1 normale Minute ≈ **1,67** dezimale Minuten
- 1 normale Sekunde ≈ **1,67** dezimale Sekunden

**Von dezimaler zu regulärer Zeit:**
- 1 dezimale Stunde ≈ **1,2** normale Stunden
- 1 dezimale Minute ≈ **0,6** normale Minuten (36 Sekunden)
- 1 dezimale Sekunde ≈ **0,6** normale Sekunden (600 ms)

## Lizenz
Dieses Projekt steht unter der **MIT-Lizenz**.

## Autor
Erstellt von **Stefan Bartl** 🚀
