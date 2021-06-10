var roleHarvester = require('role.harvester');
var roleHarvester2 = require('role.harveser2');
var roleUpgrader = require('role.upgrader');
var roleUpgrader2 = require('role.upgrader2');
var roleUpgraderR2 = require('role.upgraderRoom2');
var roleBuilder = require('role.builder');
var roleBuilder2 = require('role.builder2');
var roleCarrier = require('role.carrier');
var roleMiner = require('role.miner');
var roleMiner2 = require('role.miner2');
var spawnCreeps = require('spawningCreeps');
var towerRepair = require('towerRepair');
var roleRoomclaimer = require('role.roomclaimer');
var spawnCreeps2 = require('spawningCreeps2');
var roleMinerR2 = require('role.minerR2');

//Game.rooms.W9N7.createFlag(1,1,'test');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawnCreeps.run();
    towerRepair.run();
    spawnCreeps2.run();


    var linker = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK);
        }
    });
    linker[1].transferEnergy(linker[0]);
    linker[2].transferEnergy(linker[0]);
    
    var linker2 = Game.spawns['Spawn2'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK);
        }
    });
    linker2[2].transferEnergy(linker2[1]);
    linker2[0].transferEnergy(linker2[1]);
    
    var storage = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE);
        }
    });

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.memory.role == 'harvester' || creep.memory.role == 'Rettungsharvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvesterR2' || creep.memory.role == 'RettungsharvesterR2') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvester2') {
            roleHarvester2.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'upgrader2' && storage[0].store.getUsedCapacity() > 75000){
            roleUpgrader2.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'builder2') {
            roleBuilder2.run(creep);
        }
        if(creep.memory.role == 'carrier' && storage[0].store.getUsedCapacity() > 50000) {
            roleCarrier.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'miner2') {
            roleMiner2.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleRoomclaimer.run(creep);
        }
        if(creep.memory.role == 'upgragerR2') {
            roleUpgraderR2.run(creep);
        }
        if(creep.memory.role == 'minerR2') {
            roleMiner.run(creep);
        }
    }

}