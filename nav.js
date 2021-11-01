document.addEventListener("click",e => {
    const isDropdownButton = e.target.hasAttribute('data-dropdown-button');
    let closest = e.target.closest('[data-dropdown]');
    if (!isDropdownButton && closest != null) return;

    let currentDropdown;
    if (isDropdownButton){
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active');
    }

    let dds = document.querySelectorAll("[data-dropdown].active")
    dds.forEach(dropdown =>{
        if (dropdown == currentDropdown) return;
        dropdown.classList.remove('active');
    });
});