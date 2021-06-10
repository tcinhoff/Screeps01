var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {



        var linker = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });

        if (creep.store.getUsedCapacity() != 0) {
            var storrage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
               if(creep.transfer(storrage[0], RESOURCE_ENERGY) != 0){
                   creep.moveTo(Game.flags.builder);
               }



        } else {

            if (creep.withdraw(linker[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(linker[1]);
            }

        }


    }
};

module.exports = roleBuilder;