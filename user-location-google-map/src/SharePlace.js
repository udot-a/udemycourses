import Modal from "./UI/Modal";
import Map from "./UI/Map";
import { getCoordsFromAddress, getAddressFromCoords } from "./Utility/Location";

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector("form");
        const locateUserBtn = document.getElementById("locate-btn");
        this.shareBtn = document.getElementById("share-btn");

        this.shareBtn.addEventListener("click", this.sharePlaceHandler.bind(this));

        locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));

        addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    }

    sharePlaceHandler() {
        const shareLinkInput = document.getElementById("share-link");

        if (!navigator.clipboard) {
            shareLinkInput.select();
            return;
        }

        navigator.clipboard.writeText(shareLinkInput.value)
            .then(() => {
                alert("Copied into clipboard!")
            })
            .catch(err => {
                console.log(err);
                shareLinkInput.select();
            });
    }

    selectPlace(coords, address) {
        if (this.map) {
            this.map.render(coords);
        } else {
            this.map = new Map(coords);
        }

        fetch("http://localhost:3000/add-location", {
            method: "POST",
            body: JSON.stringify({
                address,
                lat: coords.lat,
                lng: coords.lng
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(resp => resp.json())
            .then(({id, message}) => {
                console.log("Server message: ", message);

                this.shareBtn.disabled = false;

                const shareLinkInput = document.getElementById("share-link");

                shareLinkInput.value = `${location.origin}/my-place?location=${id}`;

            });

    }

    async locateUserHandler() {
        if (!navigator.geolocation) {
            console.warn("Location feature are not available in your browser...");
            return;
        }

        const modal = new Modal("loading-modal-content", "Loading location ...");

        modal.show();

        navigator.geolocation.getCurrentPosition(
            async success => {
                const coordinates = {
                    lat: success.coords.latitude,
                    lng: success.coords.longitude
                };

                const address = await getAddressFromCoords(coordinates);

                modal.hide();

                this.selectPlace(coordinates, address);
            },
                error => {
                    modal.hide();

                    console.warn("Could not locate your position...")
                });
    }

    async findAddressHandler(event) {
        event.preventDefault();

        console.log("EVENT TARGET", event.target);
        const address = event.target.querySelector("input").value;

        if (!address || address.trim().length === 0) {
            alert("Invalid address enter. Please try again...");
            return;
        }

        const modal = new Modal("loading-modal-content", "Loading location ...");

        modal.show();

        try {
            const coordinates = await getCoordsFromAddress(address);

            this.selectPlace(coordinates, address);
        } catch(err) {
            alert(err.message);
        }

        modal.hide();
    }
}

new PlaceFinder();
