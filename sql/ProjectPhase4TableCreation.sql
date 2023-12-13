CREATE SCHEMA IF NOT EXISTS MICROBIALITES;
USE MICROBIALITES;

CREATE TABLE IF NOT EXISTS Waypoint (
	WaypointID INT NOT NULL AUTO_INCREMENT,
    Title VARCHAR(255),
    Longitude DOUBLE DEFAULT 0,
    Latitude DOUBLE DEFAULT 0, 
    Northing DOUBLE DEFAULT 0, 
    Easting DOUBLE DEFAULT 0, 
    UTMZone1 BIGINT DEFAULT 0,
    UTMZone2 VARCHAR(255) DEFAULT 0, 
    Datum VARCHAR(255), 
    Projection VARCHAR(255),
    FieldBook VARCHAR(255),
    FieldbookPage VARCHAR(255),
    Formation VARCHAR(255),
    SiteName VARCHAR(255),
    DateCollection DATE,
    Elevation BIGINT DEFAULT 0,
    ProjectName BIGINT,
    MeasuredSection BOOLEAN, 
    SectionName VARCHAR(255),
    Comments TEXT,
    PRIMARY KEY (WaypointID)
);


CREATE TABLE IF NOT EXISTS Macrostructure (
	MacrostructureID INT NOT NULL AUTO_INCREMENT,
    WaypointID INT,
    MacrostructureType VARCHAR(255),
    MegastuctureType  VARCHAR(255),
    Comments  TEXT,
    PRIMARY KEY (MacrostructureID),
    FOREIGN KEY (WaypointID) REFERENCES Waypoint(WaypointID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Mesostructure (
	MesostructureID  INT NOT NULL AUTO_INCREMENT,
    MacrostructureID  INT,
    Type VARCHAR(255),
	Texture VARCHAR(255),
	LaminaThickness FLOAT DEFAULT 0,
	LaminaShape FLOAT DEFAULT 0,
	SynopticRelief VARCHAR(255),
	Wavelength INT, 
	Amplitude FLOAT DEFAULT 0,
	IGSNIntlGeoSampleNumber VARCHAR(255),
	InTheFRUInterval BOOLEAN,
	ThinSectionPriority BIGINT,
	ThinSectionMade BOOLEAN, 
	FieldDescription TEXT,
	RockDescription TEXT,
	Commments TEXT,
    PRIMARY KEY (MesostructureID),
    FOREIGN KEY (MacrostructureID) REFERENCES Macrostructure(MacrostructureID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS ThinSection (
	ThinSectionID INT NOT NULL AUTO_INCREMENT,
    MesostructureID  INT,
	Subsample VARCHAR(255),
	Description TEXT,
	AnalysisComplete BOOLEAN,
	PRIMARY KEY (ThinSectionID),
    FOREIGN KEY (MesostructureID) REFERENCES Mesostructure(MesostructureID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

# SUBS OF THIN_SECTION
CREATE TABLE IF NOT EXISTS Texture (
    ThinSectionID  INT,
	Type VARCHAR(255),
    FOREIGN KEY (ThinSectionID) REFERENCES ThinSection(ThinSectionID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Cement (
    ThinSectionID  INT,
	Type VARCHAR(255),
    FOREIGN KEY (ThinSectionID) REFERENCES ThinSection(ThinSectionID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Porosity (
    ThinSectionID  INT,
	Type VARCHAR(255),
    FOREIGN KEY (ThinSectionID) REFERENCES ThinSection(ThinSectionID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Minearlogy (
    ThinSectionID  INT,
	Type VARCHAR(255),
    FOREIGN KEY (ThinSectionID) REFERENCES ThinSection(ThinSectionID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ClasticGrain (
    ThinSectionID  INT,
	Type VARCHAR(255),
    FOREIGN KEY (ThinSectionID) REFERENCES ThinSection(ThinSectionID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

# Employee
CREATE TABLE IF NOT EXISTS Employee (
	EmployeeID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
	Position VARCHAR(255),
    PRIMARY KEY (EmployeeID)
);

CREATE TABLE IF NOT EXISTS ProblemLog (
	LogID INT NOT NULL AUTO_INCREMENT,
    CustomerSupportID INT,
    Comment VARCHAR(255),
    PRIMARY KEY (LogID),
    FOREIGN KEY (CustomerSupportID) REFERENCES Employee(EmployeeID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS AnalyzingMacrostructure (
	ResearcherID INT,
	MacrostructureID INT,
    FOREIGN KEY (MacrostructureID) REFERENCES Macrostructure(MacrostructureID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
    FOREIGN KEY (ResearcherID) REFERENCES Employee(EmployeeID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS AnalyzingMesostructure (
	ResearcherID INT,
	MesostructureID INT,
    FOREIGN KEY (MesostructureID) REFERENCES Mesostructure(MesostructureID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
    FOREIGN KEY (ResearcherID) REFERENCES Employee(EmployeeID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS AnalyzingThinSection (
	ResearcherID INT,
	ThinSectionID INT,
    FOREIGN KEY (ThinSectionID) REFERENCES ThinSection(ThinSectionID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
    FOREIGN KEY (ResearcherID) REFERENCES Employee(EmployeeID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);


# Photos
CREATE TABLE IF NOT EXISTS Photo (
	PhotoID INT NOT NULL AUTO_INCREMENT,
    PhotoData VARCHAR(255),
    PRIMARY KEY (PhotoID)
);


CREATE TABLE IF NOT EXISTS MacrostructurePhoto (
	PhotoID INT,
    MacrostructureID INT,
    FOREIGN KEY (PhotoID) REFERENCES Photo(PhotoID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
    FOREIGN KEY (MacrostructureID) REFERENCES Macrostructure(MacrostructureID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MesostructurePhoto (
	PhotoID INT,
    MesostructureID INT,
    FOREIGN KEY (PhotoID) REFERENCES Photo(PhotoID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
    FOREIGN KEY (MesostructureID) REFERENCES Mesostructure(MesostructureID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ThinSectionPhoto (
	PhotoID INT,
    ThinSectionID INT,
    FOREIGN KEY (PhotoID) REFERENCES Photo(PhotoID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE,
    FOREIGN KEY (ThinSectionID) REFERENCES ThinSection(ThinSectionID)
		ON UPDATE CASCADE 
		ON DELETE CASCADE
);