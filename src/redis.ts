import { createClient } from 'redis';

const redisClient = createClient({
    url: '',
    socket: {
      host: 'localhost',
      port: 6379
    },
    password: ""
});

(async () => {
    await redisClient.connect();
    
    await redisClient.on('connect', ()=>{
        console.log('connected');
    });
  })();


const setJson = async (data:any) => {
    try {
        redisClient.set('test1',JSON.stringify(data))
        await redisClient.json.set(
            'area:trigger:kiwibot55',
            '.',
            {
                area : 'area',
                status_to_be_triggered: 'params.status_to_be_triggered',
                vehicle_id: 'params.vehicle_id'
            });
        //await redisClient.quit();
    } catch (e) {
        console.error(e);
    }
}

const getJson = async (key:string) => {
    try {
        const value1 = await redisClient.get('test1');
        console.log('get regular',value1);

        const value2 = await redisClient.json.get(key);
        console.log('get json',value2);

        //await redisClient.quit();
    } catch (e) {
        console.error(e);
    }
}

export {setJson,getJson}