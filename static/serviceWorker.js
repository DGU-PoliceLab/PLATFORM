self.addEventListener("push", function (event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || "Default Title";
    const options = {
        body: data.body || "Default Body",
        icon: data.icon || "/logo.png",
        badge: data.badge || "/logo.png",
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
