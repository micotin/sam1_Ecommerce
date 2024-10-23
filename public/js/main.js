document.addEventListener('DOMContentLoaded', function() {
    // Initialize all Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Initialize all Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    // Initialize all Bootstrap modals
    var modalTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="modal"]'))
    modalTriggerList.forEach(function (modalTriggerEl) {
        new bootstrap.Modal(modalTriggerEl)
    })
});