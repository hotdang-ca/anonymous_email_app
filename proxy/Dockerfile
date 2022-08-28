FROM ubuntu:bionic

EXPOSE 80
EXPOSE 443

VOLUME /etc/letsencrypt
VOLUME /etc/apache2/sites-enabled

RUN apt-get update
RUN apt-get upgrade -y
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y vim apache2 curl

RUN a2enmod proxy && a2enmod proxy_wstunnel && a2enmod proxy_http && a2enmod proxy_balancer && a2enmod lbmethod_byrequests && a2enmod proxy_connect && a2enmod proxy_ajp && a2enmod rewrite && a2enmod ssl && a2enmod deflate && a2enmod headers && a2enmod proxy_html

#CRON
RUN apt install cron

#CERTBOT
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y certbot

WORKDIR /etc/apache2

CMD /usr/sbin/apache2ctl -D FOREGROUND
