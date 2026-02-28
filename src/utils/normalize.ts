import type { InstructionType, Step } from '../types/navigation';

export function normalizeInstruction(raw: string): InstructionType {
    const text = raw.toLowerCase();
    if (text.includes('left')) return 'LEFT';
    if (text.includes('right')) return 'RIGHT';
    if (text.includes('uturn')) return 'UTURN';
    if (text.includes('roundabout')) return 'ROUNDABOUT';
    return 'STRAIGHT';
}

export function metersToKilometers(m: number): number {
    return m / 1000;
}

export function calculateETA(durationSeconds: number): string {
    const minutes = Math.ceil(durationSeconds / 60);
    return `${minutes} min`;
}

export function normalizeSteps(steps: Step[]): Step[] {
    return steps.map((s) => ({
        ...s,
        normalized: s.html_instructions,
    }));
}
