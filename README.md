# Greenstand Treetracker Wallet Admin Client

The admin panel for accessing wallets and executing all known API calls for the wallet API.

## Product Leadership

Product Engineering and Technical Lead: @OlhaD

Project Manager: @Steve

Repository wrangler: (add your name here)

Core Contributors: (add your name here)

## Background

The wallet admin panel is used by wallet owners to display, transfer tokens and transactions, create sub wallets and
configure their appearance.

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
Use nvm to install and manage your Node.js instances. More details
here: https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/

1. Make sure a profile exists for your terminal, run touch ~/.profile; touch ~/.zshrc
2. Install nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
3. Install the latest version of Node.js 18: nvm install 18
4. Use the installed Node.js: nvm use 18

_On MacOS, you can alleviate the need to run as sudo by using nvm or
by [following John Papa's instructions](http://jpapa.me/nomoresudo)._

### Step 3: Fork and clone this repository

1. Click _Fork_ on this GitHub repo and follow the steps to fork the repo to your account
1. Open terminal
1. Go to a folder where you would like to install the project. Then type the following, replacing `<username>` with your
   GitHub username:

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

## Contributing

For details on how to contribute to the project, such as getting an issue assigned, working on an issue, where to get
support and collaborate etc., please see our [Contribution Guidelines](./CONTRIBUTING.md).

## Note

Contributing to this project can sometimes involve a steep learning curve. Please do not give up and come and find us on
slack to get support setting you up. This is a fun project with an amazing potential to disrupt non-transparent
practices
and open reforestation to the digital world.

Come have fun with a global team and a project that is disrupting opaque practices and creating open reforestation to the digital world.
More on getting started and [Contributing to the Cause](https://github.com/Greenstand/Greenstand-Overview#contributing-to-the-cause).
