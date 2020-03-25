const template = document.createElement('template');
template.innerHTML = `
    <style>
        .container {
            background-color: #333;
            padding: 1rem;
            margin-top: 1rem;
        }
        
        .draggable {
            padding: 1rem;
            background-color: white;
            border: 1px solid black;
            cursor: move;
        }
        
        .draggable.dragging {
            opacity: .5;
        }
    </style>
    <div class="container">
        <p class="draggable" draggable="true">1</p>
        <p class="draggable" draggable="true">2</p>
        <p class="draggable" draggable="true">3</p>
    </div>
`;

class SortableContainer extends HTMLElement {
    constructor() {
        super();
        
        const draggables = document.querySelectorAll('.draggable')
        const containers = document.querySelectorAll('.container')

        // Attach ShadowDOM
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}