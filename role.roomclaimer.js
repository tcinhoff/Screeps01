var roleRoomclaimer = {

        /** @param {Creep} creep **/
        run: function (creep) {

                creep.moveTo(Game.flags['Flag1']);
                if(creep.room.controller) {
                    if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }


            }


        }
    }
;

module.exports = roleRoomclaimer;