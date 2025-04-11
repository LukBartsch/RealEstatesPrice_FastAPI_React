
# Real Estates Prices Monitor - FastAPI & React
Web application for monitoring real estates prices. You can see [_here_](https://repricesmonitor.host888382.xce.pl/).


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Main View](#main-view)
* [Setup](#setup)
* [Project Status](#project-status)
* [Contributing](#contributing)
* [Contact](#contact)
* [License](#license)


## General Information
The application is used to monitor real estate prices for two selected cities and for two types of markets (primary and secondary market).

The application consists of two separate modules.
 * On the backend side (server), the application uses the FastAPI framework (API).
 * On the frontend side (client), the application is built in React.

The application uses market data stored in a MySQL database.

The database also stores historical data on real estates prices (since 2006) which can be displayed on a chart along with the most recent data.


## Technologies Used
* [FastAPI](https://fastapi.tiangolo.com/)
* [React](https://react.dev/)
* [SQLAlchemy](https://www.sqlalchemy.org/)


## Main View

The application is a single-page website where the user can select the city, market type and data type. The Chart.js library was used to generate line charts.

![image](https://github.com/user-attachments/assets/04e2edf4-5afe-4f57-b9c1-a655342898de)


Below the graph there is also information in a table about the current average prices of apartments per square meter. And information about the average area or number of rooms.

![image](https://github.com/user-attachments/assets/b5a99f2c-4385-47d1-af76-cacfcc2a738c)



## Setup
- Clone repository
* Rename .env.example to `.env` and set your value
```
SECRET_KEY=<some_random_string>
DB_FILE_PATH=<your_db_name>
SQLALCHEMY_DATABASE_URI=<your_db_uri>
```

* Install packages from `requirements.txt`
```
pip install -r requirements.txt
```
* Run API application
```
cd backend_fast_api
python start.py
```

* Run React application (first install Node.js)
```
cd frontend_react/re_prices_monitor
npm start
```

* The application will be available at the local address: 
```
http://localhost:3000/
```

* Additionally, the FastAPI framework has a tool for creating documentation that will be available at: 
```
http://127.0.0.1:8000/docs
```

## Project Status
Application made in trial version for the purpose of learning FastAPI and React.


## Contributing
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". I will be very grateful for any interesting ideas.


## Contact
Created by [@LukBartsch](https://github.com/LukBartsch) - feel free to contact me!

[![LinkedIn][github-shield]][github-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


## License
This project is open source and available under the MIT License.


[github-shield]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/LukBartsch
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/lukasz-bartsch/


