# Useful Calendar

Useful Calendar is an ironically-named webapp that aims to make the process of checking the date tedious and slow while relying on 
a robust tech stack of Typescript, HTML, and CSS for the frontend and a custom Go API for the backend.

Believe it or not, it actually works a lot faster than you would think... BUT it provides a one-of-a-kind date checking experience by playing exciting music while it loads to encourage you not to make a mistake and different endings based on how you perform.

# Developer Setup
To run Useful Calendar locally, follow these steps:

1. **System Requirements:**
   - Make sure your system meets the following requirements:
     - Operating System: Windows, macOS, or Linux
     - Go: Version 1.16 or higher

2. **Clone the Repository:**
   - Open your terminal or command prompt.
   - Change the current directory to where you want to clone the repository.
   - Run the following command to clone the repository:
     ```
     git clone https://github.com/jbecker7/useful-calendar.git
     ```
     
3. **Backend Setup:**
   - Navigate to the backend directory:
     ```
     cd ../backend
     ```
   - Install the required Go packages:
     ```
     go mod download
     ```
     
4. **Running the Application:**
   - In the frontend directory, open index.html
   - In the backend directory, run the Go API:
     ```
     go run main.go
     ```

5. **Access the Application:**
   - Open your web browser and visit `http://localhost:3000` to access the Useful Calendar application.
