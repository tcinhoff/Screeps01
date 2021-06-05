var towerRepair = {

    /** @param {Creep} creep **/
    run: function () {


        var towers = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });

        var towersR2 = Game.spawns['Spawn2'].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
        });

        towers.concat(towersR2);

        //Repair the most damaged thing
        const targets = towers[0].room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });

        targets.sort((a, b) => a.hits - b.hits);



        if (targets.length > 0) {
            towers[0].repair(targets[0]);
        } else {
            const creeps = towers[0].room.find(FIND_CREEPS, {
                filter: object => object.hits < object.hitsMax
            });

            creeps.sort((a, b) => a.hits - b.hits);
            towers[0].heal(creeps[0]);
        }

        //Extensions & Spawn
        var extensions = towers[0].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;}});

        if(extensions.length > 0){
            towers[0].heal(extensions[0]);
        }
    }
};

module.exports = towerRepair;