FROM alpine:3.7
LABEL maintainer="Daniel McCondochie <mccondochie@hotmail.com>"
RUN apk --update add nginx \
    && adduser -D -g 'www' www \
    && mkdir /www \
    && chown -R www:www /var/lib/nginx \
    && chown -R www:www /www \
    && mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
COPY . /www
CMD ["nginx", "-g", "daemon off;"]

