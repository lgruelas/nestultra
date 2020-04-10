docker rm test
docker build -t node-image .
docker run -d -p 9000:3000 node-image