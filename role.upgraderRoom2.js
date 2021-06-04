var roleUpgraderRoom2 = {

        /** @param {Creep} creep **/
        run: function (creep) {

            if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }

            if (creep.memory.upgrading) {
                //Extensions & Spawn
                var extensions = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });

                var toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);

                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });

                targets.sort((a, b) => a.hits - b.hits);

                if (extensions.length > 0) {
                    const exten = creep.pos.findClosestByPath(extensions);
                    if (creep.transfer(exten, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(exten, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else if (targets.length > 0 ) {
                    if (creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else if (toBuild.length) {
                    if (creep.build(toBuild[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(toBuild[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }

                } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                    }
                });
                //var source = creep.pos.findClosestByPath(containers);
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE
                ) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    }
;

module.exports = roleUpgraderRoom2;