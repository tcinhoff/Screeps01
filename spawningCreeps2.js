var spawnCreeps2 = {

    /** @param {Creep} creep **/
    run: function() {

        var upgragerR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgragerR2');

        if(upgragerR2.length < 2) {
            var newName = 'upgragerR2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgragerR2'}});
        }

        var minerR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'minerR2');

        if(minerR2.length < 1) {
            var newName = 'minerR2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'minerR2'}});
        }
        
        var builderR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        if(builderR2.length < 1) {
            var newName = 'builderR2' + Game.time;
            Game.spawns['Spawn2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'builder'}});
        }

        var harvestersR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterR2');

        if(harvestersR2.length < 1) {
            var newName = 'HarvesterR2' + Game.time;
            if(Game.spawns['Spawn2'].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'harvesterR2'}}) == -6) {

                var RettungsharvesterR2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'RettungsharvesterR2');

                //Rettungsaktion
                if(harvestersR2.length == 0 && RettungsharvesterR2.length == 0) {
                    var newName = 'RettungsharvesterR2' + Game.time;
                    Game.spawns['Spawn2'].spawnCreep([CARRY,CARRY,MOVE,MOVE], newName,
                        {memory: {role: 'RettungsharvesterR2'}});
                }
            }
        }
    }
};

module.exports = spawnCreeps2;