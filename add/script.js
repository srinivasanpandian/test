let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini info bar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Update UI to notify the user they can add to home screen
    const addToHomeScreenBtn = document.getElementById('addToHomeScreen');
    addToHomeScreenBtn.style.display = 'block';

    addToHomeScreenBtn.addEventListener('click', () => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
            addToHomeScreenBtn.style.display = 'none'; // Hide the button after use
        });
    });
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
});

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
