var listeningTaskModule = {};

listeningTaskModule.loadTaskVariants = function(url) {
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

listeningTaskModule.createCheckAnswerFunction = function(taskVariant, answerHolder) {
    return function() {
        return taskVariant.word === answerHolder.value;
    }
}

listeningTaskModule.generateTaskObject = function() {
    var task = {};
    task.taskType = 'listening';

    var taskVariant = this.taskVariants[Math.floor(this.taskVariants.length * Math.random())];

    task.contents = taskVariant.word;
    task.checkAnswer = this.createCheckAnswerFunction(taskVariant, this.answerInputElement);

    return task;
}

/////////////////////////////////////

listeningTaskModule.init = function() {
    this.loadTaskVariants('somePath');
    this.inputPlaybackButton = document.getElementsByClassName('listeting-playback')[0];
    this.answerInputElement = document.getElementsByClassName('listening-answer-input')[0];
    this.viewComponent = document.getElementsByClassName('listening-task-section')[0];
}

listeningTaskModule.toggleVisibility = function() {
    this.viewComponent.classList.toggle('invisible');
}

listeningTaskModule.launchTask = function() {
    var task = this.generateTaskObject();
    var synth = window.speechSynthesis;
    this.inputPlaybackButton.onclick = function (event) {
        event.preventDefault();
        var utterThis = new SpeechSynthesisUtterance(task.contents);
        utterThis.voice = synth.getVoices()[1];
        synth.speak(utterThis);
    };

    //////////
    return task;
}
