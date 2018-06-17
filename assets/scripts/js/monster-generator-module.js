

var monsterGeneratorModule = {};

monsterGeneratorModule.generateMonster = function () {
    var monster = {};
    monster.name = nameGeneratorModule.generateName();
    monster.health = 100;
    monster.spells = spellModuleController.spells;
    monster.selectSpell = function () {
        this.selectedSpell = this.spells[0];
    }
    monster.head = {
        radius: 10,
        eyeRadius: 2,
        eyePupilRadius: 1,
        drawSelf: monsterGeneratorModule.drawHeadFunctions[Math.floor(Math.random() * monsterGeneratorModule.drawHeadFunctions.length)]
    };
    monster.body = {
        bodyHeight: 20,
        bodyWidth: 12,
        headStartXOffset: 6,
        headStartYOffset: 0,
        armStartXOffset: 8,
        armStartYOffset: 5,
        legStartXOffset: 6,
        legStartYOffset: 18,
        drawSelf: monsterGeneratorModule.drawBodyFunctions[Math.floor(Math.random() * monsterGeneratorModule.drawBodyFunctions.length)]
    };
    monster.leg = {
        legHeight: 15,
        legWidth: 4,
        drawSelf: monsterGeneratorModule.drawLegFunctions[Math.floor(Math.random() * monsterGeneratorModule.drawLegFunctions.length)]
    };
    monster.arm = {
        armHeight: 10,
        armWidth: 3,
        drawSelf: monsterGeneratorModule.drawArmFunctions[Math.floor(Math.random() * monsterGeneratorModule.drawArmFunctions.length)]
    };
    monster.drawSelf = function(canvas) {
        this.body.drawSelf(canvas, this.x, this.y);
        this.head.drawSelf(canvas, this.x , this.y - this.body.headStartYOffset);
        this.arm.drawSelf(canvas, this.x, this.y + this.body.armStartYOffset);
        this.leg.drawSelf(canvas, this.x, this.y + this.body.legStartYOffset);
    }
    return monster;
}

monsterGeneratorModule.drawHeadFunctions = [
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        var headRadius = 10;
        ctx.beginPath();
        ctx.arc(x, y - this.radius / 2, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(0, 153, 0)";
        ctx.fill();
        ctx.closePath();

        var eyeRadius = 2;
        ctx.beginPath();
        ctx.arc(x - this.radius / 2 + this.eyeRadius / 2, y - this.radius / 2, this.eyeRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.closePath();

        var eyePupilRadius = 1;
        ctx.beginPath();
        ctx.arc(x - this.radius / 2 + this.eyeRadius / 2 - this.eyePupilRadius, y - this.radius / 2, this.eyePupilRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fill();
        ctx.closePath();
    },
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        var headRadius = 10;
        ctx.beginPath();
        ctx.arc(x, y - this.radius / 2, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(209, 0, 0)";
        ctx.fill();
        ctx.closePath();

        var eyeRadius = 2;
        ctx.beginPath();
        ctx.arc(x - this.radius / 2 + this.eyeRadius / 2, y - this.radius / 2, this.eyeRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fill();
        ctx.closePath();

        var eyePupilRadius = 1;
        ctx.beginPath();
        ctx.arc(x - this.radius / 2 + this.eyeRadius / 2 - this.eyePupilRadius, y - this.radius / 2, this.eyePupilRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();
        ctx.closePath();
    }
];

monsterGeneratorModule.drawBodyFunctions = [
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(x - this.bodyWidth / 2, y, this.bodyWidth, this.bodyHeight);
        ctx.fillStyle = "rgb(100, 100, 255)";
        ctx.fill();
        ctx.closePath();
    },
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(x - this.bodyWidth / 2, y, this.bodyWidth, this.bodyHeight);
        ctx.fillStyle = "rgb(255, 100, 30)";
        ctx.fill();
        ctx.closePath();
    }
];

monsterGeneratorModule.drawLegFunctions = [
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(x - this.legWidth / 2, y, this.legWidth, this.legHeight);
        ctx.fillStyle = "rgb(255, 100, 0)";
        ctx.fill();
        ctx.closePath();
    },
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(x - this.legWidth / 2, y, this.legWidth, this.legHeight);
        ctx.fillStyle = "rgb(255, 0, 100)";
        ctx.fill();
        ctx.closePath();
    }
];

monsterGeneratorModule.drawArmFunctions = [
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(x - this.armWidth / 2, y, this.armWidth, this.armHeight);
        ctx.fillStyle = "rgb(100, 100, 0)";
        ctx.fill();
        ctx.closePath();
    },
    function (canvas, x, y) {
        var ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.rect(x - this.armWidth / 2, y, this.armWidth, this.armHeight);
        ctx.fillStyle = "rgb(0, 100, 30)";
        ctx.fill();
        ctx.closePath();
    }
];