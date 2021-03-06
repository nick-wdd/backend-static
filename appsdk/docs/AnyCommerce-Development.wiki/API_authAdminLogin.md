# API: authAdminLogin


performs authentication and returns an admin session id which can be used to make adminXXXXX calls.

## INPUT PARAMETERS: ##
  * device_note: 
  * ts: current timestamp YYYYMMDDHHMMSS
  * authtype _(optional)_ : md5|sha1|facebook|googleid|paypal
  * authid _(optional)_ : for md5 or sha1 - it is a digest of hashtype(password+ts)

_HINT: 
userid identifies a user (not a domain) within a specific account. A single user may have access to many partitions and many domains. There are
several valid ways to write a user.  Each account is assigned a 20 character "username", in addition there is a 10 digit sub-user called the "luser". 
the security administrator for every account is called "admin" and so the login for admin would be "admin*username" or simply "username" in addition
if a domain.com is associated to an account then it is also allowed to login as admin@domain.com.  The same applies for luser which would simply be 
luser*username or luser@domain.com.  Please note that login id's are NOT the same as email addresses, it is not possible to login with an email address
unless the users email address also happens to be luser@domain.com (which would be configured by security administrator)
_
_HINT: 
authentication information (USERID, CLIENTID, DOMAIN, VERSION, AUTHTOKEN) can be passed in either of two ways - using HTTP Headers, or in the data payload.
The following is a mapping of HTTP Header to payload parameter.   X-USERID = _userid, X-DOMAIN = _domain, X-VERSION = _version, X-CLIENTID = _clientid,
X-DEVICEID = _deviceid, X-AUTHTOKEN = _authtoken.  Avoid using HTTP headers when making requests via the XHR XMLHTTPRequest from a browser, there are
numerous compatibility issues with the CORS (Cross Origin Resource Sharing) specification 2119 so use the payload version instead. Ex:
{ "_cmd":"someThing", "_clientid":"your client id", "_version":201249, } 
_
_HINT: 
authAdminLogin calls do not require an authtoken (since they return it), depending on the circumstances the api may return a challenge 
which complies with the supported challenge methods. The list of acceptable challenge methods is determined by comparing the allowed challenge 
methods of the client (which were specified when the clientid was requested/assigned) and also the challenge types allowed by the administrator -
if no mutually acceptable challenge types can be identified then an error is returned and access is denied.  Challenges are issued based on the
accounts security administrator settings. 
_
_HINT: 
authtype of md5|sha1 refers to the digest protocol being used (in all cases we will accept the hexadecimal notation)
the authid is generated by computing the md5 or sha1 hexadecimal digest value of the concatenation of plain_text_password and ts .
Given the following inputs password="A", ts="1B" then it would be md5("A1B") or sha1("A1B") respectively.
Both MD5 and SHA1 are widely implemented protocols and sufficiently secure for this exercise - 
we have included the appropriate security tokens as generated by the md5 and sha1 functions in 
mysql below (use these as a reference to test your own functions)

mysql> select md5('A1B');
+----------------------------------+
| md5('A1B')                       |
+----------------------------------+
| 9c8c7d6da17f5b90b9c2b8aa03812ab4 |
+----------------------------------+

mysql> select sha1('A1B');
+------------------------------------------+
| sha1('A1B')                              |
+------------------------------------------+
| 7b6bfc9420addb09c8cfb1ae5f71f8e797d4685d |
+------------------------------------------+

The ts value of "1B" would not be valid, it should be a date in YYYYMMDDHHMMSS format. 
The date must be within 60 seconds of the actual time or the request will be refused. 
In addition the random security string is ONLY valid for one request within a 1 hour period.
_

## RESPONSE: ##
  * authtoken: secret user key
  * deviceid: deviceid
  * userid: userid
  * ts: 

```json

X-USERID: user@domain.com
X-CLIENT: your.app.client.id
X-VERSION: 201246
X-DEVICEID: user_specified
X-DOMAIN: domain.com
Content-Type: application/json

{ "_cmd":"authAdminLogin", "ts":"YYYYMMDDHHMMSS or seconds since 1970", "authtype":"md5", "authid"  }
```
