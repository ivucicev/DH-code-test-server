# code-challenge

Tested with node v10.16.3

# How To start the server?

Make sure your mongoDB instance is running on mongodb://127.0.0.1:27017/ and db name DH-code-test-db

```sh
    $ npm install
    $ npm start
```
should be enough,

if there is env difference, Ive added docker configuration so this app can run in its own container.

# Assigment said that no global packages should be installed?

Yes but, I thought that it adding mongo was easiest way for enabling users to register, without hardcoding, or losing user data every time server starts.

# How to test the server side

For test we are using simple assertions
run the command

```sh
    $ npm test
```

# Notes

Project compiles from TS, cause for me its easier and less error prone to write ts than js on server side also its kinda faster when debugging.

Folder structure is also changed, but it always up to the teamm and whatever team thinks is the best for the project, I made it this way so I do not keep everything inside root folder of server.

For auth Im using session, and im generating token when user logs in and Im storing it inside session.

# What can be done better

For sure part with auth / security, im using session with cookie secure set to true, and im saving auth token to sessionm then inside middleware im
checking if token from auth header is equal to token in session. This can be done much better and more secure, but i thouht thats enough for this case.
Also generating token is done manually,  with math.rand.

I made encode simple and stupid to keep it human readable, go through all elements in sequence check if successive element is the same as previous or if count is equal to 9, if it this is true increase counter if not
write down character + count

```
let currentCount = 0;
let currentCharacter = sequence[0];
let encoded = '';
for (let i = 0; i <= sequence.length; i++) {
    if (currentCharacter === sequence[i] && currentCount < 9) {
        currentCount++;
    } else {
        encoded += currentCharacter + currentCount;
        currentCount = 1;
        currentCharacter = sequence[i];
    }
}
```

better solution would be something like this, but sure less readable

```
let s = 'XXXYYYYZZQXX'.match(/([a-zA-Z])\1*/g)||[];
return s.map(i => `${i.charAt(0)}${i.length}).join('');
```

