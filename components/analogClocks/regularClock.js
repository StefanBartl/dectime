class RegularClock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host(.analogClocks) .clock {
                    width: 200px;
                    height: 200px;
                }
                .hand {
                    transform-origin: 50% 50%;
                    transition: transform 0.1s linear;
                }
            </style>
            <svg class="clock" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="black" stroke-width="2" fill="white"/>

                <!-- Markierungen für jede Minute -->
               ${Array.from({ length: 60 }, (_, i) => {
                    const angle = ((i * 6) - 90) * (Math.PI / 180);
                    const x1 = 50 + Math.cos(angle) * 46;
                    const y1 = 50 + Math.sin(angle) * 46;
                    const x2 = 50 + Math.cos(angle) * (i % 5 === 0 ? 38 : 44);
                    const y2 = 50 + Math.sin(angle) * (i % 5 === 0 ? 38 : 44);
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${i % 5 === 0 ? 2 : 1}"/>`;
                }).join('')}

                <!-- Ziffernblatt -->
                ${Array.from({ length: 12 }, (_, i) => {
                    const angle = ((i * 30) - 60) * (Math.PI / 180);
                    const x = 50 + Math.cos(angle) * 33;
                    const y = 50 + Math.sin(angle) * 33;
                    return `<text x="${x}" y="${y +2}" text-anchor="middle" font-size="8">${i + 1}</text>`;
                }).join('')}

                <!-- Zeiger -->
                <line id="hour-hand" x1="50" y1="50" x2="50" y2="30" stroke="black" stroke-width="3" class="hand"/>
                <line id="minute-hand" x1="50" y1="50" x2="50" y2="20" stroke="black" stroke-width="2" class="hand"/>
                <line id="second-hand" x1="50" y1="50" x2="50" y2="15" stroke="red" stroke-width="1" class="hand"/>

                <!-- Mittelpunkt -->
                <circle cx="50" cy="50" r="2" fill="black"/>
            </svg>
        `;
    }

    connectedCallback() {
        this.updateClock();
        this.interval = setInterval(() => this.updateClock(), 100);
    }

    disconnectedCallback() {
        clearInterval(this.interval); // Stoppt die Uhr, wenn sie entfernt wird
    }

    updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000; // Fließender Sekundenübergang

        // Winkel berechnen
        const hourDeg = (hours * 30) + (minutes / 2);
        const minuteDeg = (minutes * 6) + (seconds / 10); // Fließende Minutenrotation
        const secondDeg = seconds * 6; // Fließender Übergang der Sekunden

        // Zeiger bewegen
        this.shadowRoot.getElementById("hour-hand").style.transform = `rotate(${hourDeg}deg)`;
        this.shadowRoot.getElementById("minute-hand").style.transform = `rotate(${minuteDeg}deg)`;
        this.shadowRoot.getElementById("second-hand").style.transform = `rotate(${secondDeg}deg)`;
    }
}

// Web Component registrieren
customElements.define("regular-clock", RegularClock);
