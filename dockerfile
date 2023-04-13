FROM node:lts-alpine
ENV PORT 8000
ENV HOST 0.0.0.0
RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ENTRYPOINT ["npm", "start"]