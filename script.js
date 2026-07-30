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


// ===========================
// TEIL 2: Suchfunktion
// ===========================

// Suche: Ein- und Ausblendung der Suchleiste
// Klick auf den Such-Button → Suchfeld ein- oder ausblenden.
document.getElementById("such-btn").addEventListener("click", function () {
    // "function()" statt Pfeilfunktion – beides funktioniert gleich hier.

    // getElementById: Findet das Element mit id="such-leiste" im HTML.
    var leiste = document.getElementById("such-leiste");
    // "var" = ältere Art eine Variable zu deklarieren (ähnlich wie "let", aber veralteter Stil).

    var suchIcon = document.getElementById("such-icon");
    // Das Such-Lupensymbol-Bild.

    var closeIcon = document.getElementById("close-icon");
    // Das X-Symbol-Bild.

    // Prüfe ob die Suchleiste gerade versteckt ist.
    // leiste.style.display: Liest die CSS-display-Eigenschaft aus die per style="" gesetzt wurde.
    // === "none": Dreifaches Gleich = strenger Vergleich (Typ UND Wert müssen übereinstimmen).
    if (leiste.style.display === "none") {
        // Wenn die Leiste versteckt ist (display:none), zeige sie an:
        leiste.style.display = "block";
        // display:block = normales sichtbares Block-Element.

        suchIcon.style.display = "none";
        // Suche-Icon verstecken.

        closeIcon.style.display = "block";
        // X-Icon anzeigen (signalisiert: Klick schließt die Suche).

    } else {
        // Wenn die Leiste schon sichtbar ist, verstecke sie:
        leiste.style.display = "none";

        suchIcon.style.display = "block";
        // Such-Icon wieder anzeigen.

        closeIcon.style.display = "none";
        // X-Icon verstecken.
    }
});


// ===========================
// TEIL 3: Suchdaten-Datenbank
// ===========================

// var suchDaten: Ein Array (eine Liste) mit Objekten.
// Jedes Objekt { ... } repräsentiert eine durchsuchbare Seite oder einen Artikel.
// Diese Liste ist die "Datenbank" der Suche – sie wird manuell gepflegt.
var suchDaten = [
    // Jeder Eintrag ist ein Objekt mit drei Schlüssel-Wert-Paaren:
    // titel: Was als Ergebnis angezeigt wird
    // beschreibung: Zusätzlicher Such-Text (wird im Ergebnis mitangezeigt)
    // url: Wohin der Klick auf das Ergebnis führt

    { titel: "Startseite", beschreibung: "Startseite des SV Dresden-Leuben", url: "index.html" },
    { titel: "News", beschreibung: "Aktuelle Nachrichten und Turnierberichte", url: "news.html" },
    { titel: "Mitglied werden", beschreibung: "Jetzt Mitglied im Verein werden", url: "mitglied.html" },
    { titel: "Über uns", beschreibung: "Geschichte und Informationen zum Verein", url: "ueber-uns.html" },
    { titel: "Spielbetrieb & Training", beschreibung: "Trainingszeiten und Spielplan", url: "spielbetrieb.html" },
    { titel: "Turniersaison 2025 startet!", beschreibung: "Alle Infos zu den kommenden Spielen und Terminen", url: "news.html" },
    { titel: "Test 123", beschreibung: "Das ist ein Test.", url: "index.html" },
    { titel: "Neue Mitglieder herzlich willkommen", beschreibung: "Jetzt eintreten und Teil unserer Gemeinschaft werden", url: "news.html" }
    // ← Neue Seiten hier einfügen! Format: { titel: "...", beschreibung: "...", url: "datei.html" },
];


// ===========================
// TEIL 4: Live-Suche
// ===========================

// 'input': Event das bei JEDER Tastatureingabe ausgelöst wird (nicht erst bei Enter).
// Das macht die Suche "live" – Ergebnisse erscheinen sofort beim Tippen.
document.getElementById("such-eingabe").addEventListener("input", function () {

    // this.value: "this" = das Element auf dem der Listener registriert ist (das Eingabefeld).
    // .value = der aktuelle Text im Eingabefeld.
    // .toLowerCase(): Wandelt in Kleinbuchstaben um.
    // Warum? Damit "Fußball" und "fußball" und "FUSSBALL" gleich behandelt werden.
    var suchbegriff = this.value.toLowerCase();

    // Die Box die das Dropdown-Ergebnis enthält.
    var ergebnisBox = document.getElementById("such-ergebnisse");

    // Die <ul>-Liste in der die Ergebnis-<li>-Einträge stehen.
    var liste = document.getElementById("ergebnis-liste");

    // innerHTML = "": Löscht den gesamten Inhalt der Liste.
    // Muss vor jeder neuen Suche gemacht werden sonst stapeln sich alte Ergebnisse.
    liste.innerHTML = "";

    // Prüfe ob der Suchbegriff mindestens 1 Zeichen lang ist.
    // .length: Gibt die Anzahl der Zeichen im String zurück. "abc".length = 3, "".length = 0.
    if (suchbegriff.length < 1) {
        // Weniger als 1 Zeichen = Suchfeld ist leer → Dropdown verstecken.
        ergebnisBox.style.display = "none";
        // return: Bricht die Funktion ab. Alles danach wird nicht ausgeführt.
        return;
    }

    // .filter(): Erstellt ein NEUES Array mit nur den Elementen für die die Bedingung true ist.
    // Geht durch jeden "eintrag" in suchDaten und prüft ob er zum Suchbegriff passt.
    var treffer = suchDaten.filter(function (eintrag) {
        // Gibt true zurück wenn der Suchbegriff im Titel ODER in der Beschreibung vorkommt.
        // || = ODER-Operator: true wenn mindestens eine Seite true ist.
        return eintrag.titel.toLowerCase().includes(suchbegriff) ||
            // .includes(): Prüft ob ein String einen anderen String enthält.
            // "Turnier".includes("turn") → true
            eintrag.beschreibung.toLowerCase().includes(suchbegriff);
    });

    // Wenn keine Treffer gefunden wurden:
    // .length === 0 bedeutet das Array ist leer (keine Treffer).
    if (treffer.length === 0) {
        ergebnisBox.style.display = "none";
        // Dropdown verstecken und Funktion abbrechen.
        return;
    }

    // Für jeden gefundenen Treffer einen Listeneintrag erstellen.
    // forEach(): Führt die Funktion für jeden Treffer aus.
    treffer.forEach(function (eintrag) {

        // document.createElement("li"): Erstellt ein neues <li>-HTML-Element im Speicher.
        // Es existiert noch nicht auf der Seite – nur im Speicher des Browsers.
        var li = document.createElement("li");

        // .innerHTML: Setzt den HTML-Inhalt des Elements.
        // Wir bauen einen Link-String zusammen:
        // '<a href="' + eintrag.url + '">' = öffnender <a>-Tag mit der URL aus suchDaten
        // + eintrag.titel + ' – ' + eintrag.beschreibung = sichtbarer Linktext
        // + '</a>' = schließender Tag
        li.innerHTML = '<a href="' + eintrag.url + '">' + eintrag.titel + ' – ' + eintrag.beschreibung + '</a>';

        // appendChild(): Hängt das neue <li> als letztes Kind an die <ul>-Liste an.
        // Erst jetzt erscheint es auf der Seite.
        liste.appendChild(li);
    });

    // Ergebnis-Box anzeigen da es Treffer gibt.
    ergebnisBox.style.display = "block";
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

    const selector = '.ueberschrift2, .blocktext2, .button2, .werbebild2, .ueberschrift1, .blocktext1, .button1, .werbebild1';
    const elementsToAnimate = document.querySelectorAll(selector);
    elementsToAnimate.forEach(el => observer.observe(el));
}

initScrollReveal();
