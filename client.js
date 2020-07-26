import * as alt from "alt-client";
import * as native from "natives";

const INTERACTION_KEY = 0x45;

class Interaction {
    static _interactions = {};

    /**
     * Creates an instance of Interaction
     * @author LeonMrBonnie
     * @param {String} name
     * @param {alt.Vector3} pos
     * @param {Number} range
     * @param {() => void} handler
     * @memberof Interaction
     */
    constructor(name, pos, range, handler) {
        this._name = name;
        this._pos = pos;
        this._range = range;
        this._handler = handler;

        let zone = getZoneName(pos.x, pos.y, pos.z);
        if (!Interaction._interactions[zone])
            Interaction._interactions[zone] = [];
        Interaction._interactions[zone].push(this);
    }
    /**
     * Destroys the Interaction
     *
     * @author LeonMrBonnie
     * @returns
     * @memberof Interaction
     */
    destroy() {
        let zone = getZoneName(pos.x, pos.y, pos.z);
        let idx = Interaction._interactions[zone].findIndex(
            (interaction) => interaction.name === this.name
        );
        if (idx === -1) return;
        Interaction._interactions[zone].splice(idx, 1);
    }
    get name() {
        return this._name;
    }
    get pos() {
        return this._pos;
    }
    get range() {
        return this._range;
    }
    get handler() {
        return this._handler;
    }

    /**
     * Gets the nearest interaction
     *
     * @author LeonMrBonnie
     * @static
     * @param {alt.Vector3} pos
     * @returns {Interaction}
     * @memberof Interaction
     */
    static getNearest(pos) {
        let zone = getZoneName(pos.x, pos.y, pos.z);
        if (!Interaction._interactions[zone]) return null;
        let lastDistance = 999;
        let foundInteraction = null;
        for (const interaction of Interaction._interactions[zone]) {
            let distance = vectorDistance(interaction.pos, pos);
            if (distance <= interaction.range && distance < lastDistance) {
                foundInteraction = interaction;
                lastDistance = distance;
            }
        }
        return foundInteraction;
    }
    /**
     * Gets interaction by name
     *
     * @author LeonMrBonnie
     * @static
     * @param {String} name
     * @returns {Interaction}
     * @memberof Interaction
     */
    static getByName(name) {
        for(const zone in Interaction._interactions) {
            for(const interaction of Interaction._interactions[zone]) {
                if(interaction.name === name) return interaction;
            }
        }
        return null;
    }
}

let lastPress = +new Date();
const debounce = 500;
alt.on("keyup", (key) => {
    if (key !== INTERACTION_KEY) return;
    if (alt.isConsoleOpen()) return;
    if (+new Date() < lastPress + debounce) return;

    lastPress = +new Date();
    let interaction = Interaction.getNearest(alt.Player.local.pos);
    if (!interaction) return;
    interaction.handler();
    alt.log(`Interacted with: '${interaction.name}'`);
});

// Functions

function vectorDistance(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) return;
    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) +
            Math.pow(vector1.y - vector2.y, 2) +
            Math.pow(vector1.z - vector2.z, 2)
    );
}

function getZoneName(x, y, z) {
    let zone = native.getNameOfZone(x, y, z);
    return zone;
}

//Exports

export function createInteraction(name, pos, range, handler) {
    if(typeof name !== "string") return alt.logError(`[Interactions]: Name is not a string`);
    if(typeof range !== "number") return alt.logError(`[Interactions]: Range is not a number`);
    if(typeof handler !== "function") return alt.logError(`[Interactions]: Handler is not a function`);
    new Interaction(name, pos, range, handler);
}

export function removeInteraction(name) {
    let interaction = Interaction.getByName(name);
    if(!interaction) return alt.logError(`[Interactions]: Interaction '${name}' was not found`);
    interaction.destroy();
}
