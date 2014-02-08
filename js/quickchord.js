var canvasName = "quickChordCanvas";

var chordArray = 
[
	{
		"name": "B Major",
		"keys": ["1B", "2Ds", "2Fs"]
	},
	{
		"name": "C Major",
		"keys": ["1C", "1E", "1G"]
	},
	{
		"name": "C Minor",
		"keys": ["1C", "1Ds", "1G"]
	},
	{
		"name": "E Major",
		"keys": ["1E", "1Gs", "2C"]
	},
	{
		"name": "F Minor",
		"keys": ["1F", "1Gs", "2C"]
	}
];

function drawMultipleChords(chordNameArray, width, height)
{
	var buffer = 10;
	var x_pos = 0;
	var y_pos = 0;
	var chordWidth = width;
	var chordHeight = (height/chordNameArray.length)-buffer;

	for(var c = 0; c < chordNameArray.length; c++)
	{
		console.log("hello " + y_pos);
		drawChord(x_pos, y_pos, chordWidth, chordHeight, chordNameArray[c], canvasName);
		y_pos += chordHeight + buffer;
	}
}

function drawChord(x, y, width, height, chordName, canvas)
{
	var ctx = document.getElementById(canvas).getContext('2d');
	var keyNameArray = ["1C", "1Cs", "1D", "1Ds", "1E", "1F", "1Fs", "1G", "1Gs", "1A", "1As", "1B", "2C", "2Cs", "2D", "2Ds", "2E", "2F", "2Fs", "2G", "2Gs", "2A", "2As", "2B"];
	var keyBlackOrWhiteArray = [0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0];
	var keyWidth = width/keyBlackOrWhiteArray.length;
	var keyHeight = height;
	var blackHeightRatio = 0.5; //Ratio of black length vs white length
	var blackWidthRatio = 0.9;

	var keys = getKeysByChord(chordName);

	var nextKeyLocation = 0;

	for(var c = 0; c < keyBlackOrWhiteArray.length; c++)
	{
		var whiteKeyColor = "#FFFFFF";

		if(keyBlackOrWhiteArray[c] == 0) //Draw a white key
		{
			if($.inArray(keyNameArray[c], keys) != -1) whiteKeyColor = "#AAAAFF";

			drawKey(nextKeyLocation, y, keyWidth, keyHeight, whiteKeyColor, ctx);
			nextKeyLocation += keyWidth;
		}
	}

	nextKeyLocation = 0;

	for(var c = 0; c < keyBlackOrWhiteArray.length; c++)
	{
		var blackKeyColor = "#000000";

		if(keyBlackOrWhiteArray[c] == 0) nextKeyLocation += keyWidth;
		if(keyBlackOrWhiteArray[c] == 1) //Draw a black key
		{
			if($.inArray(keyNameArray[c], keys) != -1) blackKeyColor = "#2222FF";

			drawKey(nextKeyLocation-(keyWidth*blackWidthRatio)/2, y, keyWidth*blackWidthRatio, keyHeight * blackHeightRatio, blackKeyColor, ctx);
		}
	}

	//drawKey(0, 0, 50, 30, "#FFFFFF", ctx);
}

function drawKey(x, y, width, height, color, ctx)
{
	var outlineColor = "#000000";
	var outlineThickness = 2;

	ctx.fillStyle = outlineColor;
	ctx.fillRect(x, y, width, height);

	ctx.fillStyle = color;
	ctx.fillRect(x+outlineThickness, y+outlineThickness, width-(outlineThickness*2), height-(outlineThickness*2));
}

function getKeysByChord(chordName)
{
	for(var c = 0; c < chordArray.length; c++)
	{
		var workingChord = chordArray[c];

		if(workingChord.name == chordName)
		{
			return workingChord.keys;
		}
	}

	return [];
}