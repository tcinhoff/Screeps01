var spawnCreeps = {

    /** @param {Creep} creep **/
    run: function() {
	    
	    var countHarvester = 1;
        var countUpgraders = 0;
        var countUpgraders2 = 2;
	    var countBuilders = 0;
	    var countCarrier = 0;

        var targets = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);
        var targets2 = Game.flags.S2.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            countCarrier = 2;
        }


        var storage = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE);
            }
        });

        if (storage[0].store.getUsedCapacity() > 500000) {
            countUpgraders2 = 3;
            if (storage.store.getUsedCapacity() > 700000) {
                countUpgraders2 = 5;
            }
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    
        if(harvesters.length < countHarvester) {
            var newName = 'Harvester' + Game.time;
            if(Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'harvester'}}) == -6) {
            
            var Rettungsharvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'Rettungsharvester');
        
            //Rettungsaktion
            if(harvesters.length == 0 && Rettungsharvester.length == 0) {
                var newName = 'Rettungsharvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'Rettungsharvester'}});
            }
                }
        }
        
        var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');

        if(harvesters2.length < 0) {
            var newName = 'Harvester2_' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'harvester2'}});
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        if(upgraders.length < countUpgraders) {
            var newName = 'Upgraders' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'upgrader'}});
        }


        var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');

        if(upgraders2.length < countUpgraders2 && storage[0].store.getUsedCapacity() > 100000) {
            var newName = 'Upgraders2_' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'upgrader2'}});
        }

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    
        if(builders.length < countBuilders) {
            var newName = 'Builders' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'builder'}});
        }

        var builders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder2');


        if(builders2.length < 1) {
            var newName = 'Builders2_' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                {memory: {role: 'builder2'}});
        }
        
        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');

    
        if(carriers.length < countCarrier && storage[0].store.getUsedCapacity() > 50000) {
            var newName = 'Carriers' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'carrier'}});
        }
        
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');

    
        if(miners.length < 1) {
            var newName = 'Miners_' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'miner'}});
        }

        var miners2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner2');


        if(miners2.length < 1) {
            var newName = 'Miners2_' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'miner2'}});
        }

        /*
        console.log('Harvesters: ' + harvesters.length);
        console.log('Harvesters2: ' + harvesters2.length);
        console.log('Upgraders: ' + upgraders.length);
        console.log('Upgraders2: ' + upgraders.length);
        console.log('Builders: ' + builders.length);
        console.log('Builders2: ' + builders.length);
        console.log('Carriers: ' + carriers.length);
        console.log('Miners: ' + miners.length);
        console.log('Miners2: ' + miners2.length);

         */

    }
};

module.exports = spawnCreeps;