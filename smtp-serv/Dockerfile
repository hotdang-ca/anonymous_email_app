FROM node:8

EXPOSE 25

WORKDIR /app
COPY . /app
COPY ./lib /app/lib

CMD ["node", "bin/smtp.js"]
