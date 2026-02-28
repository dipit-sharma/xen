import axios from 'axios';

type DirectionsResponse = any; // simplify

export async function fetchDirections(origin: string, destination: string): Promise<DirectionsResponse> {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error('Google API key not configured');

    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const resp = await axios.get(url, {
        params: {
            origin,
            destination,
            key: apiKey,
        },
    });

    if (resp.data.status !== 'OK') {
        throw new Error(`Google API error: ${resp.data.status}`);
    }

    // return raw data for now
    return resp.data;
}
