/* ==========================================================================
   SITE CONTENT
   --------------------------------------------------------------------------
   Everything you see on the site is defined in this file. Edit text here,
   add or remove entries, and swap images — no other file needs to change.

   IMAGES / VIDEO
   Every media item looks like this:
     { src: "", label: "[HeatGuard Hero Image]", caption: "…", ratio: "16/9" }
   - Leave `src` empty to show a labelled placeholder.
   - Put your file in portfolio/assets/images/ and set
       src: "assets/images/heatguard-hero.jpg"
   - For a video/GIF preview use type: "video" (mp4/webm) or just a .gif src.
   - `ratio` is width/height, e.g. "16/9", "4/5", "1/1", "3/2".

   POSTERS
   While a project's first image is empty, it is shown as a typographic
   poster in the project's own colours (see `poster` on each project).
   In `wordmark`, wrap part of the name in *asterisks* to colour it with
   the poster accent. Once you add a real `src`, the photo replaces it.

   Items marked  TODO  are placeholders waiting for your real details.
   ========================================================================== */

window.SITE = {
  /* ------------------------------------------------------------------ */
  profile: {
    name: "Daksh Arya",
    initials: "da", // shown as the logo, followed by a small square
    location: "Singapore",
    school: "SUTD",
    timezone: "Asia/Singapore",
    // Each line of the big hero headline. muted: true renders it in grey.
    // A trailing "." becomes the small square full stop.
    heroLines: [
      { text: "Hey, I'm Daksh." },
      { text: "I build things that", muted: true },
      { text: "think, sense & respond." },
    ],
    heroIntro:
      "Computer Science & Design student at SUTD building products across AI, software, computer vision and hardware.",
    rightNow: [
      "Computer Science & Design @ SUTD",
      "Building AI systems, products and experiments.",
    ],
  },

  contact: {
    email: "hello@example.com", // TODO: your email
    linkedin: "https://www.linkedin.com/in/your-handle", // TODO: your LinkedIn URL
    github: "https://github.com/DevDaksh13", // TODO: confirm GitHub URL
  },

  /* ------------------------------------------------------------------ */
  /* FEATURED PROJECTS                                                   */
  /* layout options: "feature" | "split" | "stack" | "carousel" | "floating"
     - feature : one full-width image + supporting images in a row
     - split   : two-column image layout
     - stack   : one large image + two stacked smaller images
     - carousel: horizontal, swipeable carousel
     - floating: full-width screenshot with floating metadata           */
  /* results: { value: "15%", text: "…" } shows a big number; omit `value`
     for awards and other non-numeric outcomes.                          */
  projects: [
    {
      id: "heatguard",
      color: "#c2410c", // title colour on the light background
      poster: { bg: "#23140e", fg: "#f7e9dc", accent: "#ff6a2b", style: "heavy", wordmark: "*Heat*Guard", tagline: "Heat strain, caught early" },
      category: "Wearable / IoT / Product Development",
      title: "HeatGuard",
      hook: "A wearable system designed to detect individual heat strain before symptoms escalate.",
      year: "", // TODO: e.g. "2025"
      layout: "feature",
      media: [
        { src: "", label: "[HeatGuard Hero Image]", caption: "Wearable prototype", ratio: "16/8" },
        { src: "", label: "[HeatGuard PCB]", caption: "Sensor board", ratio: "4/3" },
        { src: "", label: "[HeatGuard Dashboard]", caption: "Supervisor dashboard", ratio: "4/3" },
        { src: "", label: "[HeatGuard Field Test]", caption: "Field testing", ratio: "4/3" },
      ],
      objective:
        "Protect outdoor workers by monitoring individual physiological heat strain rather than relying only on environmental measurements.",
      actions: [
        "Built an ESP32-based wearable using heart rate, skin temperature and motion sensors",
        "Developed a live React dashboard for supervisors",
        "Designed real-time heat-strain risk scoring and alerts",
      ],
      results: [
        { value: "10", text: "construction workers in the pilot design" },
        { value: "S$2k", text: "prototype funding received" },
        { text: "Create4Good Semi-Finalist" },
      ],
      stack: ["ESP32", "React", "IoT", "Sensors", "Embedded Systems"],
      links: [], // e.g. { label: "GitHub", url: "https://github.com/…" }
      story:
        "[Placeholder — Behind the project] Two or three sentences on why HeatGuard started, the hardest problem along the way, and what you learnt from testing it with real people.",
    },
    {
      id: "wallee",
      color: "#2f5d4a",
      poster: { bg: "#dfe3dd", fg: "#1c2a23", accent: "#3f7a5e", style: "italic", wordmark: "Wall*ee*", tagline: "A printer that watches itself" },
      category: "AI / Computer Vision / Research",
      title: "Wallee",
      hook: "An AI-driven closed-loop system that watches 3D prints and reacts to defects.",
      year: "",
      layout: "split",
      media: [
        { src: "", label: "[Wallee Camera Setup]", caption: "Camera rig over the print bed", ratio: "1/1" },
        { src: "", label: "[Wallee Experiment Image]", caption: "Baseline vs. Wallee print", ratio: "1/1" },
        { src: "", label: "[Wallee Monitoring UI]", caption: "Monitoring interface", ratio: "16/10" },
        { src: "", label: "[Wallee Measurements]", caption: "Dimensional measurements", ratio: "16/10" },
      ],
      objective:
        "Improve FDM printing quality using AI-assisted visual monitoring and intervention.",
      actions: [
        "Built a vision-based print monitoring pipeline",
        "Integrated AI reasoning with printer telemetry",
        "Ran controlled print experiments and dimensional measurements",
      ],
      results: [
        { value: "15%", text: "lower dimensional error than baseline stock printing" },
        { value: "10", text: "controlled print experiments" },
      ],
      stack: ["Computer Vision", "AI", "Python", "PrusaLink", "VLMs"],
      links: [],
      story:
        "[Placeholder — Behind the project] What made you want a printer that watches itself, and what surprised you in the experiments.",
    },
    {
      id: "reslot",
      color: "#3b7a35",
      poster: { bg: "#17301f", fg: "#e7f1e2", accent: "#9fd86b", style: "bold", wordmark: "*Re*Slot", tagline: "Recycle → reward" },
      category: "Full Stack / IoT / Sustainability",
      title: "ReSlot",
      hook: "Turning recycling into an interactive reward experience.",
      year: "",
      layout: "stack",
      media: [
        { src: "", label: "[ReSlot Prototype]", caption: "Physical prototype", ratio: "4/3" },
        { src: "", label: "[ReSlot Website UI]", caption: "Rewards web app", ratio: "16/10" },
        { src: "", label: "[ReSlot ESP32 Setup]", caption: "ESP32 wiring", ratio: "16/10" },
        { src: "", label: "[ReSlot Demo Day]", caption: "Event demo", ratio: "16/9" },
      ],
      objective:
        "Encourage recycling with a physical, interactive system that rewards users digitally.",
      actions: [
        "Connected multiple ESP32 devices to a local web application",
        "Built HTTP/API communication between hardware and software",
        "Developed the interactive frontend and token system",
      ],
      results: [
        { value: "Top 12", text: "out of 120 projects" },
        { text: "Sustainability Practice Award" },
      ],
      stack: ["ESP32", "JavaScript", "React", "PHP", "HTTP", "JSON"],
      links: [],
    },
    {
      id: "mindlift",
      color: "#2d3f94",
      poster: { bg: "#10183a", fg: "#eef0fb", accent: "#93a5ff", style: "split", wordmark: "Mind*Lift*", tagline: "Help, before you ask" },
      category: "AI / Computer Vision / Education",
      title: "MindLift",
      hook: "A proactive AI tutor that notices when a student needs help before they ask.",
      year: "",
      layout: "carousel",
      media: [
        { src: "", label: "[MindLift Demo]", caption: "Prototype in use", ratio: "16/10" },
        { src: "", label: "[MindLift Camera Setup]", caption: "Overhead camera", ratio: "16/10" },
        { src: "", label: "[MindLift Interaction Flow]", caption: "User interaction flow", ratio: "16/10" },
        { src: "", label: "[MindLift Architecture]", caption: "System architecture", ratio: "16/10" },
      ],
      objective:
        "Explore whether AI tutoring systems can proactively identify when students are struggling.",
      actions: [
        "Used an overhead camera to observe student work",
        "Combined OCR and LLM reasoning",
        "Built inactivity detection and proactive hint generation",
      ],
      results: [],
      stack: ["OCR", "LLM", "Computer Vision", "Python", "TTS"],
      links: [],
    },
    {
      id: "web2api",
      color: "#8a6100",
      poster: { bg: "#161616", fg: "#f2f2f2", accent: "#f5b301", style: "mono", wordmark: "web2*api*()", tagline: "Ask in English, get JSON" },
      category: "AI / Developer Tools",
      title: "Web2API",
      hook: "Turning natural-language requests into structured web-data APIs.",
      year: "",
      layout: "floating",
      media: [
        { src: "", label: "[Web2API Screenshot]", caption: "Interface", ratio: "16/8" },
        { src: "", label: "[Web2API API Example]", caption: "Request → structured JSON", ratio: "16/10" },
        { src: "", label: "[Web2API Architecture]", caption: "Architecture", ratio: "16/10" },
      ],
      objective:
        "Make extracting structured web data easier through natural-language interaction.",
      actions: [
        "Used LLMs to interpret user requests",
        "Converted web information into structured outputs",
        "Exposed results through API endpoints",
      ],
      results: [],
      stack: ["OpenAI API", "Python", "APIs", "Web Data"],
      links: [],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* HACKATHON BUILDS — add more objects to this list                    */
  hackathonProjects: [
    {
      id: "apneaware",
      title: "ApneAware",
      subtitle: "IoT Sleep Apnea Early Detection Device",
      event: "What The Hack 2025",
      organisation: "Singapore University of Technology and Design (SUTD)",
      date: "Sep 2025",
      category: "HealthTech / IoT / Embedded Systems",
      hook: "A non-invasive wearable for early sleep apnea risk screening.",
      media: [
        { src: "", label: "[ApneAware Ring Prototype]", caption: "3D-printed finger-ring wearable", ratio: "1/1" },
        { src: "", label: "[ApneAware Electronics]", caption: "ESP32 + heart-rate sensor", ratio: "1/1" },
        { src: "", label: "[ApneAware App]", caption: "Companion app", ratio: "1/1" },
        { src: "", label: "[ApneAware Team]", caption: "At the hackathon", ratio: "1/1" },
      ],
      objective:
        "Make preliminary sleep apnea screening more accessible without a traditional overnight sleep study.",
      actions: [
        "Engineered a 3D-printed finger-ring wearable with an ESP32 and heart-rate sensor",
        "Streamed physiological data in real time using Arduino",
        "Built a companion app that turns heart-rate and HRV patterns into a personal risk assessment",
      ],
      results: [
        "A low-cost, non-invasive prototype that encourages earlier screening and medical follow-up",
        "Designed around undiagnosed sleep apnea among older adults",
      ],
      stack: ["ESP32", "Arduino", "IoT", "Embedded Systems", "Mobile App", "3D Printing", "HealthTech"],
      links: [], // e.g. { label: "GitHub", url: "…" }, { label: "Demo", url: "…" }
    },
  ],

  /* ------------------------------------------------------------------ */
  /* ALSO ON THE WORKBENCH — small experiments (all TODO: replace)       */
  workbench: [
    {
      title: "ESP32 sketches",
      tags: "Hardware",
      year: "",
      description: "Short experiments with sensors, displays and wireless links on ESP32 boards.",
      media: { src: "", label: "[ESP32 Experiment]", ratio: "4/3" },
    },
    {
      title: "Vision playground",
      tags: "Computer Vision",
      year: "",
      description: "OpenCV experiments in detection, tracking and measuring things through a camera.",
      media: { src: "", label: "[CV Experiment]", ratio: "4/3" },
    },
    {
      title: "Agent prototypes",
      tags: "AI",
      year: "",
      description: "Small LLM prototypes to test ideas before they become full projects.",
      media: { src: "", label: "[AI Prototype]", ratio: "4/3" },
    },
    {
      title: "Weekend web builds",
      tags: "Software",
      year: "",
      description: "Small tools and interfaces built to scratch an itch.",
      media: { src: "", label: "[Software Build]", ratio: "4/3" },
    },
    {
      title: "Hackathon leftovers",
      tags: "Hackathons",
      year: "",
      description: "Ideas that started at a hackathon and kept going afterwards.",
      media: { src: "", label: "[Hackathon Experiment]", ratio: "4/3" },
    },
  ],

  /* ------------------------------------------------------------------ */
  about: {
    heading: "Hey, I'm Daksh.",
    aside: "Usually building something with a sensor, a camera or a model — often all three.",
    background: [
      "Computer Science & Design student at SUTD, interested in technology that connects software, AI and the physical world.",
      "I enjoy taking ideas from early prototypes to systems that people can actually test and use.",
    ],
    expertise: [
      "Artificial Intelligence",
      "Computer Vision",
      "Software Engineering",
      "Full-Stack Development",
      "IoT & Embedded Systems",
      "Product Development",
    ],
    aspirations:
      "I want to build intelligent products that solve meaningful real-world problems, and grow into an engineer who can take ambitious ideas from concept to scale.",
    photos: [
      { src: "", label: "[Portrait / Candid Photo]", caption: "", ratio: "4/5" },
      { src: "", label: "[Supporting Photo]", caption: "", ratio: "1/1" },
    ],
  },

  skills: [
    "Python", "JavaScript", "SQL", "HTML/CSS", "React", "Node.js",
    "FastAPI", "REST APIs", "OpenCV", "NumPy", "PyTorch", "TensorFlow",
  ],

  /* ------------------------------------------------------------------ */
  /* EXPERIENCE — work, research and roles. Add internships here.        */
  experience: [
    {
      organisation: "SUTD DAI Fab Lab",
      role: "Undergraduate Research Assistant",
      dates: "20XX — Present", // TODO
      summary: "Supporting research through prototyping, fabrication and experiments.", // TODO: refine
    },
    {
      organisation: "HeatGuard",
      role: "Co-Founder / Product Development",
      dates: "20XX — Present", // TODO
      summary: "Leading the product from sensor prototype to a supervisor-facing dashboard.",
    },
  ],

  /* IMMERSION PROGRAMMES — kept separate from experience on purpose.    */
  immersionProgrammes: [
    {
      organisation: "ShukShuk",
      role: "AI Concierge Immersion Programme",
      dates: "20XX", // TODO
      summary: "Worked on an AI concierge product inside a real company team.", // TODO: refine
    },
  ],

  leadership: [
    { role: "President", organisation: "SUTD Table Tennis Club", note: "Running the club, its training and events." },
    { role: "Co-Founder", organisation: "HeatGuard", note: "Building the team and the product together." },
    { role: "Builder", organisation: "Hackathons & student innovation", note: "Forming teams and shipping in a weekend." },
  ],

  /* ------------------------------------------------------------------ */
  /* CERTIFICATIONS — 3 to 6 entries work best. All TODO.                */
  certifications: [
    { name: "[Certification Name]", issuer: "[Issuing Organisation]", year: "2025", url: "#", logo: "" },
    { name: "[Certification Name]", issuer: "[Issuing Organisation]", year: "2025", url: "#", logo: "" },
    { name: "[Certification Name]", issuer: "[Issuing Organisation]", year: "2024", url: "#", logo: "" },
    { name: "[Certification Name]", issuer: "[Issuing Organisation]", year: "2024", url: "#", logo: "" },
  ],
};
