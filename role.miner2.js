var roleMiner2 = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var sources = creep.room.find(FIND_SOURCES);
        /*
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });

        if (containers[1].store.getFreeCapacity() > 50) {

            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {

         */

            var linker = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_LINK);
                }
            });

            if(creep.store.getFreeCapacity() == 0) {


                if (linker.length) {
                    if (creep.transfer(linker[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(linker[1], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }

            }
            else {
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }

            }
        //}
    }
};

module.exports = roleMiner2;