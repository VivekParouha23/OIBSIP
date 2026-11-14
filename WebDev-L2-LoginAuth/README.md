# Login Authentication System

Front-end approach (A): registration, login, protected dashboard and logout. Passwords need 8+ characters with 1 number, duplicate emails are rejected, login errors do not reveal which field was wrong, and passwords are stored as salted SHA-256 hashes, never plain text. Note: this is a learning demo. Real apps must authenticate on a server.

## Run it
Use VS Code Live Server or run `python -m http.server` and open register.html (hashing needs a secure context such as localhost).

## Tech
HTML5, CSS3, JavaScript, Web Crypto API, localStorage.

## Screenshots
Add screenshots here.

Built for the Oasis Infobyte Summer Internship Program (OIBSIP), Web Development & Design, Level 2.
