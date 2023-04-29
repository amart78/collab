# **Contributing**
## Getting Started with Collab

Welcome to Collab! This document will guide you through the steps necessary to get the project up and running on your local machine.

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- Ruby 2.6.5 or higher
- Rails 6.0 or higher
- Node.js 12.13 or higher
- NPM 8.19.3 or higher

## Installation

1. Clone the repository to your local machine using Git:

        git clone https://github.com/amart78/collab.git

2. Change into the client directory:

        cd collab
        cd client

3. Install the dependencies using npm:

        npm install

4. Build the frontend by running the following command:
        
        npm run build
5. Change into the collab directory:
  
        cd ..
6. Install the files from the client build directory to the rails server:

        npm run deploy

7. Set up the database by running the following command:

        rake db:drop db:create db:migrate db:seed

8. Start the Rails server and the Webpack development server, run the following command:

        rails s

    This will start the Rails server on port 3000 and the Webpack development server on port 8080. You can access your application by navigating to [http://localhost:3000](http://localhost:3000/).

---
## **Dependency List**
### *Backend Dependencies*

| **Component** | **Description** | **Version** | **License** |
| --- | --- | --- | --- |
| Ruby | Programming language used for the backend | 3.0.2 | BSDL 2-Clause |
| Rails | Web application framework used for the backend | 6.1.4 | MIT |
| PostgreSQL | Relational database management system used for data storage | 13.4 | PostgreSQL License |
| Puma | App server used to run the Rails application | 5.0 | BSD 3-Clause |
| Bcrypt | Hashing algorithm used for password encryption | 3.1.7 | MIT |
| Bootsnap | Gem used to reduce boot times through caching | 1.4.4 | MIT |
| Rack-cors | Middleware used for handling Cross-Origin Resource Sharing (CORS) | 1.1.1 | MIT |


### *Frontend Dependencies*

| **Component** | **Description** | **Version** | **License** |
| --- | --- | --- | --- |
| MUI | React component library for building the UI | 5.8.1 | MIT |
| React | JavaScript library used for building the UI | 17.0.2 | MIT |
| React Dom | React-specific package for managing the DOM | 17.0.2 | MIT |
| React Icons | Icons for React | 4.3.1 | MIT |
| React Router | Declarative routing for React | 6.3.0 | MIT |
| React Router DOM | DOM bindings for React Router | 6.3.0 | MIT |
| Styled Components | CSS-in-JS library | 5.3.5 | MIT |
| Web Vitals | Library for measuring web performance | 1.1.2 | Apache-2.0 |

### *Development and Test Dependencies*

| **Component** | **Description** | **Version** | **License** |
| --- | --- | --- | --- |
| byebug | Debugging tool used for development and testing | 11.1.3 | BSD 2-Clause |
| listen | Gem used for file system notifications during development | 3.3 | MIT |
| spring | Gem used to speed up development by keeping the application running in the background | 2.1.1 | MIT |
| rspec-rails | Testing framework used for development and testing | 5.0.0 | MIT |
| rspec-json\_expectations | RSpec extension for validating JSON responses | 3.10.1 | MIT |
| shoulda-matchers | Library of RSpec matchers for testing Rails applications | 4.0 | MIT |