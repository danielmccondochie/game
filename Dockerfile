FROM alpine:3.7
LABEL maintainer="Daniel McCondochie <mccondochie@hotmail.com>"
RUN apk --update add nginx \
    && adduser -D -g 'www' www \
    && mkdir /www \
    && chown -R www:www /var/lib/nginx \
    && chown -R www:www /www \
    && mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY styles.css /www
COPY index.html /www
COPY dist /www/dist/
COPY assets /www/assets/
CMD ["nginx", "-g", "daemon off;"]

