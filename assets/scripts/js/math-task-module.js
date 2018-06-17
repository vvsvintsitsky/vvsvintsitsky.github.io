var mathTaskModule = {};

mathTaskModule.taskVariants = [
    {
        type: 'addition',
        operationSymbol: '+',
        checkAnswer: function (firstNumber, secondNumber, answerHolder) {
            return (firstNumber + secondNumber) === parseInt(answerHolder.value);
        }
    },
    {
        type: 'substraction',
        operationSymbol: '-',
        checkAnswer: function (firstNumber, secondNumber, answerHolder) {
            return (firstNumber - secondNumber) === parseInt(answerHolder.value);
        }
    },
    {
        type: 'multiplication',
        operationSymbol: '*',
        checkAnswer: function (firstNumber, secondNumber, answerHolder) {
            return (firstNumber * secondNumber) === parseInt(answerHolder.value);
        }
    },
    {
        type: 'division',
        operationSymbol: '/',
        checkAnswer: function (firstNumber, secondNumber, answerHolder) {
            return (firstNumber / secondNumber) === parseInt(answerHolder.value);
        }
    }
];

mathTaskModule.numberThreshold = 10;

mathTaskModule.generateArgument = function () {
    return Math.floor(this.numberThreshold * Math.random());
}

mathTaskModule.createCheckAnswerFunction = function (taskVariant, firstNumber, secondNumber, answerHolder) {
    return taskVariant.checkAnswer.bind(null, firstNumber, secondNumber, answerHolder);
}

mathTaskModule.generateTaskObject = function () {
    var task = {};

    task.firstNumber = this.generateArgument();
    task.secondNumber = this.generateArgument();
    task.taskType = 'math';

    var taskVariant = this.taskVariants[Math.floor(this.taskVariants.length * Math.random())];

    task.contents = '' + task.firstNumber + taskVariant.operationSymbol + task.secondNumber;
    task.checkAnswer = this.createCheckAnswerFunction(taskVariant, task.firstNumber, task.secondNumber, this.answerInputElement);

    return task;
}

/////////////////////////////////////////////////////

mathTaskModule.init = function() {
    //this.mathTaskGenerator = mathTaskGenerator;
    //this.mathTaskGenerator.loadTaskVariants('somePath');
    this.mathExpressionHolder = document.getElementsByClassName('math-expression-holder')[0];
    this.answerInputElement = document.getElementsByClassName('math-answer-input')[0];
    this.viewComponent = document.getElementsByClassName('math-task-section')[0];
}

mathTaskModule.toggleVisibility = function() {
    this.viewComponent.classList.toggle('invisible');
}



mathTaskModule.launchTask = function() {
    var task = this.generateTaskObject();
    this.mathExpressionHolder.textContent = task.contents;

    ////////////////
    return task;
}