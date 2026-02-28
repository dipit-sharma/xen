export type InstructionType =
    | 'LEFT'
    | 'RIGHT'
    | 'STRAIGHT'
    | 'UTURN'
    | 'ROUNDABOUT';

export interface Step {
    distance: number; // in meters
    duration: number; // in seconds
    instruction: string; // raw text from Google
    normalized?: InstructionType;
}

export interface RouteResponse {
    summary: string;
    distance: number; // meters
    duration: number; // seconds
    steps: Step[];
}

export interface NavigationUpdate {
    sessionId: string;
    timestamp: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}
