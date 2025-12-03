OCI Eagle Eye — Global OCI Resource View (Mock)

OCI Eagle Eye is a lightweight, front-end-only React dashboard that gives a clean “global console” view of Oracle Cloud resources using mock data.
Perfect for demos, workshops, architecture discussions, and screenshots — with no real tenancy access required.

This project is built with Vite + React, deployable to GitHub Pages, and fully self-contained.

✨ Features
🌍 Global Region Overview

Region health (Healthy / Degraded / Read-only)

Active resources count

Critical incidents

Estimated cost for the day (mock)

🧭 Resource Inventory Table

Filter by Region, Service, Compartment, and Search

Click any resource row to instantly zoom in to its compartment

Supports OKE, Compute, ADB, LB, Object Storage, Functions, Networking, etc. (mock data)

🧱 Compartment Zoom Panel

Clicking a resource shows:

Resources per compartment

Active resources

Regions spanned

Services breakdown

Owner, environment (Prod/Dev/Shared), description

Sample resources preview

💡 Fully Front-End Only

No backend

No OCI APIs

Safe for public hosting

Ideal for GitHub Pages, S3/OCI Object Storage hosting, or offline demos

📦 Project Structure
oci-eagle-eye/
  index.html
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    ociResources.js
    index.css


Note: node_modules is intentionally not included to keep the repo clean.

▶️ Run Locally
Requirements

Node.js 18+

npm

Steps
npm install
npm run dev


Then open:

http://localhost:5173

🌐 Deploy to GitHub Pages

This repo already includes:

gh-pages package

predeploy and deploy scripts

Correct Vite config:

base: "/oci-eagle-eye/"

Deploy
npm install
npm run deploy


Your dashboard will be published to:

https://<your-username>.github.io/oci-eagle-eye/

🚀 Future Enhancements

Planned expansions:

Real OCI API integration (read-only)

Cost overlays per compartment

Anomaly/incident visual layer

Region heatmaps

Service maps & topology view

AI-driven cloud insights

📜 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).
This license ensures the project remains free and open-source, allowing anyone to:

✔️ Use the software

✔️ Modify it

✔️ Share it

✔️ Distribute modified versions

However, any redistributed or modified version must also be released under GPL-3.0, ensuring the same freedoms are preserved.
If you distribute binaries, you must also provide access to the source code.
