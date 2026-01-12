# Wasmer Initial Frontend Interview

Thanks for your interest in Wasmer's front-end engineering role!

The next step in the interview process will require you to complete our coding challenge. Our team reviews all submissions closely and it's been very helpful for us to gain insight into a candidate's problem solving and coding abilities.

Included below are the details for the challenge. Your solution will be run through a suite of test cases and evaluated on correctness, elegance, and readability.

## 📚 Materials

Given a set of events, each with a start time and end time, render the events on a single day calendar (similar to Outlook, Calendar.app, and Google Calendar). There are several properties of the layout:

1. No events may visually overlap.
2. If two events collide in time, they MUST have the same width. This is an invariant. Call this width W.
3. W should be the maximum value possible without breaking the previous invariant.

Each event is represented by a JavaScript object with a `start` and `end` attribute. The value of these attributes is the number of minutes since 9am. So `{ start:30, end:90 }` represents an event from 9:30am to 10:30am. The events should be rendered in a container that is 620px wide (600px + 10px padding on the left/right) and 720px long (the day will end at 9pm). The styling of the events should match the attached screenshot.

You may structure your code however you like, but you must implement the following function in the global namespace (the `layOutDay` should be exposed through `window`). The function takes in an array of events and will lay out the events according to the above description.

```jsx
function layOutDay(events) {}
```

This function will be invoked from the console for testing purposes. If it cannot be invoked, the submission will be rejected. This function should be idempotent.

In your submission, please implement the calendar with the following input:

```jsx
[
    { start: 30, end: 150 },
    { start: 540, end: 600 },
    { start: 560, end: 620 },
    { start: 610, end: 670 },
];
```

A screenshot of the expected output is attached.
![Output Example](./public/calendar.png)
