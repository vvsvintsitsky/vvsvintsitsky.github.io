var charactersInfoModule = {};

charactersInfoModule.init = function () {
    this.viewComponent = document.getElementsByClassName('characters-info')[0];
    this.alliesComponent = this.viewComponent.getElementsByClassName('allies')[0];
    this.enemiesComponent = this.viewComponent.getElementsByClassName('enemies')[0];
    this.canvasElement = this.viewComponent.getElementsByClassName('battle-view-renderer')[0];
    this.effectObjectsArray = [];
}

charactersInfoModule.addEffectObject = function (effectObject) {
    this.effectObjectsArray.push(effectObject);
    setTimeout(function () { new Audio(effectObject.soundURL).play() }, 0);
}

charactersInfoModule.hide = function () {
    this.viewComponent.classList.add('invisible');
}

charactersInfoModule.show = function () {
    this.viewComponent.classList.remove('invisible');
}

charactersInfoModule.toggleVisibility = function () {
    this.viewComponent.classList.toggle('invisible');
}

charactersInfoModule.setAllies = function (allies) {
    this.allies = allies;
}

charactersInfoModule.setEnemies = function (enemies) {
    this.enemies = enemies;
}

charactersInfoModule.startDrawingBattlefield = function () {
    this.drawInterval = setInterval(this.drawBattlefield.bind(this), 40);
}

charactersInfoModule.stopDrawingBattlefield = function () {
    clearInterval(this.drawInterval);
}

charactersInfoModule.drawBattlefield = function () {
    var ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    for (var i = 0; i < this.allies.length; i++) {
        this.allies[i].drawSelf(this.canvasElement, 30, 30);
    }

    for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].drawSelf(this.canvasElement);
    }

    this.effectObjectsArray = this.effectObjectsArray.filter(function (element) {
        return !element.effectEnded;
    });

    for (var i = 0; i < this.effectObjectsArray.length; i++) {
        this.effectObjectsArray[i].drawSelf(this.canvasElement);
    }
}

charactersInfoModule.drawInfo = function () {
    var node;

    while (this.alliesComponent.firstChild) {
        this.alliesComponent.removeChild(this.alliesComponent.firstChild);
    }

    while (this.enemiesComponent.firstChild) {
        this.enemiesComponent.removeChild(this.enemiesComponent.firstChild);
    }

    for (var i = 0; i < this.allies.length; i++) {
        node = document.createElement('div');
        node.textContent = this.allies[i].name + ': ' + this.allies[i].health;
        this.alliesComponent.appendChild(node);
        this.allies[i].drawSelf(this.canvasElement, 30, 30);
    }

    for (var i = 0; i < this.enemies.length; i++) {
        node = document.createElement('div');
        node.textContent = this.enemies[i].name + ': ' + this.enemies[i].health;
        this.enemiesComponent.appendChild(node);
    }
}

