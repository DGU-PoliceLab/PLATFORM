import { useState, useEffect } from "react";

function useNotification() {
    const [permission, setPermission] = useState(Notification.permission);

    useEffect(() => {
        if (permission === "default") {
            Notification.requestPermission().then((perm) => {
                setPermission(perm);
            });
        }
    }, [permission]);

    const showNotification = (title, options) => {
        if (permission === "granted") {
            new Notification(title, options);
        } else if (permission === "default") {
            Notification.requestPermission().then((perm) => {
                if (perm === "granted") {
                    new Notification(title, options);
                }
                setPermission(perm);
            });
        } else {
            console.log("Notification permission denied");
        }
    };

    return { permission, showNotification };
}

export default useNotification;
