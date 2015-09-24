function triggerGoogleLoaded() {
    console.log("Google SignIn Callback");
    window.dispatchEvent(new Event('google-loaded'));
}