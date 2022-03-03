FROM node:17

COPY . . 

RUN npm install

CMD [ "npm", "run" , "test.android.sauce.real.device.us" ]
