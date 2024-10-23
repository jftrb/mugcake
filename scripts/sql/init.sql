DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_preferences;

CREATE TABLE tags (
	id serial not null primary key,
	name text
);

CREATE TABLE users (
	id uuid NOT null primary key DEFAULT gen_random_uuid(),
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
	user_id uuid REFERENCES users ON DELETE CASCADE,
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

INSERT INTO users
	VALUES (
	'18c47dfb-442f-423a-b0cd-70c8076cb7a9',
	'jeanfelix1@hotmail.fr',
	'be7580b3beace828645ecf6188bf418452646fc66e69b9234d51c6bef9633edc'
	);

INSERT INTO tags (name)
	VALUES ('Dessert'),
	('Easy'),
	('Tag 2'),
	('Really Long Tag 3'),
	('Tofu'),
	('Vegan'),
	('Vietnamese');

SELECT id FROM users WHERE email = 'jeanfelix1@hotmail.fr';

INSERT INTO recipes (user_id, favorite, title, url, image_source, prep_info, tags, ingredients, directions, notes)
	VALUES (
		'18c47dfb-442f-423a-b0cd-70c8076cb7a9',
		true,
		'Gâteau moelleux au chocolat dans une tasse',
		'https://www.ricardocuisine.com/recettes/5769-gateau-moelleux-au-chocolat-dans-une-tasse',
		'https://images.ricardocuisine.com/services/recipes/496x670_5769.jpg',
		'{"prepTime": "5 min", "cookTime": "45 sec", "totalTime": "5 min", "yield": "1"}',
		'{1, 2, 3, 3, 4}',
		'[{"quantity":3,"unit":"c. à soupe","ingredient":"de farine tout usage non blanchie"},{"quantity":2,"unit":"c. à soupe","ingredient":"de cassonade"},{"quantity":2,"unit":"c. à thé","ingredient":"de cacao"},{"quantity":0.25,"unit":"c. à thé","ingredient":"de poudre à pâte"},{"quantity":3,"unit":"c. à soupe","ingredient":"de lait"},{"quantity":1,"unit":"c. à soupe","ingredient":"d''huile de canola"},{"quantity":1,"unit":"goutte","ingredient":"d''extrait de vanille"},{"quantity":10,"unit":"pépites","ingredient":"de chocolat mi-sucré"}]',
		'{"Dans une tasse à café d’une contenance d’environ 250 ml (1 tasse), mélange la farine, la cassonade, le cacao et la poudre à pâte. Ajoute le lait, l’huile et la vanille.", "Avec une fourchette, brasse délicatement jusqu’à ce que la pâte n’ait plus de grumeaux. Dépose les pépites de chocolat sur le dessus.", "Cuis le gâteau au micro-ondes 45 secondes. Laisse tiédir 5 minutes pour permettre au gâteau de terminer sa cuisson."}',
		'{"Si tu veux en faire plusieurs, triple ou quadruple la recette et mélange-la dans un bol. Répartis ensuite la préparation dans trois ou quatre tasses ou ramequins d’une contenance de 125 ml (½ tasse). Attention, tu dois faire cuire les gâteaux un par un dans le micro-ondes pour obtenir une cuisson uniforme."}'
	), (
		'18c47dfb-442f-423a-b0cd-70c8076cb7a9',
		false,
		'Vietnamese tomato tofu',
		'https://greenbowl2soul.com/vietnamese-tofu-in-tomato-sauce/',
		'https://greenbowl2soul.com/wp-content/uploads/2023/03/Vietnamese-tofu-in-tomato-sauce-300x300.jpg',
		'{"prepTime": "10 min", "cookTime": "15 min", "totalTime": "25 min", "yield": "4"}',
		'{5, 6, 7, 3}',
		'[{"quantity":2,"unit":"cups","ingredient":"firm tofu cubes"},{"quantity":0.25,"unit":"teaspoon","ingredient":"ground black pepper"},{"quantity":0.25,"unit":"teaspoon","ingredient":"garlic powder"},{"quantity":1,"unit":"teaspoon","ingredient":"cooking oil"},{"quantity":1,"unit":"","ingredient":"salt to taste"},{"quantity":3,"unit":"cups","ingredient":"chopped tomatoes"},{"quantity":1,"unit":"","ingredient":"medium red onion sliced"},{"quantity":3,"unit":"","ingredient":"stalks spring onion"},{"quantity":0.25,"unit":"cup","ingredient":"chopped cilantro"},{"quantity":2,"unit":"","ingredient":"large garlic cloves"},{"quantity":1,"unit":"","ingredient":"thai red chili"},{"quantity":1,"unit":"tablespoon","ingredient":"soy sauce"},{"quantity":0.5,"unit":"teaspoon","ingredient":"palm sugar"},{"quantity":0.5,"unit":"teaspoon","ingredient":"ground black pepper"},{"quantity":1,"unit":"","ingredient":"salt to taste"},{"quantity":1,"unit":"tablespoon","ingredient":"cooking oil"},{"quantity":1,"unit":"cup","ingredient":"water"}]',
		'{"Put tofu cubes, oil, salt, pepper, and garlic powder in a bowl. Gently toss until all the cubes get evenly coated with the seasonings and oil.", "Spread tofu cubes on a baking tray lined with a baking sheet, Bake in a preheated oven at 200°C (or, 400℉) for 12-15 minutes or until tofu starts turning golden brown.", "Meanwhile, heat the oil in a pan. Add chopped garlic and saute until it starts turning brown. Add chopped red chili and the white part of spring onion. Saute for a few seconds.", "Next, add sliced onion and cook until it turns translucent.", "Add chopped tomatoes, salt, sugar, soy sauce, and pepper. Mix and cook on medium heat for around 7-8 minutes or until the tomatoes turn mushy. You may cover the pan to fasten this step.", "Pour a cup of water into the pan and cook for another 3-4 minutes on medium-high heat.", "Finally add baked tofu cubes, green onions, and cilantro. Mix and cook for about a minute. ", "Cover the pan and turn off the heat. Don''t remove the lid for 5 minutes.", "Serve hot with steamed Jasmine or sticky rice."}',
		'{"Use firm or extra-firm tofu to make this recipe.", "To get rid of the excess water from tofu, press the tofu block using a tofu press. Or, wrap the block of tofu in kitchen paper towels and press it with something heavy like a jar of beans, for at least 15 minutes. When you remove excess moisture from the tofu, it absorbs the flavors of the dish in a better way.", "Instead of baking, you can also shallow or deep-fry the tofu cubes until their edges start turning golden brown.", "Don''t overcook tofu, it will turn chewy.", "Mix tofu cubes with the seasonings and oil gently otherwise, the cubes will break.", "Fresh tomatoes are the best for this recipe but if you don''t have that canned diced tomatoes can be used too.", "Use juicy tomatoes otherwise the sauce won''t get the right consistency. ", "You can add a tablespoon of tomato paste for a rich tomato sauce.", "I have sliced onion to use in this recipe but you can use chopped onion too, if you prefer smaller pieces of onion in the sauce.", "Adding sugar is optional, if your tomatoes are already sweet you can skip it.", "More recipe tips, tricks, and variation suggestions are shared in the post above, please follow them to make this recipe."}'
	);

SELECT * FROM recipes;