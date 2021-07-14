import { CombatTurn } from "./CombatTurn.js";
import { registerSettings } from "./settings.js";

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(CombatTurn.ID);
});

Hooks.once("socketlib.ready", () => {
    CombatTurn.log("socketLib.ready");
	CombatTurn.socket = socketlib.registerModule(CombatTurn.ID);
	CombatTurn.socket.register("timer", logtimer);
});

function easeInQuart(x) {
    return x ** 4;
}

function logtimer(timer) {
    const maxTimer = game.settings.get(CombatTurn.ID, "timer-duration") * 60;

    const tickSound = game.settings.get(CombatTurn.ID, "timer-tick-sound");
    if (tickSound != "") {
        AudioHelper.play({
            src: tickSound,
            volume: (game.settings.get(CombatTurn.ID, "timer-tick-volume") / 100.0) * easeInQuart(timer / maxTimer)
        })
    }

    //TODO: update timer
    CombatTurn.log(timer, maxTimer);

    if(timer >= maxTimer){

        const finishedSound = game.settings.get(CombatTurn.ID, "timer-finished-sound");
        if (finishedSound) {
            AudioHelper.play({
                src: finishedSound,
                volume: game.settings.get(CombatTurn.ID, "timer-finished-volume") / 100.0,
                autoplay: true
            })
        }

        if(game.user.isGM) {
            clearInterval(CombatTurn.intervalId);
        }
    }
}

function updateForm() {

}

Hooks.once('ready', async function() {
    CombatTurn.log("ready");
    registerSettings();
});

// Hooks.on('createCombatant', async function(combatantDoc, options, userId) {
//     CombatTurn.log("createCombatant", combatantDoc);
// });

// Hooks.on('updateCombatant', async function(combatantDoc, diff, options, userId) {
//     CombatTurn.log("updateCombatant", combatantDoc);
// });

// Hooks.on('deleteCombatant', async function(combatantDoc, options, userId) {
//     CombatTurn.log("deleteCombatant", combatantDoc);
// });

// Hooks.on('createCombat', async function(combatDoc, options, userId) {
//     CombatTurn.log("createCombat", combatDoc);
// });

Hooks.on('updateCombat', async function(combatDoc, diff, options, userId) {
    //CombatTurn.log("updateCombat", combatDoc.turns.map(turn => turn.name));

    const currentCombatantIndex = combatDoc.current.turn;
    const currentCombatant = combatDoc.turns[currentCombatantIndex];

    if(currentCombatant.actor?.isOwner && !game.user.isGM) {

        // ACTIVE PLAYER
        // TODO: update form

        CombatTurn.log("YOUR TURN", currentCombatant.actor.name);

    }

    const nextCombatantIndex = (currentCombatantIndex + 1) % combatDoc.turns.length;
    const nextCombatant = combatDoc.turns[nextCombatantIndex]

    if(nextCombatant.actor?.isOwner && !game.user.isGM) {

        // NEXT ACTIVE PLAYER

        CombatTurn.log("YOU'RE NEXT", nextCombatant.actor.name);

    }

    if(currentCombatant.id !== CombatTurn.currentCombatantId && game.user.isGM){

        CombatTurn.log("start Timer");

        clearInterval(CombatTurn.intervalId);
        CombatTurn.timer = 0;

        CombatTurn.intervalId = setInterval(() => {

            CombatTurn.timer++;
            CombatTurn.socket.executeForEveryone("timer", CombatTurn.timer);

        }, 1000); // TODO: Change to 1000

    }

    CombatTurn.currentCombatantId = currentCombatant.id;

});

// Hooks.on('deleteCombat', async function(combatDoc, options, userId) {
//     CombatTurn.log("deleteCombat", combatDoc);
// });

// Hooks.on('pauseGame', async function(state) {
//     CombatTurn.log("pauseGame", state);
// });
