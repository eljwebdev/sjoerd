const BREAKPOINT = 835;

const originalNav = document.querySelector('.nav-original');
const inner = originalNav.querySelector('.nav--inner');
const right = originalNav.querySelector('.right');

let mobileNav = null;

function applyLayout() {
if (window.innerWidth < BREAKPOINT) {
    if (!mobileNav) {
    mobileNav = document.createElement('nav');
    mobileNav.className = originalNav.className + ' nav-new';
    originalNav.insertAdjacentElement('afterend', mobileNav);
    }
    mobileNav.appendChild(right);
} else {
    if (mobileNav) {
    inner.appendChild(right);
    mobileNav.remove();
    mobileNav = null;
    }
}
}

applyLayout();
window.addEventListener('resize', applyLayout);

const button = document.querySelector('.copy-button');
if (button) {
button.addEventListener('click', () => {
    const email = 'info@sjoerdderidder.org';
    navigator.clipboard.writeText(email).then(() => {
        console.log('Email copied to clipboard');
        
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
});
}