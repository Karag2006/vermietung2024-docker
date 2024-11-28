FROM php:8.3-apache

## Setup
# Install dependencies
RUN apt-get update && apt-get dist-upgrade -y

RUN apt-get install -y nodejs npm lsb-release curl apt-transport-https ca-certificates libfreetype-dev libjpeg62-turbo-dev libpng-dev libzip-dev libxml2-dev ldap-utils libldap2-dev

# Install PHP extensions

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd pdo pdo_mysql mysqli zip bcmath ldap

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Enable apache mods
RUN a2enmod rewrite

## Copy Content
# Copy apache vhost file
COPY ./config/apache/sites-available/server.conf /etc/apache2/sites-enabled/000-default.conf

# Copy source code
COPY ./src/ /var/www/html/escobar-vermietung-2024/

# Set permissions
RUN chown -R www-data:www-data /var/www/html/escobar-vermietung-2024/

# Set working directory
WORKDIR /var/www/html/escobar-vermietung-2024/

## Build
RUN composer install && npm install && npm run build

## Finish
# Generate key and link storage
RUN php artisan storage:link

# Expose port
EXPOSE 80