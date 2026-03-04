# Squiglink Studio

The creator-facing frontend.

## Install

### Development

1. Install [Docker](https://www.docker.com/) and [Task](https://taskfile.dev).

2. Copy the configuration file:

   ```sh
   cp .env.example .env
   ```

3. Edit the configuration file:

   ```sh
   msedit .env
   ```

4. Install dependencies:

   ```sh
   task install-dependencies
   ```

5. Start the application:

   ```sh
   task start
   ```

Done?:

- Execute `task` to list available tasks.
- Visit <http://localhost:5173>.

### Production

1. Install [Docker](https://www.docker.com/).

2. Copy the configuration file:

   ```sh
   cp .env.example .env
   ```

3. Edit the configuration file:

   ```sh
   msedit .env
   ```

4. Start the application:

   ```sh
   docker compose up --detach
   ```

Done?:

- Visit <http://localhost:8080>.
