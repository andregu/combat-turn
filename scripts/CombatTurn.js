export class CombatTurn {

    static ID = "combat-turn";

    static log(...args) {  
        const shouldLog = game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);

        if (shouldLog) {
            console.log(this.ID, '|', ...args);
        }
    }

}