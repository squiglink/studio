create type database_kind as enum('earbuds', 'headphones', 'iems');

create type user_scoring_system as enum(
    'five_star',
    'hundred_point',
    'ten_point_decimal',
    'ten_point'
);

create table
    brands (
        id bigint primary key,
        name text not null unique,
        url text unique
    );

create table
    users (
        id bigint primary key,
        name text not null unique,
        scoring_system user_scoring_system not null,
        username text not null unique
    );

create table
    databases (
        id bigint primary key,
        compensation_measurement text,
        kind database_kind not null,
        path text not null,
        user_id bigint references users (id) not null,
        unique (path, user_id)
    );

create table
    products (
        id bigint primary key,
        brand_id bigint references brands (id) not null,
        name text not null unique,
        unique (brand_id, name)
    );

create table
    stores (
        id bigint primary key,
        name text not null unique,
        url text not null unique
    );

create table
    product_listings (
        id bigint primary key,
        price_usd real,
        product_id bigint references products (id) not null,
        store_id bigint references stores (id) not null,
        url text not null unique,
        unique (product_id, store_id)
    );

create table
    measurement_devices (id bigint primary key, name text not null unique);

create table
    measurements (
        id bigint primary key,
        channel_left text,
        channel_right text,
        database_id bigint references databases (id) not null,
        measurement_device_id bigint references measurement_devices (id) not null,
        prefix text,
        product_id bigint references products (id) not null,
        unique (prefix, product_id)
    );

alter table measurements
add constraint measurements_either_channel_is_not_null check (
    channel_left is not null
    or channel_right is not null
);

create table
    reviews (
        id bigint primary key,
        product_id bigint references products (id) not null,
        score real,
        url text not null,
        user_id bigint references users (id) not null,
        unique (product_id, user_id)
    );
