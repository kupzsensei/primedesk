# Primedesk Test

This project is a simple profile management UI built with React, TypeScript, Material UI, Redux Toolkit, Formik, and Axios. It includes a mock Flask API for the backend.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Python (v3.6 or later)
- Docker

### Frontend Setup

1.  Navigate to the `primedesk-test` directory:

    ```bash
    cd primedesk-test
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

### Backend Setup

1.  Navigate to the `flask-api` directory:

    ```bash
    cd flask-api
    ```

2.  Create a virtual environment:

    ```bash
    python3 -m venv venv
    ```

3.  Activate the virtual environment:

    -   **macOS/Linux:**

        ```bash
        source venv/bin/activate
        ```

    -   **Windows:**

        ```bash
        venv\Scripts\activate
        ```

4.  Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5.  Start the Flask server:

    ```bash
    python app.py
    ```

    The API will be available at `http://127.0.0.1:5000`.

### Docker Setup

1.  Ensure Docker is installed and running on your system.

2.  Navigate to the root directory of the project (where `docker-compose.yml` is located):

    ```bash
    cd primedesk
    ```

3.  Build and start the Docker containers:

    ```bash
    docker-compose up --build
    ```

    This will:
    - Build the Docker images for both the frontend and backend.
    - Start the Flask backend on `http://localhost:5000` (inside the container).
    - Start the Nginx server for the React frontend on `http://localhost:80`.

    The application will be accessible in your browser at `http://localhost`.

4.  To stop the Docker containers, press `Ctrl+C` in the terminal where `docker-compose up` is running. To stop and remove the containers, networks, and volumes, run:

    ```bash
    docker-compose down
    ```

## Features

-   User login with Formik and Yup validation
-   Dashboard to display user profile information
-   Edit profile form with Formik and Yup validation
-   Redux Toolkit for state management
-   Material UI for styling
-   Dark mode toggle
-   Protected routes