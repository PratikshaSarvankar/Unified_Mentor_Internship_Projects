particlesJS("particles-js", {
  particles: {
    // Number of particles and their density
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800 // Controls how spread out the particles are
      },
    },
    // Particle color
    color: {
      value: "#00bfff" // Matches your color theme
    },
    // Shape of the particles
    shape: {
      type: "circle", // Can be "circle", "edge", "triangle", "polygon", or "star"
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5 // Number of sides for polygon shapes
      },
    },
    // Opacity settings
    opacity: {
      value: 0.5, // Transparency of particles
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      },
    },
    // Size of the particles
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      },
    },
    // Lines connecting the particles
    line_linked: {
      enable: true,
      distance: 150, // Maximum distance for connecting lines
      color: "#00bfff", // Line color
      opacity: 0.4, // Line transparency
      width: 1, // Line width
    },
    // Particle movement settings
    move: {
      enable: true,
      speed: 6, // Speed of particle movement
      direction: "none", // Direction: "none", "top", "top-right", etc.
      random: false,
      straight: false, // Set to true for straight-line movement
      out_mode: "out", // Particle behavior when it goes out of bounds
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      },
    },
  },
  // Interactivity settings
  interactivity: {
    detect_on: "canvas", // Interaction detection mode
    events: {
      onhover: {
        enable: true,
        mode: "grab" // Options: "grab", "bubble", "repulse"
      },
      onclick: {
        enable: true,
        mode: "push" // Options: "push", "remove"
      },
      resize: true, // Auto-adjust on window resize
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1 // Line opacity on hover
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4 // Number of particles added on click
      },
      remove: {
        particles_nb: 2 // Number of particles removed on click
      },
    },
  },
  // Enables retina display for sharper particles
  retina_detect: true,
});
