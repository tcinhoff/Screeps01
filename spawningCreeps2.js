var spawnCreeps2 = {

    /** @param {Creep} creep **/
    run: function() {

        var upgragerR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgragerR2');

        if(upgragerR2.length < 2) {
            var newName = 'upgragerR2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'upgragerR2'}});
        }

        var minerR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'minerR2');

        if(minerR2.length < 1) {
            var newName = 'minerR2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'minerR2'}});
        }
    }
};

module.exports = spawnCreeps2;