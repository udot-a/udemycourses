export default class {
    constructor(coords) {
        this.render(coords);
    }

    render(coords) {
        if (!google) {
            alert("Could not load google maps library. Please try again later.");

            return;
        }

        const map = new google.maps.Map(
            document.getElementById("map"),
            {
                center: coords,
                zoom: 16
            });

        new google.maps.Marker({
            position: coords,
            map
        })

    }
}
