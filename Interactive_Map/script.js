// Initialize the map centered on India
const map = L.map("map").setView([20.5937, 78.9629], 5); // India center coordinates

// Add a vibrant tile layer to display the map background
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // Attribution for OpenStreetMap
  maxZoom: 19, // Maximum zoom level
}).addTo(map);

// Handle search functionality when the "Search" button is clicked
document.getElementById("searchButton").addEventListener("click", function () {
  const location = document.getElementById("searchInput").value.trim(); // Get user input

  if (location) {
    // Use the Nominatim API to search for the entered location
    fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0]; // Extract latitude and longitude from the API response
          map.setView([lat, lon], 14); // Center the map on the location
          fetchAndDisplayAmenities(lat, lon); // Fetch nearby amenities
        } else {
          alert("Location not found. Please try a different name."); // Alert for invalid location
        }
      })
      .catch((error) => {
        console.error("Error:", error); // Log error details
        alert("There was an error processing your request."); // Show a user-friendly error message
      });
  } else {
    alert("Please enter a location."); // Prompt user to enter a location
  }
});

// Geolocation function to center the map on the user's current location
function locateUser() {
  if (navigator.geolocation) {
    // If geolocation is supported
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude; // Extract latitude
        const lon = position.coords.longitude; // Extract longitude

        map.setView([lat, lon], 14); // Center map on user's location

        // Add a marker to indicate the user's location
        const userMarker = L.marker([lat, lon])
          .addTo(map)
          .bindPopup("You are here!");

        // Add a circle for better visibility of the user's area
        L.circle([lat, lon], {
          color: "blue",
          fillColor: "#2196F3",
          fillOpacity: 0.2,
          radius: 200, // Radius in meters
        }).addTo(map);

        fetchAndDisplayAmenities(lat, lon); // Fetch and display amenities nearby
      },
      function (error) {
        alert("Geolocation failed: " + error.message); // Alert in case of error
      }
    );
  } else {
    alert("Geolocation is not supported by this browser."); // Inform user if geolocation is unavailable
  }
}

// Function to fetch and display nearby amenities on the map
function fetchAndDisplayAmenities(lat, lon) {
  // Clear existing markers before adding new ones
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer); // Remove markers
    }
  });

  const amenities = ["hospital", "school", "restaurant"]; // List of amenities to search

  // Fetch data for each amenity type
  amenities.forEach((type) => {
    fetch(
      `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=${type}](around:10000,${lat},${lon});out;`
    )
      .then((response) => response.json())
      .then((data) => {
        data.elements.forEach((element) => {
          const name = element.tags.name || "No name available"; // Get name or fallback text
          const address =
            element.tags["addr:full"] ||
            element.tags["addr:street"] ||
            "Address not available"; // Get address if available
          const markerIcon = getMarkerIcon(type); // Get icon for the amenity type

          // Add a marker for the amenity
          L.marker([element.lat, element.lon], { icon: markerIcon })
            .addTo(map)
            .bindPopup(
              `<b>${name}</b><br><i>${type.charAt(0).toUpperCase() + type.slice(1)}</i><br><i>${address}</i>`
            );
        });
      })
      .catch((error) => console.error("Error fetching amenities:", error)); // Log errors
  });
}

// Function to return an appropriate marker icon based on the amenity type
function getMarkerIcon(type) {
  let iconUrl = ""; // Default icon URL

  // Define icon URLs based on amenity type
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
      iconUrl = "https://img.icons8.com/ios/452/place-marker.png"; // Default marker icon
      break;
  }

  // Return Leaflet icon configuration
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point where the icon is anchored
    popupAnchor: [0, -32], // Position of the popup relative to the icon
  });
}
