# Requirements

Node version 14 or higher.

# Installation

1. Clone the repo
2. Run `yarn install` to install all the apps dependencies
3. Run `yarn start` to launch the app

# How to enable the Connect button

In the `NavBar` component (`src/Navbar.js`), replace line *19*

```<Button onClick={handleClick} disabled={!isJohnLaunched()} customMargin={true}>```

for

```<Button onClick={handleClick} customMargin={true}>```
that will enable the Connect button. Whatever logic runs after that button is clicked, should be handled inside the `handleClick` method of the `NavBar` component.

# How to enable the Mint button

In the `CollectionCountdown` component (`src/CollectionCountdown.js`), replace line *11*

```const [isLaunched, setIsLaunched] = useState(isJohnLaunched());```

for

```const [isLaunched, setIsLaunched] = useState(true);```

that will enable the Mint button. Whatever logic runs after that button is clicked, should be handled inside the `handleClick` method of the `CollectionCountdown` component.

> **NOTE**: Do not forget to revert these changes before pushing into master!

# Add OpenSea Icon

To add the OpenSea icon to the nav bar, just assign the correct URL to the `openSeaURL` variable in line 10 of the `src/Icons.js` file.
If you want to go further with this, once that variable is set up, you could replace lines 21 to 23

```
{openSeaURL && (<a href={openSeaURL}>
  <S.Image size={size} src={OpenSea} alt="opensea" />
</a>)}
```

for

```
<a href={openSeaURL}>
  <S.Image size={size} src={OpenSea} alt="opensea" />
</a>
```

this is just a nitpick solution though. Adding the URL is enough.
