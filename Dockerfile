# this script deploy only the frontend ui

FROM nginx
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html

### To build and deploy ###

# ng build --prod

# build local
# docker build -t javaee/av-components .

# test locally
# docker run -it -p 80:80 javaee/av-components

# push to docker hub
# docker push javaee/av-components
