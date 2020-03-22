class UserCard extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `John Doe`;
    }
}

window.customElements.define('user-card', UserCard);    