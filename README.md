# LAB 16 - CAPS System
Written in Node.js. The goal is to setup a system of events and handlers, with the intent being to change out the eventing system as we go, but keeping the handlers themselves largely the same.

As a vendor, I want to alert the system when I have a package to be picked up As a driver, I want to be notified when there is a package to be delivered As a driver, I want to alert the system when I have picked up a package and it is in transit As a driver, I want to alert the system when a package has been delivered As a vendor, I want to be notified when my package has been delivered

## Project Details
Author: Yahya Abu Khalil
Links and Resources
[submission PR](https://github.com/abukhalil-LTUC-ASAC/caps)
[Github actions](https://github.com/abukhalil-LTUC-ASAC/caps/actions)

### Modules and Middlewares
- [`vendor.js`](vendor.js) a socket that kickstart the mock loop of orders.
- [`driver.js`](driver.js) mocks the response of the vendor emitter as a driver picking up, delivering and finishing the delivery.
- [`caps.js`](caps.js) all sockets connect to caps as the server that would broadcast the messages again.

### Setup
Clone the repo, and run the following commands to install the required dependencies and dev dependencies. 
- `npm install` to download all that exists in `package.json`.

### Running the app
- `npm start` to test the server using mock data.
- `npm test` to run the thorough testing functions.
  
### Unified Modeling Language (UML)
![UML image](resources/.PNG)
