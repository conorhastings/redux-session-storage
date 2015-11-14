import {get, set, remove} from "./helpers/session-storage";

export default function actionRecorder({key, transform, limit}) {
	return () => (next) => (action) => {
		let actions = [];
		const transformedAction = transform ? transform(action) : action;
		let actionToStore = Object.keys(transformedAction).reduce((actionData, item) => {
			actionData[item] = transformedAction[item];
			return actionData;
		}, {});
		actionToStore.timestamp = Date.now();
		try {
			actions = JSON.parse(get({key})) || [];
			actions.push(actionToStore);
		}
		catch(e) {
			actions.push(actionToStore);
		}
		if (limit && actions.length > limit) {
			actions = actions.slice(actions.length - limit, actions.length);
		}
		set({key, data: JSON.stringify(actions)});
		next(action);
	};
}

export function getActions(key) {
	return JSON.parse(get({key}));
}