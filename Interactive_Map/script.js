// Initialize the map centered on India
const map = L.map("map").setView([20.5937, 78.9629], 5); // India center

// Add a vibrant tile layer to make the map colorful
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);

// Handle search functionality
document.getElementById("searchButton").addEventListener("click", function () {
  const location = document.getElementById("searchInput").value.trim();

  if (location) {
    // Use Nominatim API to search for the location
    fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0]; // Use the first result
          map.setView([lat, lon], 14); // Zoom into the location
          fetchAndDisplayAmenities(lat, lon); // Fetch and display amenities
        } else {
          alert("Location not found. Please try a different name.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error processing your request.");
      });
  } else {
    alert("Please enter a location.");
  }
});

// Geolocation function to center the map on the user's current location
function locateUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Set the map view to the user's location
      map.setView([lat, lon], 14);

      // Add a marker for the user's location
      const userMarker = L.marker([lat, lon]).addTo(map).bindPopup("You are here!");

      // Optional: Add a circle around the user's location for better visibility
      const userLocationCircle = L.circle([lat, lon], {
        color: 'blue',
        fillColor: '#2196F3',
        fillOpacity: 0.2,
        radius: 200,
      }).addTo(map);

      // Fetch and display amenities near the user's location
      fetchAndDisplayAmenities(lat, lon);

    }, function (error) {
      alert("Geolocation failed: " + error.message);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Add a button to trigger geolocation
const locateButton = document.createElement("button");
locateButton.textContent = "Locate Me";
locateButton.style.position = "absolute";
locateButton.style.top = "10px";
locateButton.style.right = "60px"; // Adjusted to shift slightly to the left
locateButton.style.padding = "10px";
locateButton.style.backgroundColor = "#4CAF50";
locateButton.style.color = "white";
locateButton.style.border = "none";
locateButton.style.borderRadius = "5px";
locateButton.style.cursor = "pointer";
locateButton.addEventListener("click", locateUser);
document.body.appendChild(locateButton);

// Function to fetch and display amenities on the map with different markers
function fetchAndDisplayAmenities(lat, lon) {
  // Clear existing markers before adding new ones
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Amenities to search for (hospitals, schools, restaurants)
  const amenities = ["hospital", "school", "restaurant"];

  amenities.forEach((type) => {
    fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=${type}](around:10000,${lat},${lon});out;`)
      .then((response) => response.json())
      .then((data) => {
        // Add new markers for the selected type with different icons
        data.elements.forEach((element) => {
          const name = element.tags.name || "No name available";
          const address =
            element.tags["addr:full"] ||
            element.tags["addr:street"] ||
            "Address not available"; // Display address if available
          const markerIcon = getMarkerIcon(type); // Get the appropriate marker icon
          const marker = L.marker([element.lat, element.lon], { icon: markerIcon })
            .addTo(map)
            .bindPopup(
              `<b>${name}</b><br><i>${type.charAt(0).toUpperCase() + type.slice(1)}</i><br><i>${address}</i>`
            );
        });
      })
      .catch((error) => console.error("Error fetching amenities:", error));
  });
}

// Function to return the appropriate marker icon based on the amenity type
function getMarkerIcon(type) {
  let iconUrl = "";
  switch (type) {
    case "hospital":
      iconUrl = "icons/hospital.png";
      break;
    case "school":
      iconUrl = "icons/school.png";
      break;
    case "restaurant":
      iconUrl = "icons/restaurant-building.png";
      break;
    default:
      iconUrl = "https://img.icons8.com/ios/452/place-marker.png"; // Default icon
      break;
  }
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}
