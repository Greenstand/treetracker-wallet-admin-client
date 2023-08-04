# Greenstand Treetracker Wallet Admin Client

The admin panel for accessing wallets and executing all known API calls for the wallet API.

## Product Leadership:

Product Engineering and Technical Lead: @OlhaD

Project Manager: @Steve

Repository wrangler: (add your name here)

Core Contributors: (add your name here

## Background

The wallet admin panel is used by wallet owners to create wallets and sub-wallets, transfer tokens, see transactions, and configure the wallet displays. For more information on the overall Greenstand project design see [Welcome to Greenstand.](https://github.com/Greenstand#welcome-to-greenstand)

## Use case

- A person wants to create and use a wallet on the greenstand system to manage Greenstand Impact Tokens.
- A green marketing company is utilizing the treetracker platform to plant/maintain one or more trees by attaching one or many Greenstand Impact Tokens to a product or sale.
- A company is selling hand-made boots and communicates to its clients that with every pair of boots sold the company is going to pay planters to grow trees; they need to manage the creation of wallets, and add tokens into the consumer/client's wallet.

## UX / UI Design

[See the figma file](https://www.figma.com/file/kXhFReuUVcqQonIgl59On3/Wallet-admin-module-UX?node-id=4%3A21&t=rLUiYOgkuHix3Z5B-1)

## User Stories

[See User Story Document](https://docs.google.com/document/d/1IF4fe4_BC319aoBKBW5LV2pypyDTy4K8qe1qqHexQ1Y/)

## Development Environment Setup

### Step 1: Install git

See https://git-scm.com/downloads for instructions.

### Step 2: Install Node.js

You can install Node.js directly from https://nodejs.org/dist/latest-v18.x/ OR
Use nvm to install and manage your Node.js instances. More details here: https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/

1. Make sure a profile exists for your terminal, run touch ~/.profile; touch ~/.zshrc
2. Install nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
3. Install the latest version of Node.js 18: nvm install 18
4. Use the installed Node.js: nvm use 18

_On MacOS, you can alleviate the need to run as sudo by using nvm or by [following John Papa's instructions](http://jpapa.me/nomoresudo)._

### Step 3: Fork and clone this repository

1. Click _Fork_ on this GitHub repo and follow the steps to fork the repo to your account
1. Open terminal
1. Go to a folder where you would like to install the project. Then type the following, replacing `<username>` with your GitHub username:

```
git clone https://github.com/<username>/treetracker-wallet-admin-client
```

Move into the new source code directory and add Greenstand as a remote:

```
cd treetracker-wallet-admin-client
git remote add upstream https://github.com/Greenstand/treetracker-wallet-admin-client
```

### Step 4: Install npm dependencies

```
npm install
```

### Step 5: Start the client

```
npm start
```

### Step 7: View the Treetracker Wallet Admin Client

Visit http://localhost:3000

## Getting an Issue Assigned

1. Look through the [open issues](https://github.com/Greenstand/treetracker-wallet-admin-client/issues) for one that looks interesting.
   Use labels to look for [good first issues](https://github.com/Greenstand/treetracker-wallet-admin-client/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22). This label indicates issues good to start with, but you are welcome to pick anything you like.
2. If you're not sure what to work on, ask in the #wallet-admin-client channel on Slack and we'll find a good issue for you.
3. Add a comment to the selected issue to say you'd like to work on it, and ask for any clarification you need.
4. When the issue is assigned to you, you are good to start.

There are lots of opportunities to offer ideas and take ownership of larger pieces of work, so don't be afraid to ask!

## Working on an Issue

1. Create a branch for the issue in your local repo
2. Make your changes and test everything works locally
3. Push your changes to your fork on GitHub and create a pull request into Greenstand/master
4. Fill in as much info as you can in the PR, including screenshots or videos of the change to help the reviewer understand what you've done
5. A member of the review team will review your changes and may request changes
6. Make the requested changes, asking for clarification in the PR if necessary, and push the updated code
7. After the code review and all code changes are done, the reviewer will approve and merge your changes

You can work on more than one issue at a time, while you wait for your PR to be reviewed or questions to be answered, but remember to keep each issue on a separate branch.

## Slack

For additional support, the corresponding channel #wallet-admin-client can be found in our slack community which can be joined through the [Engineering Sign Up Form.](https://docs.google.com/forms/d/e/1FAIpQLSdyLUffLPZZlHR-qfMwch5HkWcZ3kxM6h-eMK5PfGKLD4t8iA/viewform)

## Note

Come have fun with a global team and a project that is disrupting opaque practices and creating open reforestation to the digital world.
More on getting started and [Contributing to the Cause](https://github.com/Greenstand/Greenstand-Overview#contributing-to-the-cause)
