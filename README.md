# 3D-Artist-Portfolio

A modern portfolio website developed for a 3D visualization artist, showcasing work across architectural and product visualization. Built with performance and responsiveness in mind, the application features a custom scroll-driven, frame-by-frame animation effect that reveals a sequence of images as the user navigates the page.

## Legal Notice & Usage

**This repository contains proprietary code developed for a commercial client.**

It is publicly viewable strictly for portfolio evaluation and technical demonstration purposes. No license is granted for the reuse, modification, reproduction, or distribution of any code or contents contained within this repository.

## Tech Stack

* **Framework:** Next.js 16.2.6 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Deployment:** Cloudflare Pages (`@cloudflare/next-on-pages`)

## Architecture & Key Components

The application follows the Next.js App Router convention utilizing standard import aliases (`@/*`). 

* **ScrollVideoEffect:** A custom React component acting as a scroll-controlled flipbook animation. It monitors the viewport visibility of a designated container and maps the user's scroll progress to sequential frame images stored in the public directory.
* **ProjectCard:** A reusable UI component for showcasing individual projects, integrated with scroll-reveal animations.
* **Hero Section:** Incorporates scroll-triggered fade and scale transitions to optimize the initial user experience.

## Developer

**Juan Wong**  
Email: juancwxng@gmail.com
