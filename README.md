
# NyamBot

 1. Get telegram [token](https://core.telegram.org/bots#6-botfather)
 2. Paste token to `.env` `TELEGRAM_TOKEN=YOUR_TOKEN` `SITE_URL=https://nyam-nyam.online/stolovaya-sibinformbyuro/products/`
 3. Run `npm run dev` and check your bot

## Scripts
#### `npm run build`
Build your code to `dist` folder.
#### `npm run dev`
Build and start your code after every code changes. Settings are inside `package.json` `nodemonConfig`.
#### `npm run lint`
Check code style. All rules are inside `.eslintrc.js`.
#### `npm run lint:fix`
Fix code style issues automatically including `prettier` formatting.
#### `npm run start`
Start code from `dist` folder.
#### `npm run start-tunnel`
Start a public URL for exposing your local server.
#### `npm run test`
Start your tests. File matching `*.test.(js|jsx)`.
#### `npm run typecheck`
Check typescript errors.
