var towerRepair = {

    /** @param {Creep} creep **/
    run: function () {


        var towersR1 = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });

        var towersR2 = Game.spawns['Spawn2'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });

        var towers = towersR1.concat(towersR2);
        //Repair the most damaged thing
        for(var i in towers) {
            const targets = towers[i].room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a, b) => a.hits - b.hits);


            if (targets.length > 0) {
                towers[i].repair(targets[0]);
            } else {
                const creeps = towers[0].room.find(FIND_CREEPS, {
                    filter: object => object.hits < object.hitsMax
                });

                creeps.sort((a, b) => a.hits - b.hits);
                towers[i].heal(creeps[0]);
            }

            //Extensions & Spawn
            var extensions = towers[i].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (extensions.length > 0) {
                towers[i].heal(extensions[0]);
            }
        }
    }
};

module.exports = towerRepair;