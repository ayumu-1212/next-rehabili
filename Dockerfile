FROM node:22-slim

WORKDIR /app

RUN apt update && apt install -y git
