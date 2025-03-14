class DecimalDigiClock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host(.digiClocks) .clock {
                    font-family: monospace;
                    font-size: 24px;
                    background: black;
                    color: cyan;
                    padding: 10px;
                    border-radius: 5px;
                    display: inline-block;
                }
            </style>
            <div class="clock" id="clock">00:00:00:000</div>
        `;
    }

    connectedCallback() {
        this.updateClock();
        this.interval = setInterval(() => this.updateClock(), 10);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    updateClock() {
        const now = new Date();
        const msSinceMidnight = (now.getHours() * 3600000) + (now.getMinutes() * 60000) + (now.getSeconds() * 1000) + now.getMilliseconds();

        const decimalSeconds = (msSinceMidnight / 86400000) * 100000;
        const decimalMinutes = decimalSeconds / 100;
        const decimalHours = decimalMinutes / 100 * 2;

        const hours = String(Math.floor(decimalHours)).padStart(2, "0");
        const minutes = String(Math.floor(decimalMinutes % 100)).padStart(2, "0");
        const seconds = String(Math.floor(decimalSeconds % 100)).padStart(2, "0");
        const milliseconds = String(Math.floor((decimalSeconds % 1) * 1000)).padStart(3, "0");

        this.shadowRoot.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
}

customElements.define("decimal-digi-clock", DecimalDigiClock);
