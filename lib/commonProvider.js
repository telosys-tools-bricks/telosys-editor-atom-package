'use babel';

export default class CommonProvider {
	constructor() {
	}

	getSuggestions(options) {
		const { editor, bufferPosition } = options;

		// getting the prefix on our own instead of using the one Atom provides
		let prefix = this.getPrefix(editor, bufferPosition);

		// only look for suggestions after 1 characters have been typed
		if (prefix.length >= 1) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	getPrefix(editor, bufferPosition) {
		// expands the prefix back until a whitespace character is met
		let line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
		let match = line.match(/\S+$/);
		return match ? match[0] : '';
	}

	findMatchingSuggestions(prefix) {
		// filter list of suggestions to those matching the prefix, case insensitive
		let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = this.suggestions.filter((suggestion) => {
			let textLower = suggestion.text.toLowerCase();
			return textLower.startsWith(prefixLower);
		});

		// bind a version of inflateSuggestion() that always passes in prefix
	  // then run each matching suggestion through the bound inflateSuggestion()
		let inflateSuggestion = this.inflateSuggestion.bind(this, prefix);
		let inflatedSuggestions = matchingSuggestions.map(inflateSuggestion);

		return inflatedSuggestions;
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(replacementPrefix, suggestion) {
		return {
			text: suggestion.text,
			type: suggestion.type,
			replacementPrefix: replacementPrefix, // ensures entire prefix is replaced
		};
	}
}
