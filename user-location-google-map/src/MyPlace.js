import Map from "./UI/Map";
import sanirizeHTML from "sanitize-html";

class LoadedPlace {
    constructor(coords, address) {
        new Map(coords);
        const headerTitle = document.querySelector("header h1");
        headerTitle.textContent = sanirizeHTML(address);
    }
}

const url = new URL(location.href);
const queryParams = url.searchParams;

const locId = queryParams.get("location");

console.log("LOCID:", locId)

fetch("http://localhost:3000/location/" + locId)
    .then(resp => {
        if (resp.status === 404) {
            throw new Error("Could not find location!")
        }
        return resp.json();
    })
    .then(data => {
        console.log(data);
        new LoadedPlace(data.coordinates, data.address)
    })
    .catch(err => alert(err.message));
