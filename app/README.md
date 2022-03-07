create app server: `docker build -t notification-service:latest .`

create seed build: `docker build -t mongo-seed -f .\seed.Dockerfile .`

start all services: `docker-compose up`
