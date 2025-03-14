class DecimalClock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .clock {
                    width: 200px;
                    height: 200px;
                }
                .hand {
                    transform-origin: 50% 50%;
                    transition: transform 0.1s linear;
                }
                .hour-hand { stroke-width: 3; stroke: black; }
                .minute-hand { stroke-width: 2; stroke: black; }
                .second-hand { stroke-width: 1; stroke: red; }
            </style>
            <svg class="clock" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="black" stroke-width="2" fill="white"/>

              <!-- Markierungen für jede Minute -->
                ${Array.from({ length: 100 }, (_, i) => {
                    const angle = ((i * 3.6) - 90) * (Math.PI / 180);
                    const x1 = 50 + Math.cos(angle) * 46;
                    const y1 = 50 + Math.sin(angle) * 46;
                    const x2 = 50 + Math.cos(angle) * (i % 10 === 0 ? 40 : 44);
                    const y2 = 50 + Math.sin(angle) * (i % 10 === 0 ? 40 : 44);
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="${i % 10 === 0 ? 2 : 1}"/>`;
                }).join('')}

                <!-- Dezimal-Ziffern (1 bis 10) -->
                ${Array.from({ length: 10 }, (_, i) => {
                    const angle = ((i * 36) - 90) * (Math.PI / 180);
                    const x = 50 + Math.cos(angle) * 33;
                    const y = 50 + Math.sin(angle) * 33;
                    return `<text x="${x}" y="${y +2}" text-anchor="middle" font-size="8">${i + 1}</text>`;
                }).join('')}

                <!-- Zeiger -->
                <line id="hour-hand" x1="50" y1="50" x2="50" y2="30" class="hand hour-hand"/>
                <line id="minute-hand" x1="50" y1="50" x2="50" y2="20" class="hand minute-hand"/>
                <line id="second-hand" x1="50" y1="50" x2="50" y2="15" class="hand second-hand"/>

                <!-- Mittelpunkt -->
                <circle cx="50" cy="50" r="2" fill="black"/>
            </svg>
        `;
    }

    connectedCallback() {
        this.updateDecimalClock();
        this.interval = setInterval(() => this.updateDecimalClock(), 100);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    updateDecimalClock() {
        const now = new Date();

        // Aktuelle Zeit in Sekunden seit Mitternacht
        const msSinceMidnight = (now.getHours() * 3600000) + (now.getMinutes() * 60000) + (now.getSeconds() * 1000) + now.getMilliseconds();
        const decimalSeconds = (msSinceMidnight / 86400000) * 100000; // 100.000 Sekunden pro Tag
        const decimalMinutes = decimalSeconds / 100;
        const decimalHours = decimalMinutes / 100;

        // Berechnung der Zeiger-Winkel
        const hourDeg = decimalHours * 36;  // 360° / 10 Stunden = 36° pro Stunde
        const minuteDeg = decimalMinutes * 3.6;  // 360° / 100 Minuten = 3.6° pro Minute
        const secondDeg = decimalSeconds * 3.6;  // 360° / 100 Sekunden = 3.6° pro Sekunde

        // Zeiger setzen (Shadow DOM verwenden!)
        this.shadowRoot.getElementById("hour-hand").style.transform = `rotate(${hourDeg}deg)`;
        this.shadowRoot.getElementById("minute-hand").style.transform = `rotate(${minuteDeg}deg)`;
        this.shadowRoot.getElementById("second-hand").style.transform = `rotate(${secondDeg}deg)`;
    }
}

// Web Component registrieren
customElements.define("decimal-clock", DecimalClock);
