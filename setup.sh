docker build -t mp-frontend:1.0 .
docker run -p 3001:3001 -d mp-frontend:1.0 