# Open Source - Interactions

Created by LeonMrBonnie

⭐ This repository if you found it useful!

---

# Description

This repository provides an alt:V resource to create interactions.

An interaction is a position on the map where you can press a button to do something.

This resource provides an easy way to create and remove interactions.

You can either use the exported functions from this resource, or call the events.

## Installing Dependencies / Installation

**I cannot stress this enough. Ensure you have NodeJS 13+ or you will have problems.**

-   [NodeJS 13+](https://nodejs.org/en/download/current/)
-   An Existing or New Gamemode
-   General Scripting Knowledge

First download the JS wrapper for the C# entity sync from [GitHub](https://github.com/Kudze/altv-csharp-entity-sync-to-js-wrapper).<br>
Then you need to build it using `dotnet publish -c Release` and create a new resource with the type `csharp`.<br>
You should name this resource `entitysync-wrapper`

After simply add the name of this resource to your `server.cfg` resource section.

`altv-os-interactions`

If you want to use the exported functions instead of the events also add the name of this resource to the `deps` array of your `resource.cfg` from your main gamemode.

Then simply clone this repository into your main server resources folder.

```
cd resources
git clone https://github.com/LeonMrBonnie/altv-os-interactions
```

Ensure your `package.json` includes this property:

```json
"type": "module"
```

# Importing the resource

If you don't want to use the events, but want to use the exported functions instead, you first have to make sure the resource where you want to use the interactions has this resource listed in its `deps`.

Then you can import the resource by using:
```js
import * as Interactions from "altv-os-interactions";
```

And you can then use the functions by using e.g. `Interactions.createInteraction("test", new alt.Vector3(0, 0, 0), 5, () => alt.log("Test!"));`

# Creating a new interaction

You can create an interaction by using the exported function `createInteraction` or by calling the event `interactions:create`. Both take the same arguments:

| Parameter    | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `name`       | `String`   | Unique name to identify the textlabel.                 |
| `pos`        | `Vector3`  | A Vector3 or `pos` to place it.                        |
| `range`      | `Number`   | Interaction range.                                     |
| `handler`    | `Function` | The function to be executed when the player interacts. |

# Removing an existing interaction

You can remove an existing interaction by using the exported function `removeInteraction` or by calling the event `interactions:remove`. Both take the same arguments:

| Parameter    | Type       | Description                                            |
| ------------ | ---------- | ------------------------------------------------------ |
| `name`       | `String`   | Unique name to identify the textlabel.                 |

# Interacting with an interaction

You can interact with an interaction by standing in its range and pressing `E`.<br>
If you want to change this keybind, edit the `INTERACTION_KEY` constant in the `client.js` file to your desired keycode.

# Other alt:V Open Source Resources

-   [Authentication by Stuyk](https://github.com/Stuyk/altv-os-auth)
-   [Discord Authentication by Stuyk](https://github.com/Stuyk/altv-discord-auth)
-   [Global Blip Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-blip-manager)
-   [Global Marker Manager by Dzeknjak](https://github.com/jovanivanovic/altv-os-global-marker-manager)
-   [Chat by Dzeknjak](https://github.com/jovanivanovic/altv-os-chat)
-   [Nametags by Stuyk](https://github.com/Stuyk/altv-os-nametags)
-   [Entity Sync for JS by LeonMrBonnie](https://github.com/LeonMrBonnie/altv-os-js-entitysync)
-   [Context Menu by Stuyk](https://github.com/Stuyk/altv-os-context-menu)
-   [Global Textlabels by Stuyk](https://github.com/Stuyk/altv-os-global-textlabels)