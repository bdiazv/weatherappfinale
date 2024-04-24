# Weather App

## Overview
This Weather App allows users to check the weather forecast for any city. It provides real-time weather information such as temperature, humidity, wind speed, and more. Additionally, users can view daily weather outlooks from 6 to 19 hours into the future and toggle between Celsius and Fahrenheit units with custom-made logic. The application also utilizes the REST Countries API to translate the two-letter country code provided by OpenWeatherMap, enhancing readability and user experience.

## Features
- **Weather Forecast**: Users can search for weather information for any city.
- **Daily Weather Outlooks**: Provides hourly weather forecasts from 6 to 19 hours into the future.
- **Unit Conversion**: Toggles between Celsius and Fahrenheit units.
- **Country Code Translation**: Utilizes the REST Countries API to translate country codes for improved readability.
- **User Authentication**: Utilizes Firebase authentication to allow only authenticated users to access the application.
- **Responsive Design**: The application is optimized for various screen sizes, making it accessible from both desktop and mobile devices.

## Installation
1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Configure Firebase:
   - Create a Firebase project on the Firebase Console.
   - Set up GitHub authentication in the Firebase Authentication settings.
   - Copy the Firebase configuration object (apiKey, authDomain, etc.) and paste it into `firebase.js`.
4. Run the application locally using `npm run dev`.

## Usage
1. Visit the deployed application URL.
2. Sign in using your GitHub account.
3. Search for a city to view its weather forecast.

## Technologies Used
- React.js
- Next.js
- Firebase Authentication
- Axios
- Tailwind CSS
- REST Countries API

## Acknowledgements
This application was built as a learning project and utilizes various open-source libraries and APIs.

## License
This project is licensed under the [MIT License](LICENSE).
