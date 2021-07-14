import { CombatTurn } from "./CombatTurn.js";

export function registerSettings() {

    // ==============
    // TIMER SETTINGS
    // ==============

    game.settings.register(CombatTurn.ID, "timer-enable", {
        name: "Timer: enable",
        hint: "If you want to have a visual hint of how much time has passed in a given turn.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(CombatTurn.ID, "timer-duration", {
        name: "Timer: duration",
        hint: "How many minutes per turn?",
        scope: "world",
        config: true,
        range: {
            min: 1,
            max: 30,
            step: 1,
        },
        default: 1, //Change default
        type: Number,
    });

    game.settings.register(CombatTurn.ID, "timer-tick-sound", {
        name: "Timer: tick sound",
        hint: "If filled, enables a ticking sound that slowly fades in when the player is running out of time.",
        scope: "world",
        config: true,
        default: "modules/combat-turn/sounds/clocktick.mp3",
        filePicker: "audio",
        type: String,
    });

    game.settings.register(CombatTurn.ID, "timer-tick-volume", {
        name: "Timer: tick sound volume",
        hint: "Controls the tick sound's maximum volume.",
        scope: "client",
        config: true,
        range: {
            min: 0,
            max: 100,
            step: 10,
        },
        default: 60,
        type: Number,
    });

    game.settings.register(CombatTurn.ID, "timer-finished-sound", {
        name: "Timer: finished sound",
        hint: "If filled, plays a sound when the player runs of time.",
        scope: "world",
        config: true,
        default: "modules/combat-turn/sounds/finish.wav",
        filePicker: "audio",
        type: String,
    });

    game.settings.register(CombatTurn.ID, "timer-finished-volume", {
        name: "Timer: finished sound volume",
        hint: "Controls the finished sound's maximum volume.",
        scope: "client",
        config: true,
        range: {
            min: 0,
            max: 100,
            step: 10,
        },
        default: 60,
        type: Number,
    });

    // ================
    // NEXT UP SETTINGS
    // ================

    game.settings.register(CombatTurn.ID, "nextup-enable", {
        name: "Next Up: enable",
        hint: "If you want to have a notification for the next person in the combat queue.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(CombatTurn.ID, "nextup-trigger-sound", {
        name: "Next Up: sound",
        hint: "If filled, plays a sound while showing the Next Up notification.",
        scope: "world",
        config: true,
        default: "modules/combat-turn/sounds/next.wav",
        filePicker: "audio",
        type: String,
    });

    game.settings.register(CombatTurn.ID, "nextup-trigger-volume", {
        name: "Next Up: sound volume",
        hint: "Controls the Next Up notification sound's volume.",
        scope: "client",
        config: true,
        range: {
            min: 0,
            max: 100,
            step: 10,
        },
        default: 60,
        type: Number,
    });

    // ==================
    // YOUR TURN SETTINGS
    // ==================

    game.settings.register(CombatTurn.ID, "yourturn-enable", {
        name: "Your Turn: enable",
        hint: "If you want to have a notification for the current person in the combat queue.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register(CombatTurn.ID, "yourturn-trigger-sound", {
        name: "Your Turn: sound",
        hint: "If filled, plays a sound while showing the \"Your Turn\" notification.",
        scope: "world",
        config: true,
        default: "modules/combat-turn/sounds/turn.wav",
        filePicker: "audio",
        type: String,
    });

    game.settings.register(CombatTurn.ID, "yourturn-trigger-volume", {
        name: "Your Turn: sound volume",
        hint: "Controls the \"Your Turn\" notification sound's volume.",
        scope: "client",
        config: true,
        range: {
            min: 0,
            max: 100,
            step: 10,
        },
        default: 60,
        type: Number,
    });

    // ========================
    // END TURN BUTTON SETTINGS
    // ========================

    game.settings.register(CombatTurn.ID, "endturn-enable", {
        name: "End Turn: enable",
        hint: "If you want to have an easy-to-reach button for the players to click on to skip the turn.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

}