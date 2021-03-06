import stem from "../../../../../../src/languageProcessing/languages/fr/helpers/internal/stem";
import getMorphologyData from "../../../../../specHelpers/getMorphologyData";

const morphologyDataFR = getMorphologyData( "fr" ).fr;

// The first word in each array is the word, the second one is the expected stem.
const wordsToStem = [
	// RV is the region after the third letter if the word begins with two vowels.
	[ "aimer", "aim" ],
	// RV is the region after the first vowel not at the beginning of the word.
	[ "adorer", "ador" ],
	// RV is the end of the word if the previous positions cannot be found.
	[ "voler", "vol" ],
	// RV is the right of par, col, tap for words beginning with those syllables.
	[ "tapis", "tapi" ],
	// RV is equal to the length of the word if no other position is matched.
	[ "a", "a" ],
	// R1 is the end of the word if there are no consonants in the word.
	[ "ai", "ai" ],
	// Input a word ending in -ci + a2 class suffix.
	[ "cicatrice", "cicatric" ],
	// Input a noun ending in -ance.
	[ "concordances", "concord" ],
	[ "concordance", "concord" ],
	// Input a noun ending in -ition.
	[ "opposition", "oppos" ],
	[ "oppositions", "oppos" ],
	[ "acquisition", "acquer" ],
	[ "acquisitions", "acquer" ],
	// Input a noun ending in -ique.
	[ "botaniques", "botan" ],
	[ "botanique", "botan" ],
	// Input a noun ending in -isme.
	[ "dualismes", "dualism" ],
	[ "dualisme", "dualism" ],
	// Input a noun ending in -able.
	[ "confortables", "confort" ],
	[ "confortable", "confort" ],
	// Input a noun ending in -iste.
	[ "fatalistes", "fatal" ],
	[ "fataliste", "fatal" ],
	// Input a noun ending in -eux.
	[ "bileux", "bileux" ],
	// Input a noun ending in -atrice.
	[ "curatrices", "cur" ],
	[ "curatrice", "cur" ],
	// Input a noun ending in -eur.
	[ "acteurs", "acteur" ],
	// Input a noun ending in -logie.
	[ "analogie", "analog" ],
	[ "analogies", "analog" ],
	// Input a noun ending in -usion.
	[ "autotransfusion", "autotransfu" ],
	[ "autotransfusions", "autotransfu" ],
	// Input a noun ending in -ence.
	[ "diff??rence", "diff??rent" ],
	[ "diff??rences", "diff??rent" ],
	// Input a noun ending in -it??.
	[ "r??alit??", "r??alit" ],
	[ "r??alit??s", "r??alit" ],
	// Input a noun ending in -if.
	[ "corrosif", "corros" ],
	[ "corrosives", "corros" ],
	// Input a noun ending in -eaux.
	[ "tableaux", "tableau" ],
	// Input a noun ending in -aux.
	[ "animaux", "animal" ],
	// Input a noun ending in -euse.
	[ "paresseuse", "paress" ],
	[ "paresseuses", "paress" ],
	// Input a noun ending in -issement.
	[ "divertissement", "divert" ],
	[ "divertissements", "divert" ],
	// Input a noun ending in -amment.
	[ "couramment", "cour" ],
	// Input a noun ending in -emment.
	[ "apparemment", "apparent" ],
	// Input a noun ending in -ment.
	[ "cl??ment", "cl??ment" ],
	[ "cl??ments", "cl??ment" ],
	[ "accident", "accident" ],
	[ "accidents", "accident" ],
	[ "testament", "testament" ],
	[ "testaments", "testament" ],
	[ "coefficient", "coefficient" ],
	[ "coefficients", "coefficient" ],
	[ "filament", "filament" ],
	[ "filaments", "filament" ],
	// Input a noun ending in -i??re.
	[ "lumi??re", "lumi" ],
	// Noun ending in -stion.
	[ "suggestion", "suggest" ],
	// Noun ending in -it??.
	[ "nativit??", "nativ" ],
	// Noun ending in -ivit??.
	[ "relativit??", "relat" ],
	// Short noun ending in -icit??.
	[ "toxicit??", "toxiqu" ],
	// Long noun ending in -icit??.
	[ "automaticit??", "automat" ],
	// Short noun ending in -abilit??.
	[ "stabilit??", "stabl" ],
	// Long noun ending in -abilit??.
	[ "biod??gradabilit??", "biod??grad" ],
	// Noun ending in -logie.
	[ "nanotechnologie", "nanotechnolog" ],
	// Long noun ending in -ication.
	[ "classification", "classif" ],
	// Words on the exception list with full forms.
	[ "yeux", "??il" ],
	[ "oeil", "??il" ],
	[ "??il", "??il" ],
	[ "ciels", "ciel" ],
	[ "cieux", "ciel" ],
	[ "fol", "fou" ],
	[ "doucement", "doux" ],
	// Words that have multiple stems.
	[ "favorit", "favor" ],
	[ "fra??ch", "frais" ],
	[ "fraich", "frais" ],
	// Words with the plural suffix -x.
	[ "baux", "bau" ],
	[ "feux", "feu" ],
	[ "cailloux", "caillou" ],
	[ "??taux", "??tau" ],
	// Plurals ending in -is/-os/-us.
	[ "vrais", "vrai" ],
	[ "num??ros", "num??ro" ],
	[ "trous", "trou" ],
	// Exceptions for which -is/-os/-us should not be stemmed.
	[ "bis", "bis" ],
	[ "diffus", "diffus" ],
	[ "clos", "clos" ],
	// Short words that should be stemmed.
	[ "ardemment", "ardent" ],
	[ "ours", "our" ],
	[ "action", "act" ],
	[ "actions", "act" ],
	[ "??me", "??m" ],
	[ "??mes", "??m" ],
	// Verbs with multiple stems.
	[ "acquit", "acquer" ],
	[ "astrein", "astreindr" ],
	[ "v??cu", "vivr" ],
	// Verbs with multiple stems ending in -s. (Removed from list of verbs ending in -s that shouldn't be stemmed.)
	[ "acquis", "acquer" ],
	[ "appris", "apprendr" ],
	[ "assis", "asseoir" ],
	// Verbs with suffix -ons.
	[ "chantons", "chant" ],
	[ "dessinons", "dessin" ],
	[ "nettoyons", "nettoi" ],
	// Verb with suffix -ions
	[ "arrivions", "arriv" ],
	// Adverb with suffix -ment.
	[ "disproportionn??ment", "disproportion" ],
	// Adverb ending on -ement.
	[ "absurdement", "absurd" ],
	// Adverb ending on -i??rement.
	[ "particuli??rement", "particul" ],
	// Adverb ending on -iquement.
	[ "acad??miquement", "academ" ],
	// Adjective ending on -euse.
	[ "co??teuse", "co??teux" ],
	// Short word ending on -euse.
	[ "meuse", "meus" ],
	// Short adjective ending on -icative.
	[ "indicative", "indiqu" ],
	// Long adjective ending on -icative.
	[ "communicative", "commun" ],
	// Adverb ending on -eusement where -eus should be replaced with -eux.
	[ "affreusement", "affreux" ],
	// Adverb ending on -eusement where only -ement should be removed.
	[ "preusement", "preus" ],
	// Adverb ending on -eusement.
	[ "c??r??monieusement", "c??r??mon" ],
	// Adverb ending on -ativement.
	[ "administrativement", "administr" ],
	// Adverb ending on -ativement where only -ivement should be stemmed.
	[ "relativement", "relat" ],
	// Adjective ending in -gu??
	[ "ambigu??", "ambigu" ],
	// -Ons is not stemmed if preceded by i.
	[ "questions", "question" ],
	[ "stations", "station" ],
	// Word with ?? at the end after removing suffixes.
	[ "grin??ant", "grinc" ],
	// Two-syllable verbs that start with a vowel and end on -ons.
	[ "aidons", "aid" ],
	[ "aimons", "aim" ],
	// Non-verbs ending on -ons where only -s should be stemmed.
	[ "chansons", "chanson" ],
	[ "potirons", "potiron" ],
	[ "taille-crayons", "taille-crayon" ],
	// Irregular verbs added to the full forms.
	[ "prirent", "prend" ],
	[ "croiraient", "croi" ],
];

const paradigms = [
	// A paradigm of a noun.
	{ stem: "acteur", forms: [ "acteurs", "acteur" ] },
	// A paradigm of an adjective.
	{ stem: "import", forms: [
		"important",
		"importante",
		"importants",
		"importantes",
	] },
	// A paradigm of a verb the suffixes of which start with i.
	{ stem: "dorm",
		forms: [
			// "dors",
			// "dort",
			// "dormons",
			"dormez",
			"dorment",
			"dormais",
			"dormait",
			// "dormions",
			"dormiez",
			"dormaient",
			"dormirai",
			"dormiras",
			"dormira",
			"dormirons",
			"dormirez",
			"dormiront",
			"dormis",
			"dormit",
			"dorm??mes",
			"dorm??tes",
			"dormirent",
			"dormes",
			"dorme",
			// "dormions",
			"dormiez",
			"dormisse",
			"dormisses",
			"dorm??t",
			"dormissions",
			"dormissiez",
			"dormissent",
			"dormirais",
			"dormirait",
			"dormirions",
			"dormiriez",
			"dormiraient",
			"dormant",
			// "dormons",
			"dormez",
			"dormi",
			"dormir",
		] },
];


describe( "Test for stemming French words", () => {
	for ( let i = 0; i < wordsToStem.length; i++ ) {
		const wordToCheck = wordsToStem[ i ];
		it( "stems the word " + wordToCheck[ 0 ], () => {
			expect( stem( wordToCheck[ 0 ], morphologyDataFR ) ).toBe( wordToCheck[ 1 ] );
		} );
	}
} );

describe( "Test to make sure all forms of a paradigm get stemmed to the same stem", () => {
	for ( const paradigm of paradigms ) {
		for ( const form of paradigm.forms ) {
			it( "correctly stems the word: " + form + " to " + paradigm.stem, () => {
				expect( stem( form, morphologyDataFR ) ).toBe( paradigm.stem );
			} );
		}
	}
} );
