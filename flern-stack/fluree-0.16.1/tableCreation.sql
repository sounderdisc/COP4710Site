-- These are all the SQL queries found in various parts of the code.

-- This is the SQL to create the ER Diagram that we submitted for the group assignment

CREATE DATABASE magrathea;

CREATE TABLE events(
    event_name varchar(40),
    name varchar(40),
    category varchar(40),
    time varchar(255),
    description varchar(255),
    -- location varchar(255),
    phone varchar(10),
    email varchar(255),
    date varchar(255),
    PRIMARY KEY (event_name)
);

CREATE TABLE users(
username VARCHAR(40),
password VARCHAR(40),
PRIMARY KEY (username));

CREATE TABLE rates(
    username VARCHAR(40),
    event_name VARCHAR(40),
    rating_stars INTEGER,
    comment VARCHAR(40),
    PRIMARY KEY (username, event_name),
    FOREIGN KEY (username) REFERENCES users,
    FOREIGN KEY (event_name) REFERENCES events
);

CREATE TABLE location(
    location_name VARCHAR(40),
    latitude FLOAT(40),
    longitude FLOAT(40),
    PRIMARY KEY (location_name)
);

CREATE TABLE at(
    event_name VARCHAR(40),
    location_name VARCHAR(40),
    PRIMARY KEY (event_name, location_name),
    FOREIGN KEY (event_name) REFERENCES events,
    FOREIGN KEY (location_name) REFERENCES location
);

CREATE TABLE rso(
    rso_name VARCHAR(40),
    num_members INTEGER,
    PRIMARY KEY (rso_name)
);

CREATE TABLE university(
    university_name VARCHAR(40),
    address VARCHAR(40),
    PRIMARY KEY (university_name)
);

CREATE TABLE isIn(
    username VARCHAR(40),
    rso_name VARCHAR(40),
    PRIMARY KEY (username, rso_name),
    FOREIGN KEY (username) REFERENCES users,
    FOREIGN KEY (rso_name) REFERENCES rso
);

CREATE TABLE attends(
    username VARCHAR(40),
    university_name VARCHAR(40),
    PRIMARY KEY (username, university_name),
    FOREIGN KEY (username) REFERENCES users,
    FOREIGN KEY (university_name) REFERENCES university
);

CREATE TABLE isApartOf(
    rso_name VARCHAR(40),
    university_name VARCHAR(40),
    PRIMARY KEY (rso_name, university_name),
    FOREIGN KEY (rso_name) REFERENCES rso,
    FOREIGN KEY (university_name) REFERENCES university
);

-- Use http://localhost:8080/fdb/project/backend/transact for all Databaste Change requests
-- Use http://localhost:8080/fdb/project/backend/query if you want info back from the server
-- you can either use the postman using POST or the GUI at https://localhost:8080

-- First you need collections. This is equivalent to tables. Transact all at once.

[
    {
        "_id" : "_collection",
        "name" : "users",
        "doc" :  "A collection for user accounts",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "events",
        "doc" :  "A collection for events",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "rates",
        "doc" :  "Relates user and event.",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "location",
        "doc" :  "A collection for locations of events",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "at",
        "doc" :  "Relates location and event",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "rso",
        "doc" :  "A collection for RSOs.",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "university",
        "doc" :  "A collection for universities.",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "isIn",
        "doc" :  "Relates users and RSOs.",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "attends",
        "doc" :  "Relates users and universities.",
        "version" : 1
    },
    {
        "_id" : "_collection",
        "name" : "isApartOf",
        "doc" :  "Relates universities and RSOs.",
        "version" : 1
    }
]

-- Now you need predacates. This is equivalent to columns of the tables. Transact all at once.
-- "unique" means its the primary key. "upsert" means the primary key is allowed to be updated.
-- https://developers.flur.ee/docs/overview/schema/predicates/#predicate-predicates
-- https://developers.flur.ee/docs/overview/transact/updating_data/ 

[
    {
        "_id" :  "_predicate",
        "name" : "users/username",
        "doc" : "The username of the user.",
        "unique" : true,
        "upsert" : true,
        "type" : "string"
    },
    {
        "_id" :  "_predicate",
        "name" : "users/password",
        "doc" : "The password of the user.",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "events/eventname",
        "doc" : "The unique name of the event.",
        "unique" : true,
        "upsert" : true,
        "type" : "string"
    },
    {
        "_id" :  "_predicate",
        "name" : "events/name",
        "doc" : "The friendly name of the event.",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "events/category",
        "doc" : "The category of the event.",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "events/time",
        "doc" : "What time the event is taking place.",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "events/description",
        "doc" : "Event description",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "events/phone",
        "doc" : "The phone number of the event organizer.",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "events/email",
        "doc" : "The email of the event organizer.",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "events/date",
        "doc" : "The date the event is taking place.",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "rates/ratingidnum",
        "doc" : "The number that acts as the primary key for this table.",
        "unique" : true,
        "upsert" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "rates/ratingstars",
        "doc" : "How many stars out of five this event was rated as.",
        "type" : "int",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "rates/comment",
        "doc" : "Comment associated with this rating",
        "type" : "string",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "rates/event",
        "doc" : "A reference to the event being rated",
        "type" : "ref",
        "restrictCollection" : "events",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "rates/user",
        "doc" : "A reference to the user leaving the rating",
        "type" : "ref",
        "restrictCollection" : "users",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "location/name",
        "doc" : "The name of the location.",
        "unique" : true,
        "upsert" : true,
        "type" : "string"
    },
    {
        "_id" :  "_predicate",
        "name" : "location/latitude",
        "doc" : "The latitude of the location.",
        "type" : "float",
        "index" : true
    },
    {
        "_id" :  "_predicate",
        "name" : "location/longitude",
        "doc" : "The longitude of the location.",
        "type" : "float",
        "index" : true
    }
]
-- Here is sample data. You can transact this all at once.

[
    {
        "_id" : "users$testUser",
        "username" : "123",
        "password" : "456"
    }
]