# Test Broccolli CO.

## How to use

1. Download the example [or clone the repo]

2. Install it and run:

```bash
npm install
npm run start
```

## Why does this repository exist?
This is the result of a code challenge that involved the following technologies: ReactJS, UI material, Flexbox and Rest API. The structure is simple, but it follows good practices from the first commit such as the use of javascript linter (ESLint) and the use of propTypes, it also shows a clear separation and definition of components.

See the screenshots at the end of this document to see the results.


## Code Challenge Content

* Broccoli & Co., an upcoming online service company, would like to let people to "Request an invitation" on their website. *

### The functionality
Create a simple yet clean homepage for them that allow users to enter their name and email to receive email invitations.

### Visual Requirements
- The UI should occupy the full height of the screen.
- Shows a fixed header that is always on top of the window and a footer that is always on the bottom of the window (assuming a
reasonable window height).
- The page content is sandwiched in the middle, containing just a heading, a small piece of text and a button to request an invite.
- A rough mockup of the basic layout is attached. While preserving this layout on desktop, you may style it however you wish, with or
without images.
- The solution must be mobile friendly (users won't need to pinch and zoom on their mobile devices).

### UI Behaviour / Validation
- When the Request Invite button is clicked, a popup shows containing the Full name, Email and Confirm Email input fields.
- The user needs to fill in all three fields to request an invite. Full name needs to be at least 3 characters long, Email needs to be in
validation email format and Confirm Email needs to match Email.
- If the user clicks Send and one or more fields do not validate properly, the app should not contact the backend but instead provide
appropriate feedback to the user (use your judgement on what this UX should be).
- If the user clicks Send and all fields validate properly, the app should send the request to the backend server (see specs below) and
inform the user that the request is being sent.
- If the server returns 200 OK, it should switch to another popup, indicating that everything went through OK. This popup can be dismissed
and will simply close - revealing the homepage again.
- The server may return 400 Bad Request, in which case the app should simply display the error message from the server.
- The Send button can be clicked again to re-attempt the submission.

### Backend API
- The API endpoint is available on https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth
- The request is in the form of a JSON payload { "name": "XXX", "email": "XXX" }
- The request must use the POST method.


## Screenshots

![Landing](/screenshots/1.png?raw=true)
![Modal to request](/screenshots/2.png?raw=true)
![Modal answer](/screenshots/3.png?raw=true)

## Template based on create-react-app

[Create React App](https://github.com/facebookincubator/create-react-app) with no build configuration.
