<br/>
<p align="center">
  <h3 align="center">Weather Application - Golluméweather</h3>

  <p align="center">
    Let me present you my brand new Weather Application!
    <br/>
    <br/>
    <a href="https://github.com/gollumeo/weather-app"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/gollumeo/weather-app/issues">Report Bug</a>
    .
    <a href="https://github.com/gollumeo/weather-app/issues">Request Feature</a>
  </p>
</p>

![Stargazers](https://img.shields.io/github/stars/gollumeo/weather-app?style=social) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

![Screen Shot](https://cdn.discordapp.com/attachments/855186114640871446/1063110483118391357/image.png)

The mission of this project is to build a small web application that allows users to easily check the weather for a city of their choice. The goal is to consolidate knowledge on typical HTTP flow, DOM manipulation, and data aggregation/parsing from an API.

The user will be able to enter a city on the home page and then see the weather forecast for the next 5 days by clicking the SUBMIT button or pressing ENTER. 

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Used for creating the markup of the web pages
- [SCSS](https://sass-lang.com/) - Used for styling the application 
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Used for the logic and dynamic behavior of the application.


## Getting Started

This project uses the OpenWeather API to retrieve the weather forecast for a given city. Before getting started with the project, you will need to sign up for an API key from OpenWeather [here](https://openweathermap.org/api)

To start working on the project, follow these steps:

1. Clone the repository to your local machine.
2. Open the file called `config.js` in the `scripts` folder (located in `assets`) of your project and add the following code:
```javascript
export const API_KEY = "YOUR_API_KEY";
```
3. Replace `"YOUR_API_KEY_HERE"` with your actual API key.

## Usage

In this project we use two OpenWeather APIs:
- First, one is to get the lat & lon from the city input
- The second one to get the actual 5 days forecast

You can find the documentation for these APIs on the OpenWeather website [https://openweathermap.org/forecast5](https://openweathermap.org/forecast5) and [https://openweathermap.org/current](https://openweathermap.org/current)

## Roadmap

See the [open issues](https://github.com/gollumeo/weather-app/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/gollumeo/weather-app/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/gollumeo/weather-app/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/gollumeo/weather-app/blob/main/LICENSE.md) for more information.

## Authors

* **Pierre Mauriello** - *Junior Web Developer* - [Pierre Mauriello](https://github.com/gollumeo) - *Weather App*

## Acknowledgements

* [ShaanCoding](https://github.com/ShaanCoding/)
* [BeCode](https://github.com/becodeorg/becodeorg)
