var spells = [
    {
        name: 'frostbolt',
        type: 'offensive',
        power: 25,
        createSpellEffectObject: function (caster, target) {
            var spellEffectObjectWidth = 6;
            var spellEffectObjectHeight = 3;
            var spellEffectObjectSpeedX = 20;
            var cyclesToReachTarget = (target.x - caster.x) / spellEffectObjectSpeedX;
            var spellEffectObjectSpeedY = (target.y - caster.y) / Math.abs(cyclesToReachTarget);
            var effectDirectionX;
            var effectDirectionY;
            var endEffectFunction;
            if (cyclesToReachTarget > 0) {
                effectDirectionX = 1;
                endEffectFunction = function (xFrom, xTo) {
                    if (xFrom > xTo) {
                        return true;
                    }
                }
            } else {
                effectDirectionX = -1;
                endEffectFunction = function (xFrom, xTo) {
                    if (xFrom < xTo) {
                        return true;
                    }
                }
            }
            var spellEffectObject = {
                soundURL: 'assets/game-contents/sounds/frost_impact',
                x: caster.x,
                y: caster.y,
                xTo: target.x,
                yTo: target.y,
                speedX: spellEffectObjectSpeedX * effectDirectionX,
                speedY: spellEffectObjectSpeedY,
                sizeX: spellEffectObjectWidth * effectDirectionX,
                sizeY: spellEffectObjectHeight,
                drawSelf: function (canvas) {
                    if(endEffectFunction(this.x, this.xTo)) {
                        this.effectEnded = true;
                        return;
                    }
                    var ctx = canvas.getContext('2d');

                    ctx.beginPath();
                    ctx.moveTo(this.x + this.sizeX / 2, this.y);
                    ctx.lineTo(this.x - this.sizeX, this.y + this.sizeY / 2);
                    ctx.lineTo(this.x - this.sizeX, this.y - this.sizeY / 2);
                    ctx.fillStyle = "rgb(100, 100, 255)";
                    ctx.fill();
                    ctx.closePath();

                    this.x += this.speedX;
                    this.y += this.speedY;

                }
            };
            return spellEffectObject;
        }
    },
    {
        name: 'healing touch',
        type: 'defensive',
        power: 10,
        createSpellEffectObject: function (caster, target) {
            var spellEffectObjectRadius = 20;
            var spellEffectObjectRotateSpeed = 0.1;
            var spellEffectObject = {
                soundURL: 'assets/game-contents/sounds/healing_touch',
                x: caster.x,
                y: caster.y,
                xTo: target.x,
                yTo: target.y,
                radius: spellEffectObjectRadius,
                rotateSpeed: spellEffectObjectRotateSpeed,
                rotateAngle: 0,
                drawSelf: function (canvas) {
                    if (this.rotateAngle > 5) {
                        this.effectEnded = true;
                        return;
                    }
                    var ctx = canvas.getContext('2d');

                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, this.rotateAngle * Math.PI, (this.rotateAngle + 0.3) * Math.PI, true);
                    ctx.strokeStyle = 'rgb(100, 255, 100)';
                    ctx.stroke();
                    ctx.closePath();

                    this.rotateAngle += this.rotateSpeed;

                }
            };
            return spellEffectObject;
        }
    }
];

var spellModuleController = {};

spellModuleController.spells = spells;

spellModuleController.hide = function () {
    this.viewComponent.classList.add('invisible');
}

spellModuleController.show = function () {
    this.viewComponent.classList.remove('invisible');
}

spellModuleController.init = function () {
    this.viewComponent = document.getElementsByClassName('spell-panel-window')[0];
    this.contentComponent = document.getElementsByClassName('spell-panel-content')[0];
    this.confirmSpellSelectionComponent = document.getElementsByClassName('select-spell-input')[0];
    this.spells = spells;
    this.selectedSpell = this.spells[0];
    this.bindEventListeners();
}

spellModuleController.bindEventListeners = function () {
    this.populateSpellList();
    this.confirmSpellSelectionComponent.addEventListener('click', this.confirmSpellSelection.bind(this));
}

spellModuleController.populateSpellList = function () {
    for (var i = 0; i < this.spells.length; i++) {
        var spellNode = document.createElement('div');
        spellNode.textContent = this.spells[i].name;
        spellNode.addEventListener('click', this.selectSpell.bind(this, this.spells[i]));
        this.contentComponent.appendChild(spellNode);
    }
}

spellModuleController.confirmSpellSelection = function (event) {
    event.preventDefault();
    var confirmSpellSelectionEvent = new CustomEvent('spellselect', { bubbles: true, detail: { selectedSpell: this.selectedSpell } });
    this.viewComponent.dispatchEvent(confirmSpellSelectionEvent);
}

spellModuleController.selectSpell = function (spell) {
    this.selectedSpell = spell;
}

spellModuleController.toggleVisibility = function () {
    this.viewComponent.classList.toggle('invisible');
}