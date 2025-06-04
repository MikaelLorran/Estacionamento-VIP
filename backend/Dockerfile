FROM php:8.2-apache

RUN a2enmod rewrite

COPY public/ /var/www/html/
COPY app/ /var/www/html/app/
COPY .htaccess /var/www/html/.htaccess

RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html

EXPOSE 80
