const GOOGLE_API_KEY = "AIzaSyDp6FscXFS81SNuiEjxgiQgZ1R3B_I8j0c";

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address);

    const response = await fetch(
       `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch coordinates.")
    }

    const data = await response.json();

    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

export async function getAddressFromCoords(coords) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch address.")
    }

    const data = await response.json();

    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const address = data.results[0].formatted_address;

    return address;
}