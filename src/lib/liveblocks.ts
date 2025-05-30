import { Liveblocks } from "@liveblocks/node";
const key = process.env.LIVEBLOCK_SECRECT_KEY ;
if (!key) {
    throw new Error ("private key is not set at all");
    
}
const liveblocks = new Liveblocks ({
    secret : key  ,
});
export default liveblocks