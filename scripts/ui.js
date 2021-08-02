export default class CombatTurnUi extends Application {

    constructor(options={}) { 
        super(options);
    }

    /**
     * Call app default options
     * @override
     */
     static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "combat-carousel",
            template: "modules/combat-turn/templates/main.hbs",
            popOut: false,
            top: 0,
            left: 0
        });
    }

    async _render(force, options={}) {

        await super._render(force, options);

    }

    getData() {
        
    }

}