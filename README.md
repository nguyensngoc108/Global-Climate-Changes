# Global Average Temperature Plotter

## Overview
This project is a web application that allows users to view the average temperature of various countries over specified date ranges. Users can search for a country by name and specify a date range to view the temperature data on a plot chart.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in the development mode.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Removes the single build dependency from your project.

## Technology Stack

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Create React App**: A comfortable environment for learning React, and is the best way to start building a new single-page application in React.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A document-oriented NoSQL database used to store country temperature data.

### Libraries
- **dayjs**: A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **uuid**: A library for generating unique IDs.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

## Features

- **Search by Country**: Users can search for a country by typing its name.
- **Date Range Selection**: Users can specify a date range to view temperature data.
- **Plot Chart**: Temperature data is displayed on a plot chart for easy visualization.
- **All Countries View**: Users can view the average temperature of all countries on a specific date.
- **API Endpoints**: Backend API endpoints to handle country lookup, temperature data retrieval, and more.

## What Have You Learned?

During the development of this project, several key learnings were achieved:

- **React and State Management**: How to effectively manage state and props in a React application.
- **Asynchronous JavaScript**: Handling asynchronous operations with async/await and Promises.
- **RESTful API Development**: Designing and implementing RESTful API endpoints using Express.js.
- **Database Integration**: Working with MongoDB to store and retrieve data using Mongoose.
- **Date Manipulation**: Utilizing the dayjs library for effective date parsing and manipulation.
- **Data Visualization**: Displaying data on plot charts to provide visual insights to users.

## How to Run

1. **Clone the Repository**: `git clone https://github.com/nguyensngoc108/Global-Climate-Changes.git`
2. **Install Dependencies**: Navigate to the project directory and run `npm install`.
3. **Start the Backend Server**: Navigate to the `server` directory and run `node server.js`.
4. **Start the Frontend Server**: Navigate to the `client` directory and run `npm run build` then 'serve -s build' .
5. **Open in Browser**: Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contribution

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/nguyensngoc108/Global-Climate-Changes.git).

## License

This project is licensed under the MIT License.
