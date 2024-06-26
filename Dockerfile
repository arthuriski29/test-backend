FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8888
ENV MONGO_URI="mongodb+srv://fajarfathurriskyb:b4ck3nd4pp@cluster0.d9zkoo3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

EXPOSE 8888

CMD ["npm", "run", "dev"]
