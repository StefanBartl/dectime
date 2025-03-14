class RegularDigiClock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .clock {
                    font-family: monospace;
                    font-size: 24px;
                    background: black;
                    color: limegreen;
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
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

        this.shadowRoot.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
}

customElements.define("regular-digi-clock", RegularDigiClock);