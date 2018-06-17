function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

var dragNdropTaskModule = {};

dragNdropTaskModule.loadTaskVariants = function (url) {
    /*
    fetch("test.json")
        .then(response => response.json())
        .then(json => console.log(json));
    */
    this.taskVariants = [
        { "word": "cat" },
        { "word": "dog" }
    ];
}

dragNdropTaskModule.createCheckAnswerFunction = function (taskVariant, answerHolder) {
    return function () {
        var orderedWordSymbols = [];
        for(var i = 0; i < answerHolder.children.length; i++) {
            orderedWordSymbols.push(answerHolder.children[i].textContent);
        }
        return taskVariant.word === orderedWordSymbols.join('');
    }
}

dragNdropTaskModule.generateTaskObject = function () {
    var task = {};
    task.taskType = 'drag-n-drop';

    var taskVariant = this.taskVariants[Math.floor(this.taskVariants.length * Math.random())];

    do {
        var shuffeledWordTemplate = taskVariant.word.split('');
        var shuffeledWordBuffer = [];
        while (shuffeledWordTemplate.length !== 0) {
            var index = Math.floor(shuffeledWordTemplate.length * Math.random());
            shuffeledWordBuffer.push(shuffeledWordTemplate[index]);
            shuffeledWordTemplate.splice(index, 1);
        }
        task.contents = shuffeledWordBuffer;
    } while (taskVariant.word === shuffeledWordBuffer.join(''));
    task.checkAnswer = this.createCheckAnswerFunction(taskVariant, this.answerInputElement);

    return task;
}

/////////////////////////////////////

dragNdropTaskModule.init = function () {
    this.loadTaskVariants('somePath');
    this.shuffledWordHolderElement = document.getElementsByClassName('drag-n-drop-shuffled-word-holder')[0];
    this.answerInputElement = document.getElementsByClassName('drag-n-drop-answer-input')[0];
    this.viewComponent = document.getElementsByClassName('drag-n-drop-task-section')[0];
}

dragNdropTaskModule.toggleVisibility = function() {
    this.viewComponent.classList.toggle('invisible');
}

dragNdropTaskModule.launchTask = function () {
    var task = this.generateTaskObject();
    var letterElement;
    var that = this;

    while (this.shuffledWordHolderElement.firstChild) {
        this.shuffledWordHolderElement.removeChild(this.shuffledWordHolderElement.firstChild);
    }
    while (this.answerInputElement.firstChild) {
        this.answerInputElement.removeChild(this.answerInputElement.firstChild);
    }

    for (let i = 0; i < task.contents.length; i++) {
        letterElement = document.createElement('span');
        letterElement.setAttribute('id', 'drag-n-drop-task-draggable-element-' + i);
        letterElement.setAttribute('draggable', 'true');
        letterElement.addEventListener('dragstart', drag);
        letterElement.textContent = task.contents[i];
        this.shuffledWordHolderElement.appendChild(letterElement);
    }

    return task;
}