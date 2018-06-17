var gameModule = {};

gameModule.stages = [
    'spell-selection',
    'task-solving',
    'answer-handling'
];

gameModule.proceedPhaseListener = function (event) {
    event.preventDefault();

    if (!this.currentPhase) {
        this.prepareBattle();
    }
    this.handlePhaseChange();
}

gameModule.prepareBattle = function () {
    this.allies = [this.player];
    this.enemies = [this.monsterGeneratorModule.generateMonster()];
    this.enemies[0].x = 200;
    this.enemies[0].y = 50;
    this.charactersInfoModule.show();
    this.charactersInfoModule.setAllies(this.allies);
    this.charactersInfoModule.setEnemies(this.enemies);
    this.charactersInfoModule.drawInfo();
    this.charactersInfoModule.startDrawingBattlefield();
    this.currentPhase = 'spell-selection';
    this.launchBattleButton.classList.add('invisible');
    this.handlePhaseChange();
}

gameModule.init = function () {
    this.viewComponent = document.getElementsByClassName('game-module')[0];
    this.battleViewComponent = document.getElementsByClassName('battle-view')[0];
    this.battleControlForm = document.getElementsByClassName('battle-control-form')[0];
    this.launchBattleButton = document.getElementsByClassName('launch-battle-input')[0];
    this.credentialsInputModuleController = credentialsInputModuleController;
    this.battleControlModule = battleControlModule;
    this.charactersInfoModule = charactersInfoModule;
    this.spellModuleController = spellModuleController;
    this.taskModuleController = taskModuleController;
    this.monsterGeneratorModule = monsterGeneratorModule;
    this.scoreModuleController = scoreModuleController;

    this.credentialsInputModuleController.init();
    this.battleControlModule.init();
    this.charactersInfoModule.init();
    this.spellModuleController.init();
    this.taskModuleController.init();
    this.scoreModuleController.init();

    this.bindEventListeners();
}

gameModule.bindEventListeners = function () {
    this.launchBattleButton.addEventListener('click', this.proceedPhaseListener.bind(this));
    this.viewComponent.addEventListener('namesubmit', this.onNameSubmit.bind(this));
    this.viewComponent.addEventListener('spellselect', this.onSpellSelect.bind(this));
    this.viewComponent.addEventListener('answersubmit', this.onAnswerSubmit.bind(this));
}

gameModule.onNameSubmit = function (event) {
    this.player = {
        name: event.detail.name,
        spells: spells,
        x: 50,
        y: 30,
        health: 100,
        kills: 0,
        drawSelf: function (canvas) {
            var ctx = canvas.getContext("2d");

            var headRadius = 10;
            ctx.beginPath();
            ctx.arc(this.x + headRadius / 2, this.y + headRadius / 2, headRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = "rgb(209, 153, 153)";
            ctx.fill();
            ctx.closePath();

            var eyeRadius = 2;
            ctx.beginPath();
            ctx.arc(this.x + headRadius - eyeRadius / 2, this.y + headRadius / 2, eyeRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fill();
            ctx.closePath();

            var eyePupilRadius = 1;
            ctx.beginPath();
            ctx.arc(this.x + headRadius - eyeRadius / 2 + eyePupilRadius, this.y + headRadius / 2, eyePupilRadius, 0, Math.PI * 2, false);
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fill();
            ctx.closePath();

            var bodyHeight = 20;
            var bodyWidth = 13;
            ctx.beginPath();
            ctx.rect(this.x + headRadius / 2 - bodyWidth / 2, this.y + headRadius, bodyWidth, bodyHeight);
            ctx.fillStyle = "rgb(100, 100, 255)";
            ctx.fill();
            ctx.closePath();
        }
    };
    this.credentialsInputModuleController.hide();
    this.battleControlModule.show();
}

gameModule.onSpellSelect = function () {
    this.currentPhase = 'task-solving';
    this.handlePhaseChange();
}

gameModule.onAnswerSubmit = function (event) {
    this.taskModuleController.endTask();
    this.taskModuleController.hide();
    this.processTurnResult(event.detail.correct);
    setTimeout(this.handlePhaseChange.bind(this), 2000);
}

gameModule.processSpellcasting = function (correctAnswer) {
    var effectObject;
    if (correctAnswer) {
        if (this.spellModuleController.selectedSpell.type === 'offensive') {
            effectObject = this.spellModuleController.selectedSpell.createSpellEffectObject(this.allies[0], this.enemies[0]);
            this.charactersInfoModule.addEffectObject(effectObject);
            this.enemies[0].health = this.enemies[0].health - this.spellModuleController.selectedSpell.power;
        }
        if (this.spellModuleController.selectedSpell.type === 'defensive') {
            effectObject = this.spellModuleController.selectedSpell.createSpellEffectObject(this.allies[0], this.allies[0]);
            this.charactersInfoModule.addEffectObject(effectObject);
            this.allies[0].health = this.allies[0].health + this.spellModuleController.selectedSpell.power;
        }
    } else {
        this.enemies[0].selectSpell();
        if (this.enemies[0].selectedSpell.type === 'offensive') {
            effectObject = this.spellModuleController.selectedSpell.createSpellEffectObject(this.enemies[0], this.allies[0]);
            this.charactersInfoModule.addEffectObject(effectObject);
            this.allies[0].health = this.allies[0].health - this.enemies[0].selectedSpell.power;
        }
        if (this.enemies[0].selectedSpell.type === 'defensive') {
            effectObject = this.spellModuleController.selectedSpell.createSpellEffectObject(this.enemies[0], this.enemies[0]);
            this.charactersInfoModule.addEffectObject(effectObject);
            this.enemies[0].health = this.enemies[0].health + this.enemies[0].selectedSpell.power;
        }
    }
}

gameModule.processHealthPoints = function () {
    if (this.allies[0].health <= 0) {
        this.currentPhase = 'game-end';
        return;
    }
    if (this.enemies[0].health <= 0) {
        this.currentPhase = 'battle-end';
        return;
    }
    this.currentPhase = 'spell-selection';
}

gameModule.endBattle = function () {
    this.player.kills += 1;
    this.charactersInfoModule.stopDrawingBattlefield();
    this.currentPhase = null;
    this.launchBattleButton.classList.remove('invisible');
}

gameModule.endGame = function () {
    this.charactersInfoModule.stopDrawingBattlefield();
}

gameModule.processTurnResult = function (correctAnswer) {
    this.processSpellcasting(correctAnswer);
    this.processHealthPoints();
    this.charactersInfoModule.drawInfo();
}

gameModule.handlePhaseChange = function () {
    switch (this.currentPhase) {
        case 'spell-selection':
            this.spellModuleController.show();
            this.taskModuleController.hide();
            break;
        case 'task-solving':
            this.spellModuleController.hide();
            this.taskModuleController.show();
            this.taskModuleController.startTask();
            break;
        case 'battle-end':
            this.spellModuleController.hide();
            this.taskModuleController.hide();
            this.endBattle();
            break;
        case 'game-end':
            this.taskModuleController.hide();
            this.charactersInfoModule.hide();
            this.scoreModuleController.show();
            this.scoreModuleController.handlePlayerResult(this.allies[0]);
            this.scoreModuleController.populateScoreTable();
            break;
        default:
            throw new Error('empty phase');
    }
}

document.addEventListener('DOMContentLoaded', function () { gameModule.init(); });
//window.addEventListener('load', gameModule.init);


/*
if(window.attachEvent) {
    window.attachEvent('onload', yourFunctionName);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function(evt) {
            curronload(evt);
            yourFunctionName(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = yourFunctionName;
    }
}
*/