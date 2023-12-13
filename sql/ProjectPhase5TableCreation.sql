CREATE TABLE IF NOT EXISTS Waypoint (
    WaypointID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT,
    Longitude REAL DEFAULT 0,
    Latitude REAL DEFAULT 0,
    Northing REAL DEFAULT 0,
    Easting REAL DEFAULT 0,
    UTMZone1 INTEGER DEFAULT 0,
    UTMZone2 TEXT DEFAULT 0,
    Datum TEXT,
    Projection TEXT,
    FieldBook TEXT,
    FieldBookPage TEXT,
    Formation TEXT,
    SiteName TEXT,
    DateCollection TEXT,
    Elevation INTEGER DEFAULT 0,
    ProjectName INTEGER,
    MeasuredSection BOOLEAN,
    SectionName TEXT,
    Comments TEXT
);

CREATE TABLE IF NOT EXISTS Macrostructure (
    MacrostructureID INTEGER PRIMARY KEY AUTOINCREMENT,
    WaypointID INTEGER REFERENCES Waypoint(WaypointID) ON UPDATE CASCADE ON DELETE CASCADE,
    MacrostructureType TEXT,
    MegastructureType TEXT,
    Comments TEXT
);

CREATE TABLE IF NOT EXISTS Mesostructure (
    MesostructureID INTEGER PRIMARY KEY AUTOINCREMENT,
    MacrostuctureID INTEGER REFERENCES Macrostructure(MacrostructureID) ON UPDATE CASCADE ON DELETE CASCADE,
    Type TEXT,
    Texture TEXT,
    LaminaThickness REAL DEFAULT 0,
    LaminaShape REAL DEFAULT 0,
    SynopticRelief TEXT,
    Wavelength INTEGER,
    Amplitude NUMBER DEFAULT 0,
    IGSNIntlGeoSampleNumber TEXT,
    InTheFRUInterval BOOLEAN,
	ThinSectionPriority INTEGER,
	ThinSectionMade BOOLEAN, 
	FieldDescription TEXT,
	RockDescription TEXT,
	Commments TEXT
);

CREATE TABLE IF NOT EXISTS ThinSection (
    ThinSectionID INTEGER PRIMARY KEY AUTOINCREMENT,
    MesostructureID INTEGER REFERENCES Mesostructure(MesostructureID) ON UPDATE CASCADE ON DELETE CASCADE,
    Subsample TEXT,
    Description TEXT,
    AnalysisComplete BOOLEAN
);


CREATE TABLE IF NOT EXISTS Employee (
    EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT,
    LastName TEXT,
    Position TEXT
);

CREATE TABLE IF NOT EXISTS  AnalyzingMacrostructure (
    ResearcherID INTEGER REFERENCES Employee(EmployeeID) ON UPDATE CASCADE ON DELETE CASCADE,
    MacrostructureID INTEGER REFERENCES Macrostructure(MacrostructureID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS  AnalyzingMesostructure (
    ResearcherID INTEGER REFERENCES Employee(EmployeeID) ON UPDATE CASCADE ON DELETE CASCADE,
    MesostructureID INTEGER REFERENCES Mesostructure(MesostructureID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS  AnalyzingThinSection (
    ResearcherID INTEGER REFERENCES Employee(EmployeeID) ON UPDATE CASCADE ON DELETE CASCADE,
    ThinSectionID INTEGER REFERENCES ThinSection(ThinSectionID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProblemLog (
    LogID INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerSupportID INTEGER REFERENCES Employee(EmployeeID) ON UPDATE CASCADE ON DELETE CASCADE,
    Comment TEXT
);

CREATE TABLE IF NOT EXISTS Photo (
    PhotoID INTEGER PRIMARY KEY AUTOINCREMENT,
    PhotoData TEXT
);

CREATE TABLE IF NOT EXISTS ThinSectionPhoto (
    PhotoID INTEGER REFERENCES Photo(PhotoID) ON UPDATE CASCADE ON DELETE CASCADE,
    ThinSectionID INTEGER REFERENCES ThinSection(ThinSectionID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MesostructurePhoto (
    PhotoID INTEGER REFERENCES Photo(PhotoID) ON UPDATE CASCADE ON DELETE CASCADE,
    MesostructureID INTEGER REFERENCES Mesostructure(MesostructureID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS MacrostructurePhoto (
    PhotoID INTEGER REFERENCES Photo(PhotoID) ON UPDATE CASCADE ON DELETE CASCADE,
    MacrostructureID INTEGER REFERENCES Macrostructure(MacrostructureID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Texture (
    ThinSectionID INTEGER REFERENCES ThinSection(ThinSectionID) ON UPDATE CASCADE ON DELETE CASCADE,
    type TEXT
);

CREATE TABLE IF NOT EXISTS Cement (
    ThinSectionID INTEGER REFERENCES ThinSection(ThinSectionID) ON UPDATE CASCADE ON DELETE CASCADE,
    type TEXT
);

CREATE TABLE IF NOT EXISTS Porosity (
    ThinSectionID INTEGER REFERENCES ThinSection(ThinSectionID) ON UPDATE CASCADE ON DELETE CASCADE,
    type TEXT
);

CREATE TABLE IF NOT EXISTS Minearlogy (
    ThinSectionID INTEGER REFERENCES ThinSection(ThinSectionID) ON UPDATE CASCADE ON DELETE CASCADE,
    type TEXT
);

CREATE TABLE IF NOT EXISTS ClasticGrain (
    ThinSectionID INTEGER REFERENCES ThinSection(ThinSectionID) ON UPDATE CASCADE ON DELETE CASCADE,
    type TEXT
);



