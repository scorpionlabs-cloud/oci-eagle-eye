
# OCI Eagle Eye (Mock Dashboard)

A lightweight React + Vite dashboard that visualizes **mock OCI (Oracle Cloud Infrastructure)** resources across regions, services, and compartments.
Ideal for demos, workshops, screenshots, and concept design — **no real OCI credentials or backend required.**

---

## 🚀 Features

* 🌍 **Global Region Overview**
  Health, cost, active resources, and incidents (mock data)

* 🧭 **Resource Inventory Table**
  Filter by region, service, compartment, or keyword

* 🧱 **Compartment Zoom Panel**
  Click any resource to see a breakdown of services and active assets in that compartment

* 🎨 **Fully static, front-end only**
  Safe to host on GitHub Pages or any static site

---

## 📦 Install & Run Locally

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually [http://localhost:5173](http://localhost:5173)).

---

## 🌐 Deploy to GitHub Pages

This project already includes:

* `vite.config.js` with correct `base` path
* `gh-pages` deployment script

Deploy with:

```bash
npm run deploy
```

Your dashboard will be published to:

```
https://<your-github-username>.github.io/oci-eagle-eye/
```

---

## 📁 Project Structure

```
oci-eagle-eye/
  index.html
  vite.config.js
  package.json
  src/
    App.jsx
    main.jsx
    index.css
    ociResources.js
```

---

## ⚠️ Disclaimer

This is a **mock dashboard**.
All OCI regions, services, metrics, and costs are **synthetic** and used only for educational or demo purposes.

---


📜 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).
This license ensures the project remains free and open-source, allowing anyone to:

✔️ Use the software

✔️ Modify it

✔️ Share it

✔️ Distribute modified versions

However, any redistributed or modified version must also be released under GPL-3.0, ensuring the same freedoms are preserved.
If you distribute binaries, you must also provide access to the source code.
