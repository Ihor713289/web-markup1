function closeDrawer() {
    const drawer = document.getElementById('navigation-drawer')
    drawer.className = 'drawer-closed'
}

function openDrawer() {
    const drawer = document.getElementById('navigation-drawer')
    drawer.className = 'drawer-opened'
}

function closeCookiesMessage() {
    const banner = document.getElementById('cookies-banner')
    banner.style.display = 'none'
}