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

                var toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);

                if (toBuild.length) {
                    if (creep.build(toBuild[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(toBuild[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }

                } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else{
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] > 0);
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