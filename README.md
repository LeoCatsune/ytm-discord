# YTM-Discord

A Rich Presence client (extension) and server for Youtube Music.

## Requirements

- Node.JS

That's it. Seriously. (You should probably use a recent version, too.)

## Usage

First of all, you'll need to clone the repo.

```console
git clone https://github.com/protogendelta/ytm-discord.git
cd ytm-discord
```

### Building and Installing the Extension

```console
cd client
npm i
npm run build
```

<!-- TODO: Images -->

Then, head to `chrome://extensions`. Ensure that the `Developer Mode` toggle is on, then select `Load Unpacked`.
Navigate to the `client/dist` folder and click `Select Folder`.

### Running the Discord RPC Server

> **Heads Up!**
> If you're still in the `client` directory, you should move up a level before continuing. (`cd ..`)

```console
cd server
npm i
npm run discord
```

#### Advanced: Creating a Discord Application

If you want to use your own API application instead of the one provided, you'll need to update the `clientId` in the server's `index.ts`.

To work with the application as-is, your application should have the following rich presence assets:

- `paused`: An icon (small image) to be shown when paused
- `playing`: An icon (small image) to be shown when playing
- `ytm_logo`: A fallback image (by default, the YT Music Logo) for unavailable or missing album art.

For convenience, some compatible images can be found in the `media` folder.

### Running the Web (Now Playing) Server

```console
cd server
npm i
npm run web
```

Then, visit [`left.html`](http://localhost:3110/left.html) or [`right.html`](https://localhost:3110/right.html).
The relevant files are in `server/web`, if you want to make any tweaks to the layout or styling.

## To-Do

- [ ] Debugging
- [ ] Comments (for readability)
