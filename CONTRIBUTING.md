# Contributing

Thank you for taking the time and effort to contribute to Greenstand!

See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles
them.
Please make sure to read the relevant section before making your contribution.
It will make project maintenance a lot easier and smooths out the experience for all involved.
The community looks forward to your contributions.

### Note

Contributing to this project can sometimes involve a steep learning curve. Please do not give up and come and find us on
Slack to get support setting you up. This is a fun project with an amazing potential to disrupt untransparent practices
and open reforestation to the digital world.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting an issue assigned](#getting-an-issue-assigned)
- [Working on an issue](#working-on-an-issue)
- [Keeping your fork in sync](#keeping-your-fork-in-sync)
- [Code style guide](#code-style-guide)
- [Connect with Us](#connect-with-us)

## Code of Conduct

This project and everyone participating in it is governed by the
[Code of Conduct](./CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.

## Getting an issue assigned

- Look through the [open issues](https://github.com/Greenstand/treetracker-wallet-admin-client/issues) for one that
  looks interesting.
- Use the labels to help you find an issue:
    - `good first issue`: easy and good for getting started.
    - `medium`: medium difficulty or needs more work.
    - `challenge`: hardest or big tasks, or needs some special skill or tricky or even hack in some way.
    - `documentation`: writing job, sometimes it's good for new dev to learn and do some simple job.
    - `bug`: just bug.
    - `wontfix`: some issue still in discussion, or can not be implemented at current stage, or just outdated problem.
    - `high-priority`: urgent problem, like some crucial bug or feature.
    - We also tag issue with other aspects like the skill needed, the device related and so on.

- If you're not sure what to work on, ask in the `#wallet-admin-client channel`
  on [Slack](https://greenstand.slack.com/)
  and we'll find a good issue for
  you.
- Add a comment to the selected issue to say you'd like to work on it, and ask for any clarification you need. Some of
  the info you need to solve the problem may be missing from the description of the issue.
- One of the Greenstand leads will then assign it to you and try to help with any questions.

There are lots of opportunities to offer ideas and take ownership of larger pieces of work, so don't be afraid to ask!

## Working on an issue

- Create a branch for the issue in your local repo
- Make your changes and test everything works locally
- Push your changes to your fork on GitHub and create a pull request into Greenstand/main
- Fill in as much info as you can in the PR, including screenshots or videos of the change to help the reviewer
  understand what you've done
- A member of the review team will review your changes and may request changes
- Make the requested changes, asking for clarification in the PR if necessary, and push the updated code
- After the code review and all code changes are done, the reviewer will approve and merge your changes

You can work one more than one issue at a time, while you wait for your PR to be reviewed or questions to be answered,
but remember to keep each issue on a separate branch.

## Keeping your fork in sync

Your forked repo won't automatically stay in sync with Greenstand, so you'll need to occasionally sync manually (
typically before starting work on a new feature).

```
git checkout master
git pull upstream master --rebase
git push origin master
```

If there are merge conflicts in your PR, you may need to rebase your branch. Ask a member of the team if you need help
with this.

```
git checkout <feature_branch>
git pull upstream master --rebase
git push origin <feature_branch> --force
```

## Code style guide

### Rules

**Indention** 2 Spaces for indentation

**Semicolon** Use semicolons at the end of each line

**Characters** 80 characters per line

**Quotes** Use single quotes unless you are writing JSON

```js
const foo = 'bar';
```

**Braces** Opening braces go on the same line as the statement

```js
if (true) {
  console.log('here');
}
```

**Variable declaration** Declare one Variable per statement

```js
const dog = ['bark', 'woof'];
let cat = ['meow', 'sleep'];
```

**Variable, properties and function names** Use lowerCamelCase for variables, properties and function names

```js
const adminUser = db.query('SELECT * From users ...');
```

**Class names** Use UpperCamelCase for class names

```js
class Dog {
  bark() {
    console.log('woof');
  }
}
```

**Descriptive conditions** Make sure to have a descriptive name that tells the use and meaning of the code

```js
const isValidPassword =
  password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);
```

**Object/Array creation** Use trailing commas and put short declarations on a single line. Only quote keys when your
interpreter complains:

```js
var a = ['hello', 'world'];
var b = {
  good: 'code',
  'is generally': 'pretty',
};
```

## Connect with Us

If you have any questions, comments, suggestions, of any sort, please join our community!
We collaborate primarily through [Slack](https://greenstand.slack.com).
The corresponding channel `#wallet-admin-client` is a good place to find additional support.
