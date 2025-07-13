# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running This Project on Your Desktop

To run this project on your own computer, you'll need to copy the files from this environment and follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 20 or later recommended)
*   [npm](https://www.npmjs.com/) (which comes with Node.js)

### Setup Instructions

1.  **Copy Project Files:**
    First, you'll need to manually copy all the files and folders from this project into a new directory on your local machine.

2.  **Create Environment File:**
    Create a new file in the root of your project named `.env.local`. This is where you will store your secret keys. For the Genkit AI features to work, you will need a Google AI API key.
    ```
    GOOGLE_API_KEY="YOUR_GOOGLE_AI_API_KEY_HERE"
    ```

3.  **Install Dependencies:**
    Open a terminal in your new project directory and run the following command to install all the necessary packages listed in `package.json`:
    ```bash
    npm install
    ```

4.  **Run the Development Server:**
    Once the installation is complete, you can start the Next.js development server:
    ```bash
    npm run dev
    ```
    This will start the main application, usually available at `http://localhost:9002`.

5.  **Run the Genkit AI Server (Optional):**
    If you are working on the AI features, you'll need to run the Genkit development server in a separate terminal:
    ```bash
    npm run genkit:dev
    ```
    This allows you to test and debug your AI flows.

Now you're all set up to develop and run your NexusConnect app locally!