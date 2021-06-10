var roleHarvester = {

        /** @param {Creep} creep **/
        run: function (creep) {

            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });
            var storage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });

            var linker = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK);
                }
            });


            //Extensions & Spawn
            var extensions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_POWER_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            //Construcstions
            var construcstions = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 50;
                }
            });


            if (creep.store.getUsedCapacity() < 50) { //Creep auffüllen
                if (creep.memory.role == 'harvester') {
                    if (!creep.pos.inRangeTo(Game.flags.storage, 3)) {
                        creep.moveTo(Game.flags.storage);
                    } else {
                        if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage[0]);

                        }
                    }
                } else {

                    if (containers.length) {
                        if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containers[0]);
                        }
                    } else {
                        if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage[0]);
                        }
                    }
                }
            } else { //Energie verteilen
                if (extensions.length > 0) {
                    const target = creep.pos.findClosestByPath(extensions);
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (construcstions.length > 0) {
                    if (creep.transfer(construcstions[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(construcstions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (containers.length) {
                    if (creep.transfer(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (creep.memory.role == 'harvester' && Game.getObjectById('60b784e3eab56e0044a9822b').store.getUsedCapacity() > 400000) {
                    creep.moveTo(Game.flags.R2);
                    if (creep.transfer(linker[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.flags.R2);
                    }
                }
            }
        }
    }
;

module.exports = roleHarvester;