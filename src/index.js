import {get, set, remove} from "./helpers/session-storage";

export default function actionRecorder({storagePrefix, transform}) {
	return () => (next) => (action) => {
		let actions = [];
		const data = transform ? transform(action.data) : action.data;
		try {
			if (action.type === "@@redux/INIT") {
				remove({prefix: storagePrefix, key: "current"});
			}
			actions = JSON.parse(get({prefix: storagePrefix, key: "current"})) || [];

			actions.push({
				type: action.type,
				data: data,
				time: Date.now()
			});
		}
		catch(e) {
			actions.push({
				type: action.type,
				data: data,
				time: Date.now()
			});
		}
		set({prefix: storagePrefix, key: "current", data: JSON.stringify(actions)});
		next(action);
	};
}

export function getActions(storagePrefix) {
	return JSON.parse(get({prefix: storagePrefix, key: current}));
}