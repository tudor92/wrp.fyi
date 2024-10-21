import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType;
let isReady: boolean;

const cacheOptions = {
  url: `redis://${process.env.HOST_R_IP}:${process.env.HOST_R_PORT}`,
};

// if (config.redis.tlsFlag) {
//   Object.assign(cacheOptions, {
//     socket: {
//       // keepAlive: 300, // 5 minutes DEFAULT
//       tls: false,
//     },
//   })
// }

async function getConn(): Promise<RedisClientType> {
  if (!isReady) {
    redisClient = createClient({
    username: `${process.env.HOST_R_USER}`,
    password: `${process.env.HOST_R_PASS}`,
      ...cacheOptions,
    });
    redisClient.on('error', err => console.error(`Redis Error: ${err}`));
    redisClient.on('connect', () => console.info('Redis connected'));
    redisClient.on('reconnecting', () => console.info('Redis reconnecting'));
    redisClient.on('ready', () => {
      isReady = true;
      console.info('Redis ready!');
    });
    await redisClient.connect();
  }
  return redisClient;
}

getConn().then(connection => {
  redisClient = connection;
}).catch(err => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  console.error({ err }, 'Failed to connect to Redis');
});

export {
    getConn,
};
