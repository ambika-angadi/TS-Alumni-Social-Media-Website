CREATE TABLE User (
	UserID INT PRIMARY KEY NOT NULL,
	RealName VARCHAR(255) NOT NULL,
	EmailAddress VARCHAR(255) NOT NULL UNIQUE,
	BirthDate INT,
	Course VARCHAR(255),
	AuthProvider VARCHAR(255),
	ProfileImg VARCHAR(255)
);

CREATE TABLE Post (
	PostID INT PRIMARY KEY NOT NULL,
	UserID INT,
	TimeAndDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	Content VARCHAR (1000),
	MediaLink VARCHAR(255),
	FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Comment (
	CommentID INT PRIMARY KEY NOT NULL,
	UserID INT,
	PostID INT,
	TimeAndDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	Content VARCHAR (1000),
	FOREIGN KEY (UserID) REFERENCES User(UserID),
	FOREIGN KEY (PostID) REFERENCES Post(PostID)
);
