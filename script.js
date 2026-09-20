// ==========================================================================
// SCRIPT.JS – Vollständig kommentierte Version
// Jede Zeile JavaScript ist erklärt.
// ==========================================================================


// ===========================
// TEIL 1: News-Karussell
// ===========================

// document.querySelector(): Sucht im gesamten HTML-Dokument nach dem ersten Element
// das zum CSS-Selektor passt. '.karussell-spur' = Element mit der Klasse "karussell-spur".
// Das Ergebnis (das HTML-Element) wird in der Variable "spur" gespeichert.
const spur = document.querySelector('.karussell-spur');

// document.querySelectorAll(): Sucht ALLE Elemente mit der Klasse "karussell-karte".
// Gibt eine NodeList zurück (ähnlich wie ein Array – eine Liste von Elementen).
const karten = document.querySelectorAll('.karussell-karte');

// getElementById(): Sucht ein Element mit der genauen ID "btn-links".
// IDs sind eindeutig – gibt immer genau ein Element zurück.
const btnLinks = document.getElementById('btn-links');

// Rechter Pfeil-Button, ebenfalls per ID gefunden.
const btnRechts = document.getElementById('btn-rechts');

// Alle Dots (Navigationspunkte) als Liste.
const dots = document.querySelectorAll('.dot');

// "let" = Variable die sich ändern kann (im Gegensatz zu "const" = unveränderlich).
// aktuelleIndex speichert welche Karte gerade sichtbar ist. Startet bei 0 = erste Karte.
let aktuelleIndex = 0;


// function: Definiert eine wiederverwendbare Funktion namens "zeigeKarte".
// Sie nimmt einen Parameter "index" entgegen – die Nummer der gewünschten Karte.
function zeigeKarte(index) {
    if (!spur || karten.length === 0) return;

    // (index + karten.length) % karten.length: Zyklische Berechnung.
    // % = Modulo-Operator: Rest der Division. Beispiel: 2 % 2 = 0 (nach der letzten Karte kommt die erste).
    // + karten.length verhindert negative Zahlen (wenn index = -1: -1 + 2 = 1 % 2 = 1 → letzte Karte).
    aktuelleIndex = (index + karten.length) % karten.length;

    // style.transform: Setzt die CSS-transform Eigenschaft des Elements per JavaScript.
    // translateX(-X%): Verschiebt die gesamte Spur nach links um X Prozent.
    // Backtick-Strings (Template Literals) erlauben ${Variable} direkt im String.
    // Bei Karte 0: translateX(-0%) = keine Verschiebung (erste Karte sichtbar)
    // Bei Karte 1: translateX(-100%) = 100% nach links (zweite Karte sichtbar)
    spur.style.transform = `translateX(-${aktuelleIndex * 100}%)`;

    // forEach(): Führt eine Funktion für jedes Element in der Liste aus.
    // (dot, i) => { ... }: Pfeilfunktion. dot = aktueller Punkt, i = sein Index (0, 1, 2...).
    dots.forEach((dot, i) => {
        // classList.toggle(): Fügt eine Klasse hinzu ODER entfernt sie.
        // Zweites Argument (true/false) erzwingt Hinzufügen oder Entfernen.
        // i === aktuelleIndex: true wenn dieser Dot zur aktuellen Karte gehört → Klasse "aktiv" wird hinzugefügt.
        // i !== aktuelleIndex: false → Klasse "aktiv" wird entfernt.
        dot.classList.toggle('aktiv', i === aktuelleIndex);
    });
}


// addEventListener('click', ...): Registriert einen Klick-Listener.
// Wenn btnLinks geklickt wird, wird die Funktion ausgeführt.
// () => ...: Kurze Pfeilfunktion (arrow function) – gleich wie function() { ... }
// zeigeKarte(aktuelleIndex - 1): Geht eine Karte nach links (Nummer -1).
if (btnLinks) {
    btnLinks.addEventListener('click', () => zeigeKarte(aktuelleIndex - 1));
}

// Rechter Button: geht eine Karte nach rechts (+1).
if (btnRechts) {
    btnRechts.addEventListener('click', () => zeigeKarte(aktuelleIndex + 1));
}


// Für jeden Dot einen Klick-Listener registrieren.
dots.forEach(dot => {
    // Für jeden einzelnen Dot:
    dot.addEventListener('click', () => {
        // parseInt(): Wandelt einen Text in eine ganze Zahl um.
        // dot.dataset.index: Liest das HTML-Attribut data-index="0" aus dem Dot-Button.
        // (data-* Attribute = eigene Daten im HTML speichern, per JavaScript lesbar)
        zeigeKarte(parseInt(dot.dataset.index));
    });
});


// Tastatursteuerung: Auf das gesamte Dokument hören.
// 'keydown': Event das ausgelöst wird wenn eine Taste gedrückt wird.
// (e): Das Event-Objekt – enthält Informationen über das Ereignis (welche Taste, etc.)
document.addEventListener('keydown', (e) => {
    // e.key: Welche Taste wurde gedrückt? 'ArrowLeft' = Pfeil-Links-Taste.
    if (e.key === 'ArrowLeft') zeigeKarte(aktuelleIndex - 1);
    // 'ArrowRight' = Pfeil-Rechts-Taste.
    if (e.key === 'ArrowRight') zeigeKarte(aktuelleIndex + 1);
});


document.addEventListener("DOMContentLoaded", () => {
    // "DOMContentLoaded": Event das ausgelöst wird wenn das HTML vollständig geladen ist.
});


function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = parseInt(element.getAttribute('data-delay') || '0', 10);

                setTimeout(() => {
                    element.classList.add('is-visible');
                }, delay);

                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.15, // Korrigiert auf 15% Sichtbarkeit (0.15 statt 0)
        rootMargin: '0px 0px -30px 0px'
    });

    const selector = '.ueberschrift2, .blocktext2, .button2, .werbebild2, .ueberschrift1, .blocktext1, .button1, .werbebild1'
    const elementsToAnimate = document.querySelectorAll(selector);
    elementsToAnimate.forEach(el => observer.observe(el));
}

initScrollReveal();




// Wartet, bis wirklich ALLE Elemente, Bilder und Stylesheets geladen sind
window.addEventListener('load', function () {
    const loader = document.getElementById('loading-screen');

    // 1. Sanftes Ausblenden über die CSS-Transition (opacity)
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';

    // 2. Reaktiviert das Scrollen auf der fertigen Hauptseite
    document.documentElement.style.opacity = '1'; /* Falls vorher ausgeblendet */
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    // 3. Nach Ablauf der CSS-Animation den Loader komplett deaktivieren (DOM-Entlastung)
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

const burgerIcon = document.querySelector('.hero-icon-2 .burger-icon');
const closeIcon = document.querySelector('.hero-icon-2 .close-icon');
const menuContainer = document.querySelector('.hero-icon-2');

menuContainer.addEventListener('click', function () {
    // Wenn das Burger-Menü sichtbar ist, blende es aus und zeige das X
    if (burgerIcon.style.display !== 'none') {
        burgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        // Wenn das X sichtbar ist, mache das Burger-Menü wieder an
        burgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// ==========================================
// SUCH-INDEX (DEINE SEITEN-DATEN)
// ==========================================
const suchIndex = [
    {
        title: "Startseite",
        url: "index.html",
        keywords: "startseite start home leuben schachverein dresden verein heim"
    },
    {
        title: "News",
        url: "news.html",
        keywords: "aktuelles turnier meldung neuigkeiten news"
    },
    {
        title: "Trainingszeiten",
        url: "trainingszeiten.html",
        keywords: "training zeiten termine mannschaft übungsstunde übung"
    },
    {
        title: "Impressum",
        url: "impressum.html",
        keywords: "kontakt rechtliches anbieter adresse impressum"
    },
    {
        title: "Datenschutz",
        url: "datenschutz.html",
        keywords: "dsgvo privacy daten datenschutzerklärung datenschutz"
    }
];

// ==========================================
// SUCH-FUNKTION & QUICK-LINKS STEUERUNG
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Die relevanten Elemente aus dem HTML holen.
    const suchIcon = document.querySelector('.hero-icon-1');
    const suchPanel = document.getElementById('such-panel');
    const suchInput = document.getElementById('such-input');
    const suchErgebnisse = document.getElementById('such-ergebnisse');
    const quickLinks = document.querySelector('.quick-links');

    // Klick auf das Such-Icon öffnet oder schließt das Panel.
    if (suchIcon && suchPanel) {
        suchIcon.addEventListener('click', () => {
            suchPanel.classList.toggle('offen');

            if (suchPanel.classList.contains('offen')) {
                // Wenn das Panel offen ist, automatisch ins Eingabefeld springen
                setTimeout(() => suchInput.focus(), 100);
            } else {
                // Beim Schließen des Panels das Suchfeld und alle Zustände komplett zurücksetzen
                suchInput.value = '';
                suchErgebnisse.innerHTML = '';
                quickLinks.classList.remove('versteckt');
                suchPanel.classList.remove('mit-ergebnissen');
            }
        });
    }

    // Bei jeder Eingabe im Suchfeld wird diese Funktion ausgeführt
    if (suchInput) {
        suchInput.addEventListener('input', () => {
            const query = suchInput.value.toLowerCase().trim();

            // Ergebnis-Bereich zuerst leeren, bevor wir neu befüllen
            suchErgebnisse.innerHTML = '';

            // Wenn das Feld leer ist, zeigen wir gar nichts an und reaktivieren die Quick Links
            if (query.length === 0) {
                quickLinks.classList.remove('versteckt');
                suchPanel.classList.remove('mit-ergebnissen');
                return;
            }

            // Sobald mindestens ein Buchstabe getippt wurde, Quick Links verstecken 
            // und das Panel für dynamische Höhen freigeben (.mit-ergebnissen)
            quickLinks.classList.add('versteckt');
            suchPanel.classList.add('mit-ergebnissen');

            // Filter-Logik aus dem suchIndex
            const treffer = suchIndex.filter(seite =>
                seite.title.toLowerCase().includes(query) ||
                seite.keywords.toLowerCase().includes(query)
            );

            // Falls keine Treffer gefunden wurden, eine Hinweis-Meldung anzeigen.
            if (treffer.length === 0) {
                // Durch die CSS-Transition wächst das Panel hier jetzt automatisch weich 
                // auf die perfekte Höhe für den Textzeilen-Hinweis zusammen.
                suchErgebnisse.innerHTML = '<p>Keine Ergebnisse gefunden.</p>';
                return;
            }

            // Für jeden gefundenen Treffer einen klickbaren Link erzeugen.
            treffer.forEach(seite => {
                const link = document.createElement('a');
                link.href = seite.url;
                link.textContent = seite.title;

                // Das neu erstellte Element tatsächlich in den sichtbaren Bereich einfügen.
                // Das CSS animiert das Panel bei jedem hinzugefügten Link geschmeidig mit!
                suchErgebnisse.appendChild(link);
            });
        });
    }
});