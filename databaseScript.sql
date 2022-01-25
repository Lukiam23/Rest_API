CREATE DATABASE greenmile;

create domain decimal_latitude decimal(8,6);
create domain decimal_longitude decimal(9,6);

CREATE TABLE Routes(
	route_id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	route_status VARCHAR(12) NOT NULL CHECK (route_status = 'NOT_STARTED' or route_status = 'STARTED')
);

CREATE TABLE Stops(
	stop_id SERIAL PRIMARY KEY,
	route_id SERIAL,
	description TEXT,
	address TEXT,
	latitude decimal_latitude NOT NULL,
	longitude decimal_longitude NOT NULL,
	stop_status VARCHAR(12) NOT NULL CHECK (stop_status = 'NOT_ANSWER' or stop_status = 'ANSWER'),
	deliveryRadius INTEGER,
	CONSTRAINT fk_route
		FOREIGN KEY(route_id)
			REFERENCES Routes(route_id) ON DELETE CASCADE

);


INSERT INTO routes VALUES(1, '2021-10-14', 'NOT_STARTED');
INSERT INTO stops VALUES(DEFAULT, 1, 'X do João', 'Av. Washington Soares, 723 - Edson Queiroz, Fortaleza - CE, 60811-341' , -3.7625982, -38.4841062, 'NOT_ANSWER',10);
INSERT INTO stops VALUES(DEFAULT, 1, 'Galeto Prime - Delivery iFood', 'Rua Professor Eládio Magalhães, 213 - Edson Queiroz, Fortaleza - CE , 60811-460' , -3.751316, -38.51507, 'NOT_ANSWER',30);
