const snsIcons = document.querySelectorAll('.sns-icon');

snsIcons.forEach(icon => {
    const colorSrc = icon.getAttribute('data-color-src');

    icon.addEventListener('mouseover', function () {
        this.dataset.originalSrc = this.src;
        this.src = colorSrc;
    });
    icon.addEventListener('mouseout', function() {
        this.src = this.dataset.originalSrc;
    });
});