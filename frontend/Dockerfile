FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM deps AS development
COPY . .
CMD ["npm", "run", "dev"]  

FROM deps AS builder
ARG VITE_SERVER_API
ENV VITE_SERVER_API=$VITE_SERVER_API
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
