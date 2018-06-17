
var taskModuleController = {};

taskModuleController.hide = function () {
    this.viewComponent.classList.add('invisible');
}

taskModuleController.show = function () {
    this.viewComponent.classList.remove('invisible');
}

taskModuleController.init = function() {
    this.viewComponent = document.getElementsByClassName('task-module')[0];
    this.taskAnswerSubmitElement = document.getElementsByClassName('answer-submit-input')[0];
    this.taskModules = [
        mathTaskModule,
        translationTaskModule,
        dragNdropTaskModule,
        listeningTaskModule
    ];
    for(var i = 0; i < this.taskModules.length; i++) {
        this.taskModules[i].init();
    }

    this.bindEventListeners();
}

taskModuleController.bindEventListeners = function() {
    this.taskAnswerSubmitElement.addEventListener('click', this.submitAnswer.bind(this));
}

taskModuleController.submitAnswer = function (event) {
    event.preventDefault();
    var answerSubmitEvent = new CustomEvent('answersubmit', { bubbles: true, detail: { correct: this.currentTask.checkAnswer() } });
    this.viewComponent.dispatchEvent(answerSubmitEvent);
    
}

taskModuleController.toggleVisibility = function() {
    this.viewComponent.classList.toggle('invisible');
}

taskModuleController.startTask = function() {
    this.currentTaskModule = this.taskModules[Math.floor(Math.random() * this.taskModules.length)];
    this.currentTaskModule.toggleVisibility();
    this.currentTask = this.currentTaskModule.launchTask();
}

taskModuleController.endTask = function () {
    this.currentTaskModule.toggleVisibility();
}