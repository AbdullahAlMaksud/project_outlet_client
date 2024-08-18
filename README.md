# Project Outlet

Welcome to the **Project Outlet** frontend repository. This project is an e-commerce platform focused on selling clothing and wearable items. The application is built using modern web technologies such as React, Tailwind CSS, Firebase, and Vite.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Features](#features)
- [Deployment](#deployment)

## Installation
To get started with the project, clone the repository and install the dependencies.

```
git clone https://github.com/AbdullahAlMaksud/project_outlet_client.git
cd project_outlet_client
npm install
```


## Scripts
Here are the scripts defined in the package.json:
- `npm run dev`: Start the development server using Vite.
- `npm run build`: Build the project for production.

To start the development server and work on the project locally, run:

```
npm run dev
```
This will start the Vite development server and open your project in the browser at http://localhost:3000.


## Features
- **User Authentication:** Firebase authentication (Google and Email/Password).
- **Responsive Design:** Mobile-first design using TailwindCSS.
- **Product Filtering:** Filter products by category, brand, and price range.
- **Product Sorting:** Sort products by price and date added.
- **Pagination:** Display a limited number of products per page with pagination controls.
- **Search Functionality:** Search for products by name.
- **Toast Notifications:** Feedback for user actions.
- **Swiper Slider:** Responsive and touch-friendly sliders for showcasing products.

## Deployment
The project is deployed on Firebase Hosting. To deploy the project yourself, ensure you have Firebase CLI installed, then run:

```
firebase login
firebase init
firebase deploy
```

Feel free to contribute to the project or reach out if you have any questions!