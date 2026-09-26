# Windows 7 Aero Portfolio - Achilles Feratidis

A personal portfolio website designed in the style of classic Windows 7 and Windows Forms applications (About Me, Projects Explorer, and Contact).

Built with C# and compiled to WebAssembly (Wasm) with authentic Windows 7 Aero Glass styling. All application logic runs securely as binary bytecode in the browser sandbox. Hosted on GitHub Pages.

Live Website: https://AF2310.github.io/portfolio_winforms/

---

## About This Website

This portfolio is styled to look and feel like an authentic Windows 7 desktop application. It includes translucent window borders, classic window buttons (minimize, maximize, close), menu bars, and a desktop taskbar with a Start button and working system tray clock.

---

## Pages Included

### 1. About Me (index.html)
- A brief introduction and profile photos.
- Childhood memory (playing MAME 32 arcade games).
- Creative and tech inspirations (BlackBerry 2023, WarGames 1983, Star Trek: Deep Space Nine, Metropolis 2001, 2001: A Space Odyssey, The Social Network, and Mr. Robot).
- My Future Goal: nirvana.
- Technical skills overview with beginner-friendly descriptions (HTML, CSS, JavaScript, C#, Python, Java, and SQL).

### 2. Projects Explorer (projects.html)
- A collection of 11 practical software, operating systems, desktop, and networking projects.
- Category Filter Bar: Filter projects by clicking All (11), Systems & OS (3), Networking (2), Python (3), Java & OOP (4), C# / WinForms (2), or Web & Cloud (2).
- Search Box: Type any keyword, project name, or programming language to find matching cards instantly.
- Near Full-Screen Image Viewer: Click any project screenshot once to open it in a large, near full-screen window with Next and Previous buttons and keyboard arrow key navigation.

### 3. Contact (contact.html)
- A Windows Forms-style message dispatcher form.
- Protects personal email addresses from spam crawlers by not showing raw email addresses in the source code.
- Includes an invisible anti-spam honeypot field and a Windows message confirmation box when submitted.

---

## Projects Included

1. Ancient Greek Learning Web App: An educational web app built with React and TypeScript to help students practice Ancient Greek words.
2. .NET Project Scanner: A C# Windows Forms desktop application that searches folders for .NET projects, builds them, runs tests, and saves a JSON report.
3. Automated Security Testing Pipeline: A Python tool that runs automated web security scans with OWASP ZAP and tests applications inside Docker containers.
4. Kiosk Self-Service Application: A touchscreen fast food ordering desktop app made with Java, JavaFX, and a MySQL database.
5. Home Alarm System (IoT): A home alarm made with a Raspberry Pi Pico, motion sensors, and an alarm buzzer that sends alerts over Wi-Fi.
6. Solar System Simulation: A Java program modeling planets, moons, and their orbits using object-oriented classes and unit tests.
7. Maxi-Yatzy Multi-Player Game: A Python and Jupyter Notebook dice game where players take turns and fill in their scorecards.
8. Operating Systems Suite: Java simulations of virtual memory paging and CPU scheduling algorithms (Round Robin and First-Come First-Served).
9. Network Protocols & Appliance Testing: A custom HTTP web server in Java, a TFTP UDP file transfer server, and Python tests for a NAT64 network appliance.
10. Linux Admin & Shell Automation: University coursework on Linux user permissions, system administration, and automation scripts written in Bash.
11. Windows Forms Applications: A collection of three C# Windows Forms desktop apps: a health and retirement calculator (Assignment 3), an appointment booking tool (Assignment 4), and an event participant manager (Assignment 5).

---

## Privacy and Image Cleaning

- All images in this repository had their GPS locations, camera models, and device metadata completely removed before uploading.
- All frontend logic, data models, and filtering are compiled into WebAssembly binary bytecode (.wasm), protecting client-side source code from plain-text exposure.
- No personal email addresses are written in the public HTML or CSS code to prevent automated scraper bots from collecting them.

---

## How to Run Locally

You can open this project on any computer with a web browser:

1. Clone or download this repository.
2. Open index.html in your web browser (Chrome, Firefox, or Edge).
3. Alternatively, start a simple local server using Python:
   python -m http.server 8000
4. Visit http://localhost:8000 in your browser.
