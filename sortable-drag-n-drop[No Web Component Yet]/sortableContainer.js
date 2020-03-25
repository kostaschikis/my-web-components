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
        <slot/>
    </div>
`;

class SortableContainer extends HTMLElement {
    constructor() {
        super();

        // Attach ShadowDOM
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // Get Nodes
        this.containers = this.shadowRoot.querySelectorAll('.container')
        this.draggables = this.shadowRoot.querySelectorAll('.draggable')
    
    }

    attachOpacity(draggables) {
        draggables.forEach(draggable => {
            // When Drag Start -> Element Opacity 0.5
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging')
            })
            
            // When Drag End -> Element Opacity 1
            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging')
            })
        })
    }


    connectedCallback() {
        // Give Draggables The Opacity Attribute
        this.attachOpacity(this.draggables)
    }

}

window.customElements.define('sortable-container', SortableContainer);    