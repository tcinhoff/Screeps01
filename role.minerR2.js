var roleMinerR2 = {

    /** @param {Creep} creep **/
    run: function (creep) {

        var sources = creep.room.find(FIND_SOURCES);

        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });

        if (containers[0].store.getFreeCapacity() > 50) {

            if (creep.moveTo(containers[0]) == 0) {
                creep.harvest(sources[0]);
            }
        }

         /*
        var linker = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });

        if(creep.store.getFreeCapacity() == 0) {


            if (linker.length) {
                if (creep.transfer(linker[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(linker[2], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }


        }
        else {
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }

        }
          */
    }
};

module.exports = roleMinerR2;