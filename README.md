# MotorStockBackend

This project is a backend part of a motor stock management system. Main functionality includes managing company car details, supplier companies information, details supplies and price changes.

## Development server

To start a local development server, run:

```bash
npm i
```

```bash
npm run start:start
```

Also, you need to set up environmental validables to run this project. You can do this by creating a `.env` file in the root directory of the project and adding the following variables:

```
PORT=3000
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:4200

DB_URL=mongodb+srv://motor-stock:reIgSt8r5xV3LuTA@maincluster.hghvu.mongodb.net/motor-stock-dev?retryWrites=true&w=majority&appName=MainCluster

JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA23wqlpGI8Z2kMAIz8ASb
NRQUquwduyKr6HASiM3qbT0jE3JWnMX6YoRuf+0KgvHYh6VqaIHHBYK77zZjwbDi
ajfWZN5yNeIi7iRmVnrF3O5z+sy47TBmGBapBBdhopaWoT238ATY2j72Xurhms7j
YWUyr5CGOPXdF6r4DZBTGtGXrjI1c34y43vF+Nps2nrHjjYEmiofcdUXrYPkuw0N
85UATId424/cQiD2nXUCv98XE75Q91MTAOEvU0cz8NinSFknuPHPz3cqePQqz9VU
ZqM3+UyIxwbRuBM8S0dZy56Pw+toFySGKHJ7NO69AONlp0ENwzvyof6NZxC7OwX/
9QIDAQAB
-----END PUBLIC KEY-----"
JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA23wqlpGI8Z2kMAIz8ASbNRQUquwduyKr6HASiM3qbT0jE3JW
nMX6YoRuf+0KgvHYh6VqaIHHBYK77zZjwbDiajfWZN5yNeIi7iRmVnrF3O5z+sy4
7TBmGBapBBdhopaWoT238ATY2j72Xurhms7jYWUyr5CGOPXdF6r4DZBTGtGXrjI1
c34y43vF+Nps2nrHjjYEmiofcdUXrYPkuw0N85UATId424/cQiD2nXUCv98XE75Q
91MTAOEvU0cz8NinSFknuPHPz3cqePQqz9VUZqM3+UyIxwbRuBM8S0dZy56Pw+to
FySGKHJ7NO69AONlp0ENwzvyof6NZxC7OwX/9QIDAQABAoIBABRm+l58sMok6To9
Oi65fuP0NeedgzX+BxTYNiDZY008PaJ1Im/4R0oZHVxu4GdDq+kQC1AjoCh2+plF
6Qf8NU/CWP+PXfZ8StrwL0MirnnXAJjzps0Fjrf2g0eKFN1UOjRK1GpPSQkgiS5R
jx8g1CodihSfzppE4IRutBgurkrzvJf00zTimm+l6amoWFLHOqc21xXWiX34hKGw
jakHSlIJWbVCPH3mCFqpD7of1bVIGEtDRreBpTIxFp4wuc/BtOSRM7HHxYqSc3uB
K/pIvOShOZVgJVkUsV9Ug+X/aEIQ0EmHNS8anyPcVjQx7IQ03hVhPhT0peuyEFdX
cyCWRRECgYEA9j5Jaq1QuCfs2/YmoKKaqAOrU7ZXb7EAgy44kKnyVhwgUrseqzGw
0+L+9ADljUnAyJjVW6Dm2Ker2fJNQHWiz61P/3EfMAVIwbLlwbigq/aQmV645noM
bSdanBKatfa+gUdPBab0tToswEzOBtkzBqJrKjljMJReaRhI/Lo/my8CgYEA5C52
hstP91w8qdGJMBmjYgB6Siir4tS/oKzL8asIwosoNUZGm5E5Xr2KIA+4T8MyEyvt
E9AarNL6Ic5DEeKbATI6ZYIBC5rHydja1C+3d0xZSsk7m9yb0tS30V2u5f8wTe0V
doMFXQNON0U+bva3gLXcopBJl9kurhT3YLUo/hsCgYBfoKLMTdBaJA8lAPvRSDR9
aSdg1CAynO+RAiMvcwBMlpGq70Yiv6JnNvFB+xMqgmjevhOliN/9ZWgktKdxj/2R
X0IA9oJhGLw/lOULDVNAVPmkxhdSUjV/MlhK4iK45cDn3bR/gm3n71avu2QLXtAl
FHA/rpeppwTfFXJKy12mOwKBgQDHOyJWU1LBAhIdnEySaPBU82HTOmvKJEQlAHsZ
yWJeqq4yxeeEkWpsJEZj9BXT3vTr9GCN+hgwag3oUnYRObBpfPesBbTv8vcacHOw
7PDeAxW7zLR1REvx67WL4qaBPy1n/OfOkFuweOBkNdtre5OBmEjKz/zRztmJOdk8
4TCnnQKBgQDRIap1N+HQQAB7oj1zVTgF7E77eHx6bNe5XEWKWkgecSj7V0AnUvvd
3K72neKmNNeiwTH1RK6z1ywlP1A+f6KdmWvsva7RRPobFiH/ZChh2kMR5yDmfvcd
oH0mmPtsdFe5flEMkuYTPYJjzP3X4ensRYcZBvmQH7OSktTbYKIGVA==
-----END RSA PRIVATE KEY-----"
```

Once the server is running, open your browser and navigate to `http://localhost:3000`.

## Deployment

This application is deployed on Rander. You can access the deployed version by visiting [https://motor-stock-backend.onrender.com/api-docs](https://motor-stock-backend.onrender.com/api-docs).
