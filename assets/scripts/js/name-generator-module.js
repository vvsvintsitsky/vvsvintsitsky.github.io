var nameGeneratorModule = {};

var adjectivesArray = [
    'Angry',
    'Feral',
    'Wrathful',
    'Merciless',
    'Frenzied',
    'Crazy',
    'Furious'
];

var speciesArray = [
    'Ogre',
    'Ork',
    'Demon',
    'Mutant',
    'Zombie',
    'Thug',
    'Spider',
    'Crawler'
];

var namesArray = [
    'Horus',
    'Ghnar',
    'Aralakh',
    'Grunt',
    'Kel',
    'Thuzad',
    'Zul\'Jin'
];

nameGeneratorModule.namePartsStorage = [
    adjectivesArray,
    speciesArray,
    namesArray
];

nameGeneratorModule.generateName = function() {
    var seed = Math.random();
    var index;
    var nameObject = {};
    var nameParts = [];
    this.namePartsStorage.forEach(storage => {
        index = Math.floor(seed * storage.length);
        nameParts.push(storage[index]);
    });

    return nameParts.join(' ');
}
