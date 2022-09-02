

<p align="center">
	  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
  </p>

<h1 align="center">
	  Valex
  </h1>

<div align="center">
  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>
<br/>

#  Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

##  Features


-  Get  the  card  statement
-  Creates  cards
-  Activate  /  Block  /  Unblock  a  card
-  Recharges  a  card
- View balance and transactions
-  Make  card  payments
</br>

​

##  API  Reference
​
###  Create  a  card

```http

POST /createCard

```


####  Request:

| Headers |Type| Decription |
|--|--|--|
|  `x-api-key` | `string` |**Required**. api key

####


| Body   | Type       | Description             |
| ----- | --------- | ---------------------- |
| `employeeId`|`number`| **Required**. user id|
| `type` | `string` | **Required**. card type |

​
`Valid  types:  [groceries,  restaurant,  transport,  education,  health]`


</br>

####  Response:

​
```json

{
    "cardId": 1,
	"number": "1111 1111 1111 1111",
	"cardholderName": "NAME N NAME",
	"securityCode": "111",
	"expirationDate": "01/27",

}

```


#


###  Activate  a  card

​

```http

PATCH /activeCard

```

####  Request:



| Body             | Type     | Description                        |
| --------------- | ------- | --------------------------------- |
| `employeeId`    | `number` | **Required**. user id       |
| `cardId`         | `number` | **Required**. card id          |
| `securityCode` | `string` | **Required**. card cvc  |



`securityCode  max  length:  3`



#


###  Block  and unblock a  card

​

```http

PATCH /blockCard/:block

```



####  Request:


| Params  | Type 	 |Description				|
|---------|----------|--------------------------|
| `block` |`string`  |**Required** true or false|

`block = true for block your card`
`block = false for unblock your card`
<br><br>


| Body           | Type     | Description                              |
| :------------- | :------- | :--------------------------              |
| `employeeId`   | `integer` | **Required**. user id                    |
| `cardId`       | `integer` | **Required**. card id                    |
| `cardPassword` | `string` | **Required**. card password only numbers |



​

`cardPassword max length:  "4"`

​

#

​


​

###  Recharge  a  card

​

```http

POST /recharge/:cardId

```

​

####  Request:

​

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |


####
|Params|Type  |Description|
|--|--|--|
|`cardId`  |`integer`  |**Required**. card id |

​

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `amount`         | `integer` | **Required**. recharge amount      |

​
`amount must be more then 0`
`use cents in amount value`

​

#

​

###  Card  payment

​

```http

POST /payment/POS/:businessId

```

​

####  Request:



​

| Params       | Type      | Description               |
| :----------- | :-------- | :------------------------ |
| `businessId` | `integer` | **Required**. business Id |

​

####

​

| Body             | Type      | Description                  |
| :--------------- | :-------- | :--------------------------- |
| `cardId`         | `integer` | **Required**. card id        |
| `cardPassword`   | `string`  | **Required**. card password  |
| `amount` 		   | `integer` | **Required**. payment amount |


​
`use cents in amount value`
`cardPassword max length:  "4"`


#

### View balance and transactions:
 ```http
GET /balanceTransactions/:cardId
```

|Params|Type  |Description|
|--|--|--|
|`cardId`  |`integer`  |**Required**. card id |

#
​

##  Environment  Variables

​

To run this project, you will need to add the following environment variables to your .env file


`DATABASE_URL  =  postgres://UserName:Password@Hostname:5432/DatabaseName`

​
`PORT  =  number  #recommended:5000`
​

`SECRET_KEY  =  any  string`

​

</br>

​

##  Run  Locally

​

Clone the project

​

```bash

  git clone https://github.com/luishsilva09/Valex.git

```


Go to the project directory



```bash

  cd valex/

```

​

Install dependencies

​

```bash

  npm install

```

​

Create database

​

```bash

  cd /database

```

```bash

  bash ./create-database

```

```bash

  cd ../

```



Start the server
​

```bash

  npm run start

```
​

</br>

​

##  Lessons  Learned

​

In this project I learned a lot about how to structure an API with TypeScript

​

</br>

​

##  Acknowledgements

​

-  [Awesome  Badges](https://github.com/Envoy-VC/awesome-badges)

​

</br>

​

##  Authors

​

-  Luís Henrique da Silva

​

https://github.com/luishsilva09

​

</br>


