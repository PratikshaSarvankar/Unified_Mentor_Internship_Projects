
# Interactive India Map

This project is a web-based interactive map of India, built using **Leaflet.js** and **OpenStreetMap APIs**. It allows users to search for locations, locate their current position, and explore nearby amenities like hospitals, schools, and restaurants.



## Features

- **Location Search**: Search for any location in India using the search bar.  
- **Current Location**: Use geolocation to pinpoint your current position on the map.  
- **Nearby Amenities**: Automatically display nearby hospitals, schools, and restaurants.  
- **Interactive Markers**: Clickable markers with detailed information about each amenity.  
- **Custom Icons**: Different icons for each type of amenity for easy identification.  



## Technologies Used

- **HTML/CSS/JavaScript**: Frontend implementation.  
- **Leaflet.js**: Interactive mapping library.  
- **OpenStreetMap**: Data source for maps and amenities.  
- **Overpass API**: Fetch nearby amenities.  
- **Nominatim API**: Geocoding and location search.  


## Run Locally

Clone the project

```bash
  git clone https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects.git
```

Go to the project directory

```bash
  cd Unified_Mentor_Internship_Projects

```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## How to Operate

### Searching for a Location  
- Type the name of a location (e.g., "Dadar" or "Delhi") in the search bar at the top of the page.  
- Click the **Search** button.  
- The map will center on the location and display nearby amenities (hospitals, schools, and restaurants).  

### Finding Your Current Location  
- Click the **Locate Me** button.  
- Allow the browser to access your location.  
- The map will zoom to your current position, display a marker, and show nearby amenities.  

### Interacting with Markers  
- Click on any marker to see details such as the name, type, and address of the amenity.  
- Markers for different amenities have distinct icons for easier identification.  

### Exploring Nearby Amenities  
- Zoom in or out to explore the map.  
- Amenities will be fetched dynamically based on the displayed area.  

## Screenshots

![Webpage view when the map is initially loaded](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Interactive_Map/Screenshots/Screenshot1.png)

![After entering location, showcasing amenities](https://github.com/PratikshaSarvankar/Unified_Mentor_Internship_Projects/blob/main/Interactive_Map/Screenshots/Screenshot2.png)





## Acknowledgements

 - [Leaflet.js](https://leafletjs.com/)
 - [OpenStreetMap](https://www.openstreetmap.org/)
 - [Nominatim API](https://nominatim.org/)
 - [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)

## Contact Information

If you have any questions or feedback, feel free to reach out to me at [pratiksha.s.1702@gmail.com](pratiksha.s.1702@gmail.com).



## License

[MIT](https://choosealicense.com/licenses/mit/)

