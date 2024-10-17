DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS recipes;

CREATE TABLE tags (
	id serial NOT null,
	name text
);

CREATE TABLE users (
	id uuid NOT null primary key,
	email text,
	password text
);

CREATE TABLE user_preferences (
	id serial NOT null,
	user_id uuid,
	tag_color_map JSONB
);

CREATE TABLE recipes (
	id serial NOT null,
	user_id uuid,
	favorite boolean,
	title text,
	url text,
	image_source text,
	prep_info JSONB,
	tags int[],
	ingredients JSONB,
	directions text[],
	notes text[]
);


SELECT * FROM recipes;