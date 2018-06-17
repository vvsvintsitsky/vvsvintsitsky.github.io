var credentialsInputModuleController = {};

credentialsInputModuleController.hide = function () {
    this.viewComponent.classList.add('invisible');
}

credentialsInputModuleController.show = function () {
    this.viewComponent.classList.remove('invisible');
}

credentialsInputModuleController.init = function () {
    this.viewComponent = document.getElementsByClassName('credentials-input-form')[0];
    this.nameInputComponent = document.getElementsByClassName('name-input')[0];
    this.nameInputSubmitComponent = document.getElementsByClassName('name-input-submit')[0];
    this.bindEventListeners();
}

credentialsInputModuleController.bindEventListeners = function () {
    this.nameInputSubmitComponent.addEventListener('click', this.submitName.bind(this));
}

credentialsInputModuleController.submitName = function (event) {
    event.preventDefault();
    var nameSubmitEvent = new CustomEvent('namesubmit', { bubbles: true, detail: { name: this.nameInputComponent.value } });
    this.viewComponent.dispatchEvent(nameSubmitEvent);
}