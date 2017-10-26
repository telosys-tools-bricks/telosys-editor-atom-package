'use babel';

import CommonProvider from './commonProvider';
// data source is an array of objects
import suggestions from '../providers/telosys.vm';

class VmProvider {
	constructor() {
		super ();
		// import our file-specific suggestions
		this.suggestions = suggestions;
		// offer suggestions only when editing specific files
		this.selector = '.source.vm';
	}
}
export default new VmProvider();
