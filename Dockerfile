FROM node:19.7.0-alpine3.16

EXPOSE 3001

WORKDIR /usr/

COPY package*.json ./

RUN npm install
RUN npm install -g typescript
RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "build", "-l", "3001"]