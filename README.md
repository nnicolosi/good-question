# Good Question
An application for curating interview questions and generating on-demand interview scripts

## Repository Structure
This repository is implemented as a monorepo.  I chose to do this for a couple of reasons:

- It encourages development of full vertical slices of functionality (or at least non-breaking commits to the overall application)
- It makes it easier to keep the UI, API, and DB in sync with each other at all times
- It's convenient for spinning up the whole application with a docker-compose command

## Technology Choices
This is a full-stack JavaScript/TypeScript web application:

- React/JavaScript for the client (UI)
- Nest/TypeScript for the server (API)
- Postgres for the database (DB)
