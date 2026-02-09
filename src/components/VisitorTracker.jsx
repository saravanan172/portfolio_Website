import { useEffect } from 'react';

const VisitorTracker = () => {
    useEffect(() => {
        const trackVisitor = async () => {
            try {
                // 1. Capture basic info
                const visitorData = {
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    screenResolution: `${window.screen.width}x${window.screen.height}`,
                    path: window.location.pathname,
                    referrer: document.referrer || 'Direct',
                };

                // 2. Fetch IP (using a public API)
                try {
                    const ipResponse = await fetch('https://api.ipify.org?format=json');
                    const ipData = await ipResponse.json();
                    visitorData.ip = ipData.ip;
                } catch (e) {
                    visitorData.ip = 'Unknown';
                }

                // 3. Store Data (Currently using LocalStorage as a fallback/mock)
                // In a real production app, you would send this to Supabase/Firebase here.
                const existingLogs = JSON.parse(localStorage.getItem('visitor_logs') || '[]');

                // Only log if it's a "new" session or unique enough (simple throttle)
                const lastLog = existingLogs[0];
                const isNewLogNeeded = !lastLog ||
                    (new Date() - new Date(lastLog.timestamp) > 1000 * 60 * 30) || // 30 mins
                    lastLog.ip !== visitorData.ip;

                if (isNewLogNeeded) {
                    existingLogs.unshift(visitorData);
                    localStorage.setItem('visitor_logs', JSON.stringify(existingLogs.slice(0, 100))); // keep last 100
                }

                console.log('Visitor Tracked:', visitorData);
            } catch (error) {
                console.error('Tracking Error:', error);
            }
        };

        trackVisitor();
    }, []);

    return null; // Invisible component
};

export default VisitorTracker;
