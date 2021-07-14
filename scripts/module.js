import { CombatTurn } from "./CombatTurn.js";

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(CombatTurn.ID);
});

Hooks.once("socketlib.ready", () => {
    CombatTurn.log("socketLib.ready");
	CombatTurn.socket = socketlib.registerModule(CombatTurn.ID);
	CombatTurn.socket.register("timer", logtimer);
});

function logtimer(timer) {
	CombatTurn.log(`timer: ${timer}`);
}

Hooks.once('ready', async function() {
    CombatTurn.log("ready");
    // game.socket.on(CombatTurn.ID, (data) => {
    //     if (!game.user.isGM) {
    //         CombatTurn.timer = data;
    //         CombatTurn.log(CombatTurn.timer);
    //     }
    // });
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

        CombatTurn.intervalId = setInterval(() => {

            CombatTurn.timer++;

            CombatTurn.log(CombatTurn.timer);

            CombatTurn.socket.executeForOthers("timer", CombatTurn.timer);

        }, 1000);

    }

    CombatTurn.currentCombatantId = currentCombatant.id;

});

// Hooks.on('deleteCombat', async function(combatDoc, options, userId) {
//     CombatTurn.log("deleteCombat", combatDoc);
// });

// Hooks.on('pauseGame', async function(state) {
//     CombatTurn.log("pauseGame", state);
// });
