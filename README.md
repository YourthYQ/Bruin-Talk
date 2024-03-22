# <img src="./bruin-image.png" width=30px height=35px>  Bruin Talk
*Bruin Talk* is a full-stack web chatting application. This application is developed using React for the frontend, Express and MySQL for the backend, and Socket.IO for managing real-time connections. Bruin Talk focuses on creating a dynamic and interactive user experience by implementing core functionalities such as user authentication, real-time chatting, and a meaningful message history search. Additionally, the application introduces five features: Customizing user-page theme, Displaying a friend list, Adding friends, Deleting friends, and Displaying online/offline status.

**Contributors**: Yang Weng <a href="https://github.com/realyangweng">`@realyangweng`</a>, Luyun Hou <a href="https://github.com/Luyun12306">`@Luyun12306`</a>, Yuquan Hong <a href="https://github.com/YourthYQ">`@YourthYQ`</a>, Yi Wu <a href="https://github.com/ngorayyy">`@ngorayyy`</a>, Jeffirey Wang <a href="https://github.com/fffaa7788">`@fffaa7788`</a>

**Note 1**: It is recommended you run *Bruin Talk* either on Chrome or Firefox. Running this web app on Safari is undefined behavior.

**Note 2**: Owing to the constraints associated with state updating mechanisms in React, our application presently requires users to manually refresh the page to view new messages sent by others.  We are committed to refining this functionality, ensuring that React will seamlessly and automatically re-render the interface to display new messages upon receipt, enhancing user experience and application responsiveness.

**Date**: Jan - Mar, 2024

**Link**: Link to this public repo: https://github.com/realyangweng/35L-Project

## Table of Contents

- [Three Basic Features](#three-basic-features)
- [Five Distinct Features](#five-distinct-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install Dependencies](#install-dependencies)
  - [MySQL Database Localization](#mySQL-database-localization)
  - [Running the Application](#running-the-application)
  - [Manual Operation](#manual-operation)
- [Usage](#usage)
- [Demo](#demo)
- [License](#license)

## Three Basic Features

**Real-Time Chat**: Develop a chat system to facilitate real-time communication and enhance user engagement.

**Message History**: Integrate a powerful search functionality allowing users to efficiently retrieve and review their chat history. 

**User Authentication**: Implement a secure registration and login system to ensure the privacy and authentication of user data.

## Five Distinct Features

**1. Customizing User-page Theme**: Provide a theme customization feature for the User Login and Register Page, including alternation between Light Mode and Dark Mode.

**2. Displaying a friend list**

**3. Adding Friends**

**4. Deleting Friends**

**5. Displaying online/offline status of users**

## Getting Started

### Prerequisites

	Clone the Repository:

	git clone https://github.com/realyangweng/35L-Project.git

### Install Dependencies

Windows or Mac: Download from the official Node.js website and install it: 

	https://nodejs.org/en
	
### MySQL Database Localization

Visit the official MySQL downloads page and select the version suitable for your operating system:

	https://www.mysql.com/downloads/
 
After installation, you can access the MySQL CLI by typing 

	mysql -u root -p 
 
in your terminal or command prompt and entering the root password set during installation.
To create a new database, you can use the SQL command: 

	CREATE DATABASE mydatabase; — replacing mydatabase with your preferred database name.

The default connection details for a local MySQL setup are usually:

	Host: localhost or 127.0.0.1
 	Port: 3306 (default MySQL port)
  	User: root (or any other user you create for the database)
   	Password: The password set during installation or for the new user you created.
    Database: The name of the database you created (e.g., mydatabase).

Configure the App to Use the Local Database. Locate 

	chat_room/config/index.js 
 
and update the host, port, user, password, and database name values to match your local MySQL setup.

After adjusting the configuration, you should be able to run the app locally. 

### Running the Application

To start the application, simply execute the command:

 	cd path/to/this/repository

	make run

Open one web browser and go to http://localhost:3000 to access the chat application.

Open the other web browser and go to http://localhost:3000 to access the chat application.

### Manual Operation

This application requires `npm` to get started, and they are integrated into 
`make run` above. However, there are also some options to do manually just in case:

To install `npm`:

	make install_npm

 Or:

  	make check_npm

where the latter would check if `npm` is installed, and install it for you if not

To install packages for app to run:

	make install_package

 To clean processes occupying ports:

 	make close

## Usage

**Customizing User-page Theme**: At the User Login and Register Page, you can customize the page's theme to improve your visual experience.

**Register**: If you do not have an account yet, you can register for an account.

**Log In**: Once you got an account, you can log in with your username and password.

**Adding Friends**: After you log in, you can add other users as your friends.

**Real-Time Chat**: Click on the users you want to chat with, and start chatting with them. Messages are sent and received in real-time.

**Message History**: Your chat history will be available for reference, and you can scroll through previous messages.

**Friend List**: You can check your contacts in the friend list.

**Online/Offline Status**: In your friend list, you can also check friends' Online/Offline Statue.

**Deleting Friends**: You can delete your current friends.

**Log Out**: You want to login another account or exit the app by clicking the Logout button.

## Demo

For a demonstration of the project, please visit <a href="https://www.youtube.com/watch?v=a8Cp1spRwHQ">here</a>.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
