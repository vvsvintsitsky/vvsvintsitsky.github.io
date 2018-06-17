var scoreModuleController = {};

scoreModuleController.hide = function () {
    this.viewComponent.classList.add('invisible');
}

scoreModuleController.show = function () {
    this.viewComponent.classList.remove('invisible');
}

scoreModuleController.init = function () {
    this.viewComponent = document.getElementsByClassName('score-module-section')[0];
    this.contentComponent = document.getElementsByClassName('score-table')[0];
    this.credentialsInputModule = {};/////////////////////
    this.scores = JSON.parse(window.localStorage.getItem('scores'));
    if(!this.scores) {
        this.scores = [];
    }
    this.bindEventListeners();
}

scoreModuleController.bindEventListeners = function () {

}

scoreModuleController.populateScoreTable = function () {
    var tableBody = this.contentComponent.children[1];
    for (var i = 0; i < this.scores.length; i++) {
        var scoreNode = document.createElement('tr');
        var scoreNodePart = document.createElement('td');
        scoreNodePart.textContent = this.scores[i].name;
        scoreNode.appendChild(scoreNodePart);

        scoreNodePart = document.createElement('td');
        scoreNodePart.textContent = this.scores[i].kills;
        scoreNode.appendChild(scoreNodePart);

        tableBody.appendChild(scoreNode);
    }
}

scoreModuleController.handlePlayerResult = function (player) {
    var scoreHolder = { name: player.name, kills: player.kills };
    this.scores.push(scoreHolder);
    this.scores.sort(function (left, right) {
        return right.kills - left.kills;
    });
    window.localStorage.setItem('scores', JSON.stringify(this.scores));
}

scoreModuleController.selectSpell = function (spell) {
    this.selectedSpell = spell;
}

scoreModuleController.toggleVisibility = function () {
    this.viewComponent.classList.toggle('invisible');
}