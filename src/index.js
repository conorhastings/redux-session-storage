import {get, set, remove} from "./helpers/session-storage";

export default function actionRecorder({key, transform, limit, reset}) {
	let callCount = 0;
	return ({getState}) => (next) => (action) => {
		if (reset && !callCount) {
			remove({key});
		}
		callCount += 1;
		let actions = [];
		const transformedAction = transform ? transform(action, getState) : action;
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