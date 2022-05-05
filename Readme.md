
## Technology Stack

- Playwright **latest**
- Node.js **16.latest**


## Install dependencies :

```
npm install
```

## Command to run tests 

To run the tests on STAGING
```
npx playwright test 
```

To run on PRODUCTION

```
$env:NODE_ENV="PRODUCTION";  npx playwright test
```

To run with a custom credentials set $env:EMAIL & $env:PASSWORD environment variables before running the tests

## Debugging 

* To use Playwright inspector add --debug flag after test command
* To get more detailed playwright log set $env:DEBUG="pw:api"

## Improvement ideas

* It was not required in the assignment, but adding more users and optimzing login, can increase performance of tests. 
