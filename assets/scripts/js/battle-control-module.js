var battleControlModule = {};

battleControlModule.hide = function () {
    this.viewComponent.classList.add('invisible');
}

battleControlModule.show = function () {
    this.viewComponent.classList.remove('invisible');
}

battleControlModule.init = function () {
    this.viewComponent = document.getElementsByClassName('battle-control-form')[0];
    this.bindEventListeners();
}

battleControlModule.bindEventListeners = function () {

}

battleControlModule.toggleVisibility = function () {
    this.viewComponent.classList.toggle('invisible');
}