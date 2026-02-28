import { useEffect, useRef, useState } from 'react';
import type { NavigationUpdate, RouteResponse } from '../types/navigation';
import { normalizeSteps } from '../utils/normalize';
import { NavigatorSocket } from '../services/socket';

export function useNavigation() {
    const [route, setRoute] = useState<RouteResponse | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [sessionId] = useState(() => crypto.randomUUID());
    const [status, setStatus] = useState<'connecting' | 'open' | 'closed' | 'error'>('closed');
    const socketRef = useRef<NavigatorSocket | null>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (route) {
            socketRef.current = new NavigatorSocket(sessionId, {
                onOpen: () => setStatus('open'),
                onClose: () => setStatus('closed'),
                onError: () => setStatus('error'),
            });
        }
        return () => {
            socketRef.current?.close();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [route, sessionId]);

    useEffect(() => {
        if (socketRef.current) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = window.setInterval(() => {
                const update: NavigationUpdate = {
                    sessionId,
                    currentStep,
                    timestamp: Date.now(),
                };
                socketRef.current?.send(update);
            }, 2500);
        }
    }, [currentStep, sessionId]);

    const startNavigation = (response: RouteResponse) => {
        const normalized = normalizeSteps(response.routes[0].legs[0].steps);
        setRoute({ ...response, steps: normalized });
        setCurrentStep(0);
    };

    const stopNavigation = () => {
        setRoute(null);
        setCurrentStep(0);
        socketRef.current?.close();
    };

    const nextStep = () => {
        if (route && currentStep < route.steps.length - 1) {
            setCurrentStep((i) => i + 1);
        }
    };

    return {
        route,
        currentStep,
        status,
        startNavigation,
        stopNavigation,
        nextStep,
    };
}
