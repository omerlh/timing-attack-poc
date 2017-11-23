# timing-attack-poc
A small POC I've built to try and demonstrate timing attack.
The POC is based on this [research](https://www.blackhat.com/docs/us-15/materials/us-15-Morgan-Web-Timing-Attacks-Made-Practical-wp.pdf) from BlackHat USA 2015.
To my surprise, I found out this is a lot more complicated than what it looks like.

## Running
Run the server:
`node server.js`

And in a different console run the client:
`node client.js`.

The server expose one endpoint: `/secure?pass=<>`, and returns 200 if the password is correct. 
If not, 401 returned.
The password is 4 numbers (0-9) to make things simpler.
The client tries each of the different digits, and reports the time for each digit.
By that, the client should be able to find the correct digit in the password.