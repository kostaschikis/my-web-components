const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

// Draggable Opacity 
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

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        // By defualt dropping an element is not allowed
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        // Get the element we are currently dragging
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }        
    })  
})

/**
 * Figure out which element we are placing this in between
 * @param container 
 * @param mouse.y.position 
 */
function getDragAfterElement(container, y) {
    // Get every element we are not currently dragging inside the container  
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
}