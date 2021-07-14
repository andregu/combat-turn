export class CombatTurn {

    static ID = "combat-turn";
    static currentCombatantId =  "";
    static intervalId = 0;
    static timer = 0;
    static socket;

    static log(...args) {
        const shouldLog = game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);

        if (shouldLog) {
            console.log(this.ID, '|', ...args);
        }
    }

}