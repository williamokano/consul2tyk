# consul2tyk
POC project to transfer some configs from consul to Tyk API gateway.

## Environment variables
| Variable         | Description                                                  | Default               |
|------------------|--------------------------------------------------------------|-----------------------|
| CONSUL_HOST      | Consul host                                                  | 127.0.0.1             |
| CONSUL_PORT      | Consul port                                                  | 8500                  |
| TYK_APPS_KEY     | Consul KV watched dir. Will look through all the child keys. | tyk/apps/             |
| TYK_POLICIES_KEY | Consul KV watched key. Only looks for this key.              | tyk/policies.json     |
| TYK_GW_URL       | Tyk Gateway REST API URL                                     | http://localhost:8080 |
| TYK_GW_SECRET    | Tyk Gateway secret for REST API                              | changeme              |

## How to run
Install with `npm install --prod` and run with `npm start`.

## Tyk Rest API Documentation
https://tyk.io/docs/tyk-rest-api/

## Research material
https://www.consul.io/api/index.html  
https://github.com/silas/node-consul/issues/26  
https://hub.docker.com/_/consul  
https://www.npmjs.com/package/tyk  