FROM php:8.3-apache

# Install dependencies
RUN apt-get update && apt-get dist-upgrade -y


RUN apt-get install -y lsb-release curl apt-transport-https ca-certificates libfreetype-dev libjpeg62-turbo-dev libpng-dev

RUN curl -sSLo /usr/share/keyrings/deb.sury.org-php.gpg https://packages.sury.org/php/apt.gpg
RUN sh -c 'echo "deb [signed-by=/usr/share/keyrings/deb.sury.org-php.gpg] https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

RUN apt-get update

#RUN apt-get install -y php php8.3-cli php8.3-dev php8.3-pgsql php8.3-sqlite3 php8.3-gd php8.3-curl php8.3-imap php8.3-mysql php8.3-mbstring php8.3-xml php8.3-zip php8.3-bcmath php8.3-soap php8.3-intl php8.3-readline php8.3-ldap php8.3-msgpack php8.3-igbinary php8.3-redis php8.3-memcached php8.3-pcov php8.3-imagick php8.3-xdebug  libapache2-mod-php8.3

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd pdo pdo_mysql mysqli zip bcmath soap intl ldap msgpack igbinary memcached pcov imagick xdebug

# # # Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# # # Enable apache mods
RUN a2enmod rewrite

# # # Install nodejs
RUN apt-get install -y nodejs npm

# RUN mkdir -p /usr/local/apache2/conf/extra/
COPY ./config/apache/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./config/apache/sites-available/server.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf
COPY ./config/apache/sites-available/server.conf /etc/apache2/sites-enabled/000-default.conf

COPY ./src/ /var/www/html/escobar-vermietung-2024/

RUN chown -R www-data:www-data /var/www/html/escobar-vermietung-2024/

WORKDIR /var/www/html/escobar-vermietung-2024/

RUN composer install

RUN npm install && npm run build

# COPY ./httpd-foreground /usr/local/bin/

# RUN chmod +x /usr/local/bin/httpd-foreground

EXPOSE 80

# CMD ["/usr/local/bin/httpd-foreground"]