# Result Worker

The Result Worker is an efficient and scalable backend service designed to process student submissions in real time. Built with TypeScript, this worker provides type safety and maintainability, making it a robust solution for submission processing pipelines.
This worker is designed to handle the verification of student submissions. It ensures secure validation using cryptographic signatures and facilitates real-time communication through Pub/Sub channels.

## Functionalities
- **Queue Listening**: Continuously listens to a `submissions` queue and processes each submission one at a time.
- **Signature Verification**: Verifies the signature of each submission using the student's public key.
- **Positive Processing**: Publishes verified submissions (successful verification) to the `positive-processed` channel of the Pub/Sub system, along with the student ID.
- **Negative Processing**: Publishes unverified submissions (failed verification) to the `negative-processed` channel of the Pub/Sub system.
- **Final Queue Push**: Pushes successfully verified submissions into the `final-submissions` queue for further processing.

### Prerequisites
1. **Node.js** (version >= 16)
2. **Redis** 
3. **Docker** 
4. **Git**

## Installation
Follow these steps to set up the Result Worker in your environment:

1. Clone the repository:
    ```bash
    git clone https://github.com/priyanshubisht10/result-worker.git
    ```
    ```bash
    cd result-worker
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build:
    ```bash
   tsc -b
    ```
4. Set up environment variables:
Create a .env file in the root directory and define the following variables
    ```env
    DATABASE=
    DATABASE_PASSWORD=
    QUESTION_DATABASE=
    QUESTION_DATABASE_PASSWORD=
    ```
5. Start Redis-Stack in a Docker Container:
    ```bash
    docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
    ```
    ```bash
    docker exec -it redis-stack redis-cli
    ```
6. Start the worker:
    ```bash
    node dist/app.js
    ```
7. Verify the setup: 
    If everything is set up correctly, you should see the following log in the terminal:
    ```bash
    DB connection successful!
    Connected to Redis successfully
    ```

## Additional Resources

For a detailed explanation of the architecture, functionality, and use cases of this worker, check out this Medium article by me:  
[https://priyanshubisht10.medium.com/workers-and-message-queues-18483fe287dd](https://priyanshubisht10.medium.com/workers-and-message-queues-18483fe287dd)  
