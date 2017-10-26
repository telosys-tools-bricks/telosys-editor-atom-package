'use babel';

import CommonProvider from './commonProvider';
// data source is an array of objects
import suggestions from '../providers/telosys.entity';

class EntityProvider extends CommonProvider {
	constructor() {
		super();
		// import our file-specific suggestions
		this.suggestions = suggestions;
		// offer suggestions only when editing specific files
		this.selector = '.source.entity';
	}
}
export default new EntityProvider();
