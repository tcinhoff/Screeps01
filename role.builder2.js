var roleBuilder2 = {

    /** @param {Creep} creep **/
    run: function (creep) {


        var linker = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });

        if (creep.store.getUsedCapacity() != 0) {

            var storrage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            });

            if (creep.transfer(storrage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storrage[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }


        } else {

            if (creep.withdraw(linker[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(linker[0]);
            }

        }


    }
};

module.exports = roleBuilder2;