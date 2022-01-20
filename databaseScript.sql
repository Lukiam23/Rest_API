CREATE DATABASE greenmile;

create domain decimal_latitude decimal(8,6);
create domain decimal_longitude decimal(9,6);

CREATE TABLE Routes(
	route_id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	status VARCHAR(12) NOT NULL CHECK (status = 'NOT_STARTED' or status = 'STARTED')
);

CREATE TABLE Stops(
	stop_id SERIAL PRIMARY KEY,
	route_id SERIAL,
	description TEXT,
	latitude decimal_latitude NOT NULL,
	longitude decimal_longitude NOT NULL,
	status VARCHAR(12) NOT NULL CHECK (status = 'NOT_ANSWER' or status = 'ANSWER'),
	deliveryRadius INTEGER,
	CONSTRAINT fk_route
		FOREIGN KEY(route_id)
			REFERENCES Routes(route_id)

);

CREATE TABLE Adresses(
	adress_id SERIAL PRIMARY KEY,
	stop_id SERIAL,
	street TEXT,
	number INT,
	distric TEXT,
	city TEXT,
	UF VARCHAR(10),
	zipcode VARCHAR(15),
	CONSTRAINT fk_stop
		FOREIGN KEY(stop_id)
			REFERENCES Stops(stop_id)
);

INSERT INTO routes VALUES(1, '2021-10-14', 'NOT_STARTED');
INSERT INTO stops VALUES(1, 1, 'X do João', -3.7625982, -38.4841062, 'NOT_ANSWER',10);
INSERT INTO adresses VALUES(1, 1,'Av. Washington Soares', 723,'Edson Queiroz', 'Fortaleza','CE', '60811-341');
INSERT INTO stops VALUES(2, 1, 'Galeto Prime - Delivery iFood', -3.751316, -38.51507, 'NOT_ANSWER',30);
INSERT INTO adresses VALUES(2, 2,'Rua Professor Eládio Magalhães', 213,'Edson Queiroz', 'Fortaleza','CE', '60811-460');