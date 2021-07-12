import { CombatTurn } from "./CombatTurn.js";

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(CombatTurn.ID);
});

Hooks.once('ready', async function() {
    CombatTurn.log("ready");
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
    CombatTurn.log("updateCombat", combatDoc.turns.map(turn => turn.name));

    const activePlayer = game.users.current.character?._id;
    const activeCombatant = combatDoc.turns[combatDoc.current.turn].actor?.id;

    if(activePlayer === activeCombatant) {

        CombatTurn.log("YOUR TURN");

    }

    const nextCombatantIndex = (combatDoc.current.turn + 1) % combatDoc.turns.length;
    const nextCombatant = combatDoc.turns[nextCombatantIndex].actor?.id;

    if(activePlayer === nextCombatant) {

        CombatTurn.log("YOU'RE NEXT");

    }

});

// Hooks.on('deleteCombat', async function(combatDoc, options, userId) {
//     CombatTurn.log("deleteCombat", combatDoc);
// });

// Hooks.on('pauseGame', async function(state) {
//     CombatTurn.log("pauseGame", state);
// });
