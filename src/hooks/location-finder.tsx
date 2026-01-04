'use client';

import { useEffect, useRef, useState } from 'react';

type LocationWithAddress = {
    latitude: number | null;
    longitude: number | null;
    area: string | null;
    subArea: string | null;
    city: string | null;
    displayAddress: string | null;
    error: string | null;
};

export function useLiveLocationWithAddress() {
    const [data, setData] = useState<LocationWithAddress>({
        latitude: null,
        longitude: null,
        area: null,
        subArea: null,
        city: null,
        displayAddress: null,
        error: null
    });

    const [enabled, setEnabled] = useState(false); // 👈 control flag
    const lastFetchRef = useRef<string | null>(null);
    const watcherRef = useRef<number | null>(null);

    const requestLocation = () => {
        setData((p) => ({ ...p, error: null }));
        setEnabled(true);
    };

    useEffect(() => {
        if (!enabled) return; // 🚫 do nothing until user clicks

        if (!navigator.geolocation) {
            setData((p) => ({ ...p, error: 'Geolocation not supported' }));

            return;
        }

        watcherRef.current = navigator.geolocation.watchPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const key = `${lat.toFixed(4)}-${lon.toFixed(4)}`;
                if (lastFetchRef.current === key) return;

                lastFetchRef.current = key;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
                    );

                    const json = await res.json();
                    const address = json.address || {};

                    const area = address.suburb || address.neighbourhood || address.village || null;

                    const subArea = address.locality || address.city_district || address.town || null;

                    const city = address.city || address.town || address.state_district || 'Bengaluru';

                    const displayAddress = [area, subArea ? `(${subArea})` : null, city].filter(Boolean).join(', ');

                    setData({
                        latitude: lat,
                        longitude: lon,
                        area,
                        subArea,
                        city,
                        displayAddress,
                        error: null
                    });
                } catch {
                    setData((p) => ({
                        ...p,
                        error: 'Unable to fetch address'
                    }));
                }
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    setData((p) => ({
                        ...p,
                        error: 'Permission denied. Enable location in browser.'
                    }));
                } else {
                    setData((p) => ({ ...p, error: err.message }));
                }
            },
            { enableHighAccuracy: true }
        );

        return () => {
            if (watcherRef.current !== null) {
                navigator.geolocation.clearWatch(watcherRef.current);
            }
        };
    }, [enabled]);

    return {
        ...data,
        requestLocation // 👈 exposed to parent
    };
}
