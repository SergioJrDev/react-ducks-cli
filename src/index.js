const argv = require('yargs').argv;
const { createReducer } = require('./reducers');
const { createStore, createStateStore, removeStateStore } = require('./store');
const { createFolder, base, logError, logSuccess, createFile, getConfigFile } = require('./communs');
const { init, state, action, value, removeState: removeState_ } = argv;

const starter = async () => {
    try {
        await createFolder(base);
        createFile(`${base}/reduxConfig.json`, '{}');
        createReducer();
        createStore();
        logSuccess();
    } catch(error) {
        logError(error);
    }
};

const addState = async () => {
    try {
        const file  = await getConfigFile();
        const fileParsed = await JSON.parse(file);
        createStateStore(state, action, value, fileParsed);
        logSuccess();
    } catch(error) {
        logError(error);
    }
};

const removeState = async (state) => {
    try {
        const file  = await getConfigFile();
        const store = await getConfigFile(`${base}/store/storeDefault.json`);
        const fileParsed = await JSON.parse(file);
        const storeParsed = await JSON.parse(store);
        await removeStateStore(state, fileParsed, storeParsed);
    } catch(error) {
        logError(error);
    }
};

// Start
if (init) {
    starter();
}

// Create a state
if (state) {
    addState();
}

// Remove a state
if(removeState_) {
    removeState(removeState_);
}

// Remove an action
