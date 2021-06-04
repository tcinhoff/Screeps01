var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {



        var linker = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });

	    if(creep.store.getUsedCapacity() != 0) {


            if (linker.length) {
                if (creep.transfer(linker[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(linker[1], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

	    }
	    else {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                        }
                    });
                if(creep.withdraw(containers[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[1]);
                }

	    }


	}
};

module.exports = roleBuilder;