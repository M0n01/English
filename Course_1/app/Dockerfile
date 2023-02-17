# Complete the file :)

# Description : It is the image use as base
FROM node:18-alpine

# Explain : RUN is used to execute command in our contener
#RUN apk add --no-cache python2 g++ make

# Explain : It is used to modify the repository (it's like cd).
# So all the following command will be executed in this repo
WORKDIR /app

# Description : To bundle the app's source code inside the Docker image
COPY . .

RUN npm install --production

# Explain : CMD is always at the end.
# It allow the container to know wich command execute at the beginning
# It is for run the app. Here we will use index.js to start
CMD ["node", "src/index.js"]
