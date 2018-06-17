var translationTaskModule = {};

translationTaskModule.loadTaskVariants = function(url) {
    
    fetch("assets/game-contents/translations.json")
        .then(response => response.json())
        .then(json => console.log(json));
    
    this.taskVariants = [
        { "word": "cat", "translations": ["кот", "кошка"] },
        { "word": "dog", "translations": ["пес", "пёс", "собака"] }
    ];
}

translationTaskModule.createCheckAnswerFunction = function(taskVariant, answerHolder) {
    return function() {
        return taskVariant.translations.some(element => element === answerHolder.value);
    }
}

translationTaskModule.generateTaskObject = function() {
    var task = {};
    task.taskType = 'translation';

    var taskVariant = this.taskVariants[Math.floor(this.taskVariants.length * Math.random())];

    task.contents = taskVariant.word;
    task.checkAnswer = this.createCheckAnswerFunction(taskVariant, this.answerInputElement);

    return task;
}

/////////////////////////////////////

translationTaskModule.init = function() {
    this.loadTaskVariants('somePath');
    this.translationWordHolder = document.getElementsByClassName('translation-word-holder')[0];
    this.answerInputElement = document.getElementsByClassName('translation-answer-input')[0];
    this.viewComponent = document.getElementsByClassName('translation-task-section')[0];
}

translationTaskModule.toggleVisibility = function() {
    this.viewComponent.classList.toggle('invisible');
}

translationTaskModule.launchTask = function() {
    var task = this.generateTaskObject();
    this.translationWordHolder.textContent = task.contents;

    ///////////////////
    return task;
}
