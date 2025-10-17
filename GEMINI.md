
# Project Overview

This is a Hexo blog project for the THFLS Computer Club, hosted at `thfls.club`. The blog uses the `stellar` theme and features technical articles on various topics, including software, tutorials, and guides.

# Building and Running

*   **Install dependencies:**
    ```bash
    npm install
    ```
*   **Run the development server:**
    ```bash
    npm run server
    ```
    This will start a local server at `http://localhost:4000`.
*   **Build the static files:**
    ```bash
    npm run build
    ```
    The static files will be generated in the `public` directory.
*   **Deploy the blog:**
    ```bash
    npm run deploy
    ```
    This will deploy the blog to the configured target.

# Development Conventions

*   **Content:** Blog posts are written in Markdown and located in the `source/_posts` directory.
*   **Authors:** Authors are defined in `source/_data/authors.yml`. To add a new author, add an entry to this file.
*   **Configuration:** The main configuration is in `_config.yml`. Theme-specific configurations are in `_config.stellar.yml`.
*   **Creating a new post:**
    ```bash
    hexo new "My New Post"
    ```
